# Bushy & Meme 2025 💙

A standalone clone of the Base44 app **"Bushy & Meme 2025"** — a password-protected
memory book of monthly moments through 2025, cloned from
[Base44](https://base44.com) into a fully self-contained React app.

## What's inside

- **React 18 + Vite + Tailwind CSS + shadcn/ui** (the same stack Base44 generates)
- **Pages**: lock screen (`Index`), year overview (`Overview`), per-month memories (`Month`), and a secret FAQ (`SecretFAQ`)
- **All memory text** lives in `src/components/memories.jsx`
- **All 77 photos** are stored locally in `public/photos/` — no dependency on Base44's storage

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to ./dist
```

## Notes

- The Base44 platform SDK has been removed; auth scaffolding was replaced with
  no-op equivalents (the app never used platform login — the lock screen has its
  own passphrase).
- Deploy the `dist/` output to any static host (Vercel, Netlify, GitHub Pages…).
