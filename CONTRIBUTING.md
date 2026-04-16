# Contributing

Thanks for your interest in StxPet.

## Setup

This repo is a pnpm workspace. Use pnpm for everything:

```bash
pnpm install
pnpm turbo run build
```

## Commit conventions

- Use [Conventional Commits](https://www.conventionalcommits.org/) (feat, fix, chore, refactor, test, docs).
- Keep each commit atomic — one logical change per commit.
- Never use git add . or git add -A; always name files explicitly.

## Code style

- TypeScript strict mode on every package.
- No hardcoded values in app code — everything flows through lib/constants.
- No @ts-ignore, no as any.
- Match existing patterns (inline styles in components, env-driven config).

## Publishing

Only maintainers publish releases. Bump the version in package.json, update CHANGELOG.md, and run pnpm publish:core.
