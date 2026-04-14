# PRD: StxPet — The Collaborative On-Chain Tamagotchi
**Version:** 1.0  
**Author:** Winszn  
**Target:** Coding Agent  
**Network:** Stacks Mainnet  
**Status:** Ready for Implementation

---

## 0. Agent Directives

Non-negotiable for every file in this project:

- No hardcoded values. All constants (API URLs, contract addresses, network config, decay rates, meter caps) go in a single `constants.ts`.
- No mocks, stubs, or placeholder data. Every data path is a real contract read or real Hiro API call.
- No TODOs, no partial implementations, no `// implement later` comments.
- No generic naming. Everything named for what it actually does.
- TypeScript strict mode on all packages and the app.
- pnpm only. No npm, no yarn, anywhere.
- All async operations have proper error boundaries and loading states.
- Ship complete, working code or nothing.

---

## 1. Project Overview

**StxPet** is a community-owned digital pet that lives entirely on the Stacks blockchain. A single smart contract holds the pet's state — three meters (Hunger, Happiness, Energy) that decay over time relative to the current block height. Any wallet can call `feed`, `play`, or `sleep` to raise a meter. If any meter hits zero, the pet dies: the last person to have interacted with it wins a commemorative on-chain badge (a non-transferable SIP-009 NFT). The contract resets after death, creating a new round.

A companion Node.js bot (`apps/bot`) monitors the pet's state on-chain and auto-submits transactions when meters fall below a threshold — the primary transaction farming engine.

The project also ships a standalone npm package (`@winsznx/stxpet-core`) containing all state-parsing logic and transaction-building utilities for interacting with the contract.

---

## 2. Repository Structure

**Type:** Monorepo using pnpm workspaces + Turborepo.

```
stxpet/
├── package.json                        # Root workspace, packageManager: pnpm@9.x
├── pnpm-workspace.yaml
├── turbo.json
├── vercel.json                         # Vercel deployment config
├── contracts/
│   └── stx-pet-v1.clar
├── apps/
│   ├── web/                            # Next.js 14 App Router
│   │   ├── app/
│   │   │   ├── layout.tsx             # Root metadata + WalletProvider
│   │   │   ├── icon.tsx               # Programmatic SVG favicon
│   │   │   ├── apple-icon.tsx
│   │   │   ├── page.tsx               # Landing — live pet display
│   │   │   ├── leaderboard/
│   │   │   │   └── page.tsx
│   │   │   └── api/
│   │   │       └── og/
│   │   │           └── route.tsx      # OG image via @vercel/og
│   │   ├── components/
│   │   │   ├── pet/
│   │   │   │   ├── PetDisplay.tsx     # Animated pet visual
│   │   │   │   ├── MeterBar.tsx       # Hunger / Happiness / Energy
│   │   │   │   ├── ActionButtons.tsx  # Feed / Play / Sleep
│   │   │   │   └── DeathOverlay.tsx   # Shown when pet dies
│   │   │   ├── leaderboard/
│   │   │   │   ├── SurvivorTable.tsx  # Past winners
│   │   │   │   └── RoundCounter.tsx   # Total rounds survived
│   │   │   └── wallet/
│   │   │       ├── WalletProvider.tsx
│   │   │       └── WalletConnectButton.tsx
│   │   ├── lib/
│   │   │   ├── constants.ts
│   │   │   ├── contract-reads.ts
│   │   │   └── contract-calls.ts
│   │   └── hooks/
│   │       ├── usePetState.ts
│   │       └── useLeaderboard.ts
│   └── bot/                           # Node.js auto-feeder
│       ├── package.json
│       ├── tsconfig.json
│       └── src/
│           ├── index.ts               # Entry point, polling loop
│           ├── monitor.ts             # Reads pet state from contract
│           └── feeder.ts              # Submits feed/play/sleep txs
└── packages/
    └── stxpet-core/                   # @winsznx/stxpet-core
        ├── package.json
        ├── tsconfig.json
        └── src/
            ├── index.ts
            ├── types.ts
            ├── parsers/
            │   ├── parsePetState.ts
            │   ├── computeCurrentMeters.ts
            │   └── parseDeathEvent.ts
            └── transactions/
                ├── buildFeedTx.ts
                ├── buildPlayTx.ts
                └── buildSleepTx.ts
```

---

## 3. Smart Contract — `stx-pet-v1.clar`

**Network:** Stacks Mainnet  
**Contract Name:** `stx-pet-v1`  
**Deployer:** `NEXT_PUBLIC_CONTRACT_DEPLOYER` env var

### Constants

```clarity
(define-constant MAX-METER u100)
(define-constant FEED-BOOST u20)
(define-constant PLAY-BOOST u20)
(define-constant SLEEP-BOOST u20)
(define-constant DECAY-RATE u1)          ;; meters decay 1 point per DECAY-INTERVAL blocks
(define-constant DECAY-INTERVAL u10)     ;; every 10 blocks = ~100 minutes on mainnet
(define-constant ERR-PET-DEAD (err u100))
(define-constant ERR-ALREADY-DEAD (err u101))
(define-constant NFT-NAME "StxPet Survivor")
```

### Storage

```clarity
;; Core pet state
(define-data-var pet-hunger uint u100)
(define-data-var pet-happiness uint u100)
(define-data-var pet-energy uint u100)
(define-data-var last-interaction-block uint block-height)

;; Death tracking
(define-data-var pet-alive bool true)
(define-data-var last-interactor (optional principal) none)
(define-data-var total-rounds uint u0)

;; NFT
(define-non-fungible-token stxpet-survivor uint)
(define-data-var nft-counter uint u0)

;; Leaderboard: maps round number to winner principal
(define-map round-winners uint principal)
```

### Decay Logic (Internal)

```clarity
(define-private (compute-decayed-meter (current-value uint) (blocks-elapsed uint))
  ;; Decays by DECAY-RATE for every DECAY-INTERVAL blocks elapsed
  ;; Never goes below 0 — use (if (> decay current-value) u0 (- current-value decay))
  (let ((decay (* DECAY-RATE (/ blocks-elapsed DECAY-INTERVAL))))
    (if (> decay current-value) u0 (- current-value decay))
  )
)

(define-private (get-current-meters)
  ;; Returns tuple of all three meters adjusted for elapsed blocks
  (let (
    (elapsed (- block-height (var-get last-interaction-block)))
    (hunger (compute-decayed-meter (var-get pet-hunger) elapsed))
    (happiness (compute-decayed-meter (var-get pet-happiness) elapsed))
    (energy (compute-decayed-meter (var-get pet-energy) elapsed))
  )
    { hunger: hunger, happiness: happiness, energy: energy }
  )
)

(define-private (is-dead (meters { hunger: uint, happiness: uint, energy: uint }))
  (or
    (is-eq (get hunger meters) u0)
    (is-eq (get happiness meters) u0)
    (is-eq (get energy meters) u0)
  )
)
```

### Death + Reset Logic (Internal)

```clarity
(define-private (trigger-death)
  ;; Called when any meter hits zero during an interaction check
  ;; 1. Mark pet dead
  ;; 2. Mint NFT to last-interactor
  ;; 3. Record winner in round-winners map
  ;; 4. Do NOT reset yet — reset happens via (start-new-round)
  (begin
    (var-set pet-alive false)
    (match (var-get last-interactor)
      winner (begin
        (let ((token-id (+ (var-get nft-counter) u1)))
          (var-set nft-counter token-id)
          (map-set round-winners (var-get total-rounds) winner)
          (try! (nft-mint? stxpet-survivor token-id winner))
          (ok true)
        )
      )
      (ok true) ;; died before anyone interacted — no mint
    )
  )
)
```

### Public Functions

```clarity
(define-public (feed)
  ;; 1. Compute current meters with decay applied
  ;; 2. If any meter is zero → trigger-death, return (err u100)
  ;; 3. Otherwise: set hunger = min(MAX-METER, hunger + FEED-BOOST)
  ;; 4. Persist updated hunger, current happiness, current energy to vars
  ;; 5. Set last-interaction-block = block-height
  ;; 6. Set last-interactor = (some tx-sender)
  ;; 7. Return (ok true)
)

(define-public (play)
  ;; Same flow as feed but boosts happiness instead
)

(define-public (sleep)
  ;; Same flow as feed but boosts energy instead
)

(define-public (start-new-round)
  ;; Only callable when pet is dead (asserts! (not (var-get pet-alive)))
  ;; Resets all meters to u100
  ;; Sets last-interaction-block = block-height
  ;; Sets pet-alive = true
  ;; Clears last-interactor to none
  ;; Increments total-rounds
  ;; Returns (ok true)
)
```

### Read-Only Functions

```clarity
(define-read-only (get-raw-state)
  ;; Returns stored (non-decayed) meter values + last-interaction-block + pet-alive + total-rounds
)

(define-read-only (get-live-state)
  ;; Returns get-current-meters with decay applied + pet-alive + block-height + total-rounds
  ;; This is what the frontend polls
)

(define-read-only (get-round-winner (round uint))
  ;; Returns (optional principal) for the given round
)

(define-read-only (get-nft-owner (token-id uint))
  ;; Returns (optional principal)
)
```

### Error Codes

| Code | Meaning |
|------|---------|
| u100 | Pet is dead — interaction rejected |
| u101 | Pet is already dead — start-new-round already callable |

---

## 4. NPM Package — `@winsznx/stxpet-core`

**Registry:** npm public, under `@winsznx` org.

### `src/types.ts`

```typescript
export interface RawPetState {
  hunger: number;
  happiness: number;
  energy: number;
  lastInteractionBlock: number;
  isAlive: boolean;
  currentBlock: number;
  totalRounds: number;
}

export interface LivePetState extends RawPetState {
  // Decay-adjusted values (computed client-side as backup for UI)
  effectiveHunger: number;
  effectiveHappiness: number;
  effectiveEnergy: number;
  blocksUntilNextDecay: number;
  isDangerZone: boolean; // true if any meter < 20
}

export type PetAction = 'feed' | 'play' | 'sleep';
```

### `src/parsers/parsePetState.ts`

Takes the raw Clarity response from `get-live-state` and returns `RawPetState`. Handles Clarity uint unwrapping.

### `src/parsers/computeCurrentMeters.ts`

Takes `RawPetState` and current block height, applies the same decay formula as the contract (`DECAY_RATE / DECAY_INTERVAL`), returns `LivePetState`. Used by the bot and as a UI sanity check.

### `src/parsers/parseDeathEvent.ts`

Takes Hiro contract event log entries, identifies `trigger-death` internal calls (via `nft_mint_event`), extracts winner principal and round number.

### `src/transactions/buildFeedTx.ts`

Returns a `ContractCallOptions` object (from `@stacks/transactions`) for calling `feed` on the contract. No args. Exported as `buildFeedTx(contractDeployer: string, network: StacksNetwork): ContractCallOptions`.

Same pattern for `buildPlayTx` and `buildSleepTx`.

### `src/index.ts`

Exports: `parsePetState`, `computeCurrentMeters`, `parseDeathEvent`, `buildFeedTx`, `buildPlayTx`, `buildSleepTx`, all types.

---

## 5. Bot — `apps/bot`

The bot is a long-running Node.js process. It polls the contract every N blocks, checks all three meters, and submits the appropriate action if any meter falls below a threshold.

### `src/monitor.ts`

```typescript
export async function fetchLiveState(contractIdentifier: string): Promise<LivePetState>
// Calls get-live-state read-only function via @stacks/transactions callReadOnlyFunction
// Parses response via parsePetState + computeCurrentMeters from @winsznx/stxpet-core
// Throws if pet is dead
```

### `src/feeder.ts`

```typescript
export async function submitAction(action: PetAction, privateKey: string, contractDeployer: string): Promise<string>
// Builds the appropriate tx using buildFeedTx / buildPlayTx / buildSleepTx
// Signs and broadcasts via makeContractCall + broadcastTransaction from @stacks/transactions
// Returns the txid
// Logs: action taken, txid, current block height
```

### `src/index.ts` — Polling Loop

```typescript
// Config from env vars:
// BOT_PRIVATE_KEY — the bot wallet's private key
// BOT_HUNGER_THRESHOLD — feed if hunger < this (default 30)
// BOT_HAPPINESS_THRESHOLD — play if happiness < this (default 30)
// BOT_ENERGY_THRESHOLD — sleep if energy < this (default 30)
// BOT_POLL_INTERVAL_MS — polling interval in ms (default 60000 = 1 min)
// CONTRACT_DEPLOYER, CONTRACT_NAME — same as web app

// Loop:
// 1. fetchLiveState()
// 2. If pet dead: log "pet is dead, waiting for new round" — do NOT auto-call start-new-round
// 3. If hunger < threshold: submitAction('feed', ...)
// 4. If happiness < threshold: submitAction('play', ...)
// 5. If energy < threshold: submitAction('sleep', ...)
// 6. Log full state after each cycle
// 7. Wait BOT_POLL_INTERVAL_MS before next cycle
// 8. On unhandled error: log error + continue loop (never crash)
```

### `apps/bot/package.json`

```json
{
  "name": "stxpet-bot",
  "private": true,
  "scripts": {
    "start": "ts-node src/index.ts",
    "dev": "ts-node --watch src/index.ts"
  },
  "dependencies": {
    "@stacks/transactions": "^6.x",
    "@winsznx/stxpet-core": "*"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "ts-node": "^10.x"
  }
}
```

---

## 6. Next.js Application — `apps/web`

### 6.1 Environment Variables

```
NEXT_PUBLIC_HIRO_API_BASE=https://api.hiro.so
NEXT_PUBLIC_CONTRACT_DEPLOYER=<mainnet deployer address>
NEXT_PUBLIC_CONTRACT_NAME=stx-pet-v1
NEXT_PUBLIC_CONTRACT_IDENTIFIER=${DEPLOYER}.${NAME}
NEXT_PUBLIC_NETWORK=mainnet
NEXT_PUBLIC_APP_URL=https://stxpet.xyz
NEXT_PUBLIC_DECAY_RATE=1
NEXT_PUBLIC_DECAY_INTERVAL=10
```

### 6.2 `lib/constants.ts`

Single source of truth. All values from env vars. App throws build error on missing vars.

```typescript
export const HIRO_API_BASE = process.env.NEXT_PUBLIC_HIRO_API_BASE!;
export const CONTRACT_DEPLOYER = process.env.NEXT_PUBLIC_CONTRACT_DEPLOYER!;
export const CONTRACT_NAME = process.env.NEXT_PUBLIC_CONTRACT_NAME!;
export const CONTRACT_IDENTIFIER = `${CONTRACT_DEPLOYER}.${CONTRACT_NAME}`;
export const DECAY_RATE = Number(process.env.NEXT_PUBLIC_DECAY_RATE!);
export const DECAY_INTERVAL = Number(process.env.NEXT_PUBLIC_DECAY_INTERVAL!);
export const DANGER_THRESHOLD = 20; // meters below this show red
export const POLL_INTERVAL_MS = 15000; // 15s UI refresh
```

### 6.3 `lib/contract-reads.ts`

Uses `@stacks/transactions` `callReadOnlyFunction` on mainnet.

Exports:
- `fetchLiveState(): Promise<LivePetState>` — calls `get-live-state`, parses via `@winsznx/stxpet-core`
- `fetchRoundWinner(round: number): Promise<string | null>` — calls `get-round-winner`

### 6.4 `lib/contract-calls.ts`

Exports: `callFeed()`, `callPlay()`, `callSleep()`, `callStartNewRound()` — each uses `openContractCall` from `@stacks/connect`. All take `onFinish` and `onCancel` callbacks as params.

---

## 7. Application Pages & User Flow

### 7.1 Home Page (`app/page.tsx`) — Live Pet

The entire page is the pet experience. No separate "wrapped" flow — the pet is always live.

**Layout:**

```
┌──────────────────────────────────────────────────┐
│  STXPET          Round #N    [Connect Wallet]    │
├──────────────────────────────────────────────────┤
│                                                  │
│            [PetDisplay — animated SVG]           │
│                                                  │
│   HUNGER ████████░░  80     (decaying)           │
│   HAPPY  ██████░░░░  60                          │
│   ENERGY ███░░░░░░░  30  ⚠                      │
│                                                  │
│        [FEED]      [PLAY]      [SLEEP]           │
│                                                  │
│   Last action: SP1ABC…XYZ fed 3 blocks ago       │
│                                                  │
│              [View Leaderboard →]                │
└──────────────────────────────────────────────────┘
```

**States:**

- **Alive:** Full pet display, meters, action buttons enabled only when wallet connected. If not connected, buttons show "Connect to Interact".
- **Danger Zone (any meter < 20):** Meter bar turns red, pet display shows distress animation, page border pulses red.
- **Dead:** `DeathOverlay` covers the page — shows "PET HAS DIED", winner address (last interactor), round number, and a "Start New Round" button (calls `start-new-round` via wallet).

**Data:** `usePetState` hook polls `fetchLiveState()` every `POLL_INTERVAL_MS`. On wallet action, re-fetches immediately after `onFinish`.

### 7.2 Leaderboard Page (`app/leaderboard/page.tsx`)

- `RoundCounter` — "X Rounds Survived" hero number.
- `SurvivorTable` — table of past rounds: Round #, Winner Address, truncated to 6+4 chars, with Hiro explorer link.
- Data: iterates `get-round-winner` for rounds 0 to `total-rounds - 1`. Fetches in parallel with `Promise.all`.
- Auto-refreshes every 30 seconds.

---

## 8. Component Specs

### `PetDisplay.tsx`

An animated SVG pet character. Three visual states:
- **Healthy** (all meters ≥ 50): idle bounce animation (CSS keyframes, translate Y ±4px, 1.5s loop).
- **Distressed** (any meter < 20): shake animation (translate X ±3px, 0.3s rapid loop). Sweat drop SVG element appears.
- **Dead:** Static, X eyes, no animation. Grayscale filter applied.

The pet character is a pixelated blocky creature in neon green — designed in SVG directly in the component. No external images. 32×32 pixel grid, scaled to 200×200px display.

### `MeterBar.tsx`

Props: `label: string`, `value: number`, `max: number`

- Renders label (uppercase, `Syne` font, 0.7rem, muted), value number (JetBrains Mono, neon green), and a progress bar.
- Bar fill: neon green when > 50, yellow when 20–50, red when < 20.
- Animated width transition: `transition: width 0.6s ease`.
- Shows a decay arrow icon (↓) with estimated "next decay in X blocks" tooltip.

### `ActionButtons.tsx`

Three buttons: FEED, PLAY, SLEEP.

Design — hard shadow brutalist (same system as Stacks Wrapped):
```css
box-shadow: 4px 4px 0px #00ff94;
border: 1px solid #00ff94;
/* hover */
transform: translate(2px, 2px);
box-shadow: 2px 2px 0px #00ff94;
/* active */
transform: translate(4px, 4px);
box-shadow: 0px 0px 0px #00ff94;
```

- FEED → neon green shadow
- PLAY → violet shadow (`#7b61ff`)
- SLEEP → muted blue shadow (`#3c6eff`)
- Disabled state (wallet not connected): 50% opacity, `cursor: not-allowed`, no hover effect.
- Loading state (tx pending): spinner inside button, disabled.

### `DeathOverlay.tsx`

Full-page overlay, `position: fixed`, `z-index: 9999`, dark background `rgba(10,10,15,0.95)`.

Content:
- Large red "☠" glyph.
- "PET HAS DIED" in JetBrains Mono, red, 3rem.
- "Last saved by: [address]" in muted text.
- "Round #N complete" in muted text.
- "START NEW ROUND" button — hard shadow, red variant (`box-shadow: 4px 4px 0px #ff3c6e`). Calls `callStartNewRound()`.

---

## 9. Design System

Same token set as Stacks Wrapped (consistent brand):

| Token | Value |
|---|---|
| Background | `#0a0a0f` |
| Primary Neon | `#00ff94` |
| Secondary Neon | `#7b61ff` |
| Danger | `#ff3c6e` |
| Warning | `#ffcc00` |
| Text Primary | `#e8e8f0` |
| Text Muted | `#5a5a7a` |
| Font Display | `JetBrains Mono` |
| Font Body | `Syne` |

Global: CRT scanline texture overlay on body (`repeating-linear-gradient`, 2px lines, 3% opacity). Consistent with Stacks Wrapped.

---

## 10. OG Image & Favicon

### `app/api/og/route.tsx`

Edge route using `@vercel/og`. 1200×630px. Dark background, neon green pet SVG icon centered, "STXPET" in JetBrains Mono, "The Community-Owned On-Chain Pet" tagline below. Current round number appended dynamically if passed as query param: `/api/og?round=4`.

### Root layout metadata (`app/layout.tsx`)

```typescript
export const metadata: Metadata = {
  title: 'StxPet — The On-Chain Tamagotchi',
  description: 'A community-owned digital pet living on the Stacks blockchain. Feed it. Play with it. Keep it alive.',
  openGraph: {
    title: 'StxPet — The On-Chain Tamagotchi',
    description: 'A community-owned digital pet living on the Stacks blockchain.',
    url: process.env.NEXT_PUBLIC_APP_URL,
    images: [{ url: `${process.env.NEXT_PUBLIC_APP_URL}/api/og`, width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StxPet — The On-Chain Tamagotchi',
    description: 'Feed it. Play with it. Keep it alive.',
    images: [`${process.env.NEXT_PUBLIC_APP_URL}/api/og`],
  },
};
```

Leaderboard page exports its own `generateMetadata()` with title "StxPet Leaderboard — Hall of Survivors".

### `app/icon.tsx` + `app/apple-icon.tsx`

Programmatic favicon via `next/og` `ImageResponse`. Icon: pixel pet face (two dot eyes, wide pixel smile) in neon green `#00ff94` on dark `#0a0a0f` background. 32×32px for favicon, 180×180px for apple-icon. No static `favicon.ico`.

---

## 11. Hooks

### `usePetState()`

```typescript
return {
  petState: LivePetState | null,
  isLoading: boolean,
  isDead: boolean,
  error: string | null,
  refetch: () => void
}
```

Polls `fetchLiveState()` every `POLL_INTERVAL_MS`. On `isDead = true`, stops polling (no need to spam a dead pet). Cleans up interval on unmount.

### `useLeaderboard()`

```typescript
return {
  rounds: { roundNumber: number; winner: string }[],
  totalRounds: number,
  isLoading: boolean,
  error: string | null
}
```

Fetches `total-rounds` from pet state, then parallel-fetches all round winners.

---

## 12. Wallet Integration

Same `@stacks/connect` setup as Stacks Wrapped:

- `WalletProvider.tsx` — wraps app in `Connect` context, `appConfig` for mainnet.
- `WalletConnectButton.tsx` — `showConnect` for Leather + Xverse. Displays truncated address when connected.
- All contract calls use `openContractCall` with `onFinish` that triggers `refetch()` on `usePetState`.

---

## 13. Package Configs

### Root `package.json`

```json
{
  "name": "stxpet",
  "private": true,
  "packageManager": "pnpm@9.x",
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "bot:start": "pnpm --filter stxpet-bot start",
    "publish:core": "pnpm --filter @winsznx/stxpet-core publish --access public"
  }
}
```

### `pnpm-workspace.yaml`

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### `packages/stxpet-core/package.json`

```json
{
  "name": "@winsznx/stxpet-core",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "pnpm run build"
  }
}
```

### `apps/web` Key Dependencies

```json
{
  "dependencies": {
    "@stacks/connect": "^7.x",
    "@stacks/transactions": "^6.x",
    "@vercel/og": "latest",
    "@winsznx/stxpet-core": "workspace:*",
    "next": "14.x",
    "react": "^18.x",
    "react-dom": "^18.x"
  }
}
```

---

## 14. `vercel.json`

At repo root:

```json
{
  "framework": "nextjs",
  "rootDirectory": "apps/web",
  "buildCommand": "cd ../.. && pnpm turbo run build --filter=web",
  "installCommand": "pnpm install",
  "outputDirectory": "apps/web/.next"
}
```

---

## 15. Deployment Checklist

**Contract:**
- [ ] Deploy `stx-pet-v1.clar` to Stacks Mainnet via Leather wallet
- [ ] Copy deployer address into `.env.local`
- [ ] Verify `get-live-state` returns all meters at `u100` and `pet-alive = true`
- [ ] Test `feed`, `play`, `sleep` via Hiro explorer

**NPM Package:**
- [ ] `pnpm --filter @winsznx/stxpet-core build`
- [ ] Verify `dist/` contains `index.js` and `index.d.ts`
- [ ] `pnpm --filter @winsznx/stxpet-core publish --access public`

**Bot:**
- [ ] Create `.env` in `apps/bot` with `BOT_PRIVATE_KEY` and thresholds
- [ ] Run `pnpm bot:start` and confirm first poll cycle logs correctly
- [ ] Confirm a real `feed` tx is submitted and visible on Hiro explorer

**Web App:**
- [ ] All env vars set in Vercel dashboard including `NEXT_PUBLIC_APP_URL`
- [ ] `pnpm turbo run build` passes with zero TypeScript errors
- [ ] Deploy to Vercel — confirm `rootDirectory: apps/web` is respected
- [ ] Test: connect wallet → call feed → meter updates after poll
- [ ] Test: OG image renders at `/api/og`
- [ ] Test: favicon shows pixel pet, not Next.js default

---

## 16. Out of Scope (V1)

- No per-user stats or history.
- No marketplace for Survivor NFTs.
- No multiplayer rooms or pet variants.
- No external indexers beyond `api.hiro.so`.
- No push notifications for low meter warnings.
- No bot hosting — run locally.