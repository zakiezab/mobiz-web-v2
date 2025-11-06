# Mobiz Monorepo

This repository now hosts multiple applications managed via pnpm workspaces.

```
apps/
  ├─ web/              # Next.js marketing site (production)
  └─ content-engine/   # Placeholder for OpenAI Agent SDK tooling
```

## Common Scripts

Run commands from the repo root using pnpm filters:

```bash
pnpm dev            # starts apps/web
pnpm build          # builds apps/web
pnpm lint           # lints apps/web
pnpm test           # runs unit tests
pnpm test:e2e       # runs Playwright suite
```

To execute a script inside a specific workspace:

```bash
pnpm --filter @mobiz/web <script>
```

Refer to `docs/` for implementation guides and marketing/automation plans.
