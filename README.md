# pl-website

The Primary Logic marketing site: one static page stating what the company is building, plus a privacy policy. Next.js 16 App Router, React 19, Tailwind v4. No API routes, no database, no forms — the only conversion path is a `mailto:` link.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build; also runs the TypeScript check
npm run lint
```

Node 22 or newer.

**`npx tsc --noEmit` fails on a fresh checkout** with `Cannot find name 'LayoutProps'`. Next generates that type into `.next/types` during a build, so run `npm run build` once first. `next build` type-checks the project itself, which is why CI has no separate `tsc` step.

## Layout

| Path | What's there |
|---|---|
| `app/page.tsx` | Homepage, a thin wrapper over `components/home/HomePage.tsx` |
| `app/privacy-policy/page.tsx` | Privacy policy, rendered through `components/StubPage.tsx` |
| `app/layout.tsx` | Fonts, metadata, Open Graph and Twitter cards |
| `app/opengraph-image.tsx`, `app/icon.svg`, `app/apple-icon.tsx` | Generated social image and icons |
| `app/robots.ts`, `app/sitemap.ts` | Generated `robots.txt` and `sitemap.xml` |
| `lib/content/` | Site copy, kept out of components so wording changes don't touch markup |
| `components/home/` | Homepage sections |

`components/home/HomePage.tsx` is the only homepage component the site renders today. The walkthrough components beside it (`RecoveryWalkthrough`, `InvoiceWalkthrough`, `OnboardingWalkthrough`, `LanePage` and the chrome it pulls in) are unreachable from any route — they belong to the site that commit 8fb1c2f replaced, and are kept on purpose while their future is undecided. `npm run build` will not catch a change that breaks them.

## Configuration

One environment variable, documented in `.env.example`:

- `NEXT_PUBLIC_SITE_URL` — canonical origin for metadata, `robots.txt` and `sitemap.xml`. Defaults to `https://primarylogic.com`.

## CI

`.github/workflows/ci.yml` runs lint and build on every push to `main` and every pull request.

Two checks predate it and still run: Vercel builds a preview deployment per push and reports pass or fail, and CodeQL scans the code through GitHub's default setup. Neither runs the linter, which is the gap this workflow fills, along with building on a clean runner independent of Vercel's build environment.
