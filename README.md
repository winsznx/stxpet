[![CI](https://github.com/winsznx/stxpet/actions/workflows/ci.yml/badge.svg)](https://github.com/winsznx/stxpet/actions)
# StxPet

A collaborative on-chain Tamagotchi living on Stacks Mainnet. One pet. Three meters. Any wallet can feed it, play with it, or put it to sleep. Let any meter hit zero and the pet dies — the last person to touch it wins a non-transferable SIP-009 survivor badge. The contract resets and a new round begins.

No owner. No admin key. Fully on-chain state.

---

## Repo Structure

```
stxpet/
├── contracts/
│   └── stx-pet-v1.clar          # Clarity smart contract
├── apps/
│   ├── web/                      # Next.js 14 App Router frontend
│   └── bot/                      # Node.js polling bot (auto-feeder)
└── packages/
    └── stxpet-core/              # @winsznx/stxpet-core — parsers + tx builders
```

Monorepo: pnpm workspaces + Turborepo. TypeScript strict mode everywhere.

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 9.x (`npm i -g pnpm`)

### Install

```bash
pnpm install
```

### Environment Variables

**`apps/web/.env.local`**

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

**`apps/bot/.env`**

```
BOT_PRIVATE_KEY=<bot wallet private key>
CONTRACT_DEPLOYER=<mainnet deployer address>
CONTRACT_NAME=stx-pet-v1
BOT_HUNGER_THRESHOLD=30
BOT_HAPPINESS_THRESHOLD=30
BOT_ENERGY_THRESHOLD=30
BOT_POLL_INTERVAL_MS=60000
```

### Dev

```bash
# All apps in parallel
pnpm dev

# Web only
pnpm --filter web dev

# Bot (watch mode)
pnpm --filter stxpet-bot dev
```

---

## Smart Contract

**File:** `contracts/stx-pet-v1.clar`
**Network:** Stacks Mainnet

### Meter mechanics

Three meters — Hunger, Happiness, Energy — each stored as a `uint` (0–100). They decay by 1 point every 10 blocks (~100 minutes on mainnet). Decay is calculated lazily: every interaction computes elapsed blocks since `last-interaction-block` and subtracts accordingly.

```
decay = floor(blocks_elapsed / 10) * 1
effective_value = max(0, stored_value - decay)
```

If any effective meter reaches zero, the next `feed`/`play`/`sleep` call triggers death before applying the boost.

### Public functions

| Function | Effect |
|---|---|
| `feed` | Hunger += 20 (capped at 100) |
| `play` | Happiness += 20 |
| `sleep` | Energy += 20 |
| `start-new-round` | Resets all meters to 100, increments round counter — callable only when pet is dead |

### Death + NFT

When death triggers:
1. `pet-alive` is set to `false`
2. A `stxpet-survivor` NFT is minted to `last-interactor` (the previous caller)
3. Round number and winner are recorded in the `round-winners` map
4. `start-new-round` must be called manually to begin the next round

### Read-only functions

| Function | Returns |
|---|---|
| `get-live-state` | Decay-adjusted meters + block height + alive status + total rounds |
| `get-raw-state` | Stored (non-decayed) values |
| `get-round-winner(round)` | `(optional principal)` |
| `get-nft-owner(token-id)` | `(optional principal)` |

### Error codes

| Code | Meaning |
|---|---|
| `u100` | Pet is dead — interaction rejected |
| `u101` | Pet is already dead — `start-new-round` is callable |

---

## `@winsznx/stxpet-core`

Standalone npm package with no app dependencies. Shareable by the web app, the bot, or any third-party integration.

```bash
npm install @winsznx/stxpet-core
```

### Exports

**Parsers**

- `parsePetState(clarityResponse)` — unwraps the Clarity `get-live-state` response into a typed `RawPetState`
- `computeCurrentMeters(raw, currentBlock)` — applies the decay formula client-side, returns `LivePetState`
- `parseDeathEvent(eventLog)` — extracts winner principal and round number from Hiro contract event logs

**Transaction builders**

- `buildFeedTx(contractDeployer, network)` → `ContractCallOptions`
- `buildPlayTx(contractDeployer, network)` → `ContractCallOptions`
- `buildSleepTx(contractDeployer, network)` → `ContractCallOptions`

All builders return options compatible with `@stacks/transactions`.

---

## Bot Configuration

The bot is a long-running Node.js process. It polls `get-live-state` on the configured interval and submits transactions when any meter falls below threshold.

```bash
# Start
pnpm bot:start

# Dev (watch mode)
pnpm --filter stxpet-bot dev
```

Behavior:
- If pet is dead: logs a warning, does not auto-call `start-new-round`
- On unhandled error: logs and continues — never crashes the loop
- Submits at most one action per cycle per meter (feed if hungry, play if unhappy, sleep if low energy)

Tune aggressiveness with the threshold env vars. Lower threshold = bot intervenes less often, higher = more proactive.

---

## Deployment

### Contract

1. Deploy `contracts/stx-pet-v1.clar` to Stacks Mainnet via Leather wallet
2. Copy the deployer address into both `.env` files
3. Verify via Hiro explorer: `get-live-state` should return all meters at `u100` and `pet-alive = true`

### NPM Package

```bash
pnpm --filter @winsznx/stxpet-core build
pnpm --filter @winsznx/stxpet-core publish --access public

# Or via root shortcut
pnpm publish:core
```

Requires npm login under the `@winsznx` org.

### Web App (Vercel)

`vercel.json` at repo root configures the build:

```json
{
  "framework": "nextjs",
  "rootDirectory": "apps/web",
  "buildCommand": "cd ../.. && pnpm turbo run build --filter=web",
  "installCommand": "pnpm install"
}
```

Set all `NEXT_PUBLIC_*` env vars in the Vercel dashboard before deploying. The app throws a build error on any missing var.

```bash
# Verify build locally before pushing
pnpm turbo run build
```

---

## Tech Stack

| Layer | Tech |
|---|---|
| Blockchain | Stacks Mainnet, Clarity |
| Smart contract | `stx-pet-v1.clar` |
| Core package | TypeScript, `@stacks/transactions` |
| Frontend | Next.js 14 App Router, `@stacks/connect` |
| Wallet support | Leather, Xverse |
| Bot | Node.js, `ts-node` |
| Monorepo | pnpm workspaces, Turborepo |
| Hosting | Vercel (`apps/web`), self-hosted (`apps/bot`) |
| OG images | `@vercel/og` edge runtime |

---

## Design

`#0a0a0f` background. `#00ff94` primary. JetBrains Mono + Syne. Brutalist hard-shadow buttons. CRT scanline texture. No gradients.
