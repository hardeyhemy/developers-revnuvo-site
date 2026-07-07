# Revnuvo Developers Portal

The canonical home for the Revnuvo x402 ecosystem — SDK, Gateway, Resource APIs, and documentation.

**Phase 1 scope:** homepage, SDK page, Gateway page, API catalog, documentation shell.

## Stack

Next.js 15 (App Router, static export) · TypeScript · Tailwind CSS · Framer Motion-ready · IBM Plex Sans/Mono

## Deploying (no local Node.js required)

This project is configured for **static export** (`output: "export"` in `next.config.mjs`), which Cloudflare Pages builds automatically from a GitHub repo — no terminal needed on your end:

1. Push this folder to a new GitHub repo (e.g. `hardeyhemy/developers-revnuvo-site`), via the GitHub web UI (drag-and-drop upload works for the initial commit).
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repo. Build settings:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output directory: `out`
4. Deploy. Cloudflare builds it in their environment — you never need npm installed locally.
5. Once live, add `developers.revnuvo.site` as a custom domain on the Pages project.

## Local development (optional, only if you later use Replit or another Node environment)

```
npm install
npm run dev
```

## Roadmap (not in Phase 1)

- Full docs content (currently a shell with placeholders)
- MCP server product page
- Search
- Working code examples (Cloudflare Worker / Node / Next.js / Express)
