# P2P AI Brochure

## Run locally

```bash
npm install
npm run dev
```

## Deploy on Cloudflare Pages (Dashboard)

1. Push this folder to a Git repository (GitHub/GitLab).
2. In Cloudflare: `Workers & Pages` -> `Create application` -> `Pages` -> `Connect to Git`.
3. Select your repo and use:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy.

## Deploy via Wrangler CLI

```bash
npm install
npm run build
npx wrangler pages deploy dist --project-name brochure
```

Replace `brochure` with your Cloudflare Pages project name if needed.
