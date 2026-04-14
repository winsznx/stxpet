;; StxPet — The Collaborative On-Chain Tamagotchi
;; A community-owned digital pet on Stacks Mainnet

;; ── Constants ──
(define-constant MAX-METER u100)
(define-constant FEED-BOOST u20)
(define-constant PLAY-BOOST u20)
(define-constant SLEEP-BOOST u20)
(define-constant DECAY-RATE u1)
(define-constant DECAY-INTERVAL u10)
(define-constant ERR-PET-DEAD (err u100))
(define-constant ERR-ALREADY-DEAD (err u101))

;; ── NFT ──
(define-non-fungible-token stxpet-survivor uint)

;; ── Data Variables ──
(define-data-var pet-hunger uint u100)
(define-data-var pet-happiness uint u100)
(define-data-var pet-energy uint u100)
(define-data-var last-interaction-block uint tenure-height)
(define-data-var pet-alive bool true)
(define-data-var last-interactor (optional principal) none)
(define-data-var total-rounds uint u0)
(define-data-var nft-counter uint u0)

;; ── Maps ──
(define-map round-winners uint principal)

;; ── Private: Decay Logic ──
(define-private (compute-decayed-meter (current-value uint) (blocks-elapsed uint))
  (let ((decay (* DECAY-RATE (/ blocks-elapsed DECAY-INTERVAL))))
    (if (> decay current-value) u0 (- current-value decay))
  )
)

(define-private (get-current-meters)
  (let (
    (elapsed (- tenure-height (var-get last-interaction-block)))
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

;; ── Private: Death + Reset ──
(define-private (trigger-death)
  (begin
    (var-set pet-alive false)
    (match (var-get last-interactor)
      winner (let ((token-id (+ (var-get nft-counter) u1)))
        (var-set nft-counter token-id)
        (map-set round-winners (var-get total-rounds) winner)
        (try! (nft-mint? stxpet-survivor token-id winner))
        (ok true)
      )
      (ok true)
    )
  )
)

(define-private (min-uint (a uint) (b uint))
  (if (<= a b) a b)
)

;; ── Private: Interaction Helper ──
(define-private (apply-interaction
  (meters { hunger: uint, happiness: uint, energy: uint })
  (boost-hunger uint)
  (boost-happiness uint)
  (boost-energy uint)
)
  (begin
    (var-set pet-hunger (min-uint MAX-METER (+ (get hunger meters) boost-hunger)))
    (var-set pet-happiness (min-uint MAX-METER (+ (get happiness meters) boost-happiness)))
    (var-set pet-energy (min-uint MAX-METER (+ (get energy meters) boost-energy)))
    (var-set last-interaction-block tenure-height)
    (var-set last-interactor (some tx-sender))
    (ok true)
  )
)

;; ── Public Functions ──
(define-public (feed)
  (let ((meters (get-current-meters)))
    (if (is-dead meters)
      (begin (try! (trigger-death)) ERR-PET-DEAD)
      (apply-interaction meters FEED-BOOST u0 u0)
    )
  )
)

(define-public (play)
  (let ((meters (get-current-meters)))
    (if (is-dead meters)
      (begin (try! (trigger-death)) ERR-PET-DEAD)
      (apply-interaction meters u0 PLAY-BOOST u0)
    )
  )
)

(define-public (sleep)
  (let ((meters (get-current-meters)))
    (if (is-dead meters)
      (begin (try! (trigger-death)) ERR-PET-DEAD)
      (apply-interaction meters u0 u0 SLEEP-BOOST)
    )
  )
)

(define-public (start-new-round)
  (begin
    (asserts! (not (var-get pet-alive)) ERR-ALREADY-DEAD)
    (var-set pet-hunger u100)
    (var-set pet-happiness u100)
    (var-set pet-energy u100)
    (var-set last-interaction-block tenure-height)
    (var-set pet-alive true)
    (var-set last-interactor none)
    (var-set total-rounds (+ (var-get total-rounds) u1))
    (ok true)
  )
)

;; ── Read-Only Functions ──
(define-read-only (get-raw-state)
  {
    hunger: (var-get pet-hunger),
    happiness: (var-get pet-happiness),
    energy: (var-get pet-energy),
    last-interaction-block: (var-get last-interaction-block),
    pet-alive: (var-get pet-alive),
    total-rounds: (var-get total-rounds)
  }
)

(define-read-only (get-live-state)
  (let ((meters (get-current-meters)))
    {
      hunger: (get hunger meters),
      happiness: (get happiness meters),
      energy: (get energy meters),
      last-interaction-block: (var-get last-interaction-block),
      pet-alive: (if (is-dead meters) false (var-get pet-alive)),
      current-block: tenure-height,
      total-rounds: (var-get total-rounds)
    }
  )
)

(define-read-only (get-round-winner (round uint))
  (map-get? round-winners round)
)

(define-read-only (get-nft-owner (token-id uint))
  (nft-get-owner? stxpet-survivor token-id)
)
