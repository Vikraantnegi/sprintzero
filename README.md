# SprintZero Studios

Agency site for **SprintZero Studios** — we design and ship investor-ready MVPs in 72 hours.

## Stack

- [Next.js](https://nextjs.org) (App Router)
- [Tailwind CSS](https://tailwindcss.com) v4
- TypeScript
- [GSAP](https://gsap.com) + `@gsap/react`

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Serve production build   |
| `npm run lint`  | Run ESLint               |

## Structure

```
src/
  app/           # routes, layout, global styles
  components/    # shared UI (header, footer)
  sections/      # page sections
  lib/gsap/      # GSAP registration helpers
```
