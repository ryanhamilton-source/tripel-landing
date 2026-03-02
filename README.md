# Tripel — Landing Page

Marketing landing page for [Tripel](https://tripel.app), the travel companion app for unforgettable group adventures.

## Stack

- **Framework** — [Next.js 14](https://nextjs.org) (App Router)
- **Styling** — [Tailwind CSS v4](https://tailwindcss.com)
- **Animations** — [Framer Motion](https://www.framer.com/motion/)
- **World Map** — [react-simple-maps](https://www.react-simple-maps.io/) with Natural Earth TopoJSON
- **Font** — Inter (Google Fonts)

## Features

- Animated hero with a real world map (Natural Earth projection) and a multi-city flight path animation — New York → London → Rome → Tokyo → Bali → Sydney
- Plane icon that travels the full route with correct geographic positioning
- Sticky navbar with blur-on-scroll
- Features grid with glass-morphism cards
- How it works — 3-step section
- App preview with floating phone mockups
- CTA strip and footer
- Fully static export — no server required

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — if that port is taken, Next.js will try 3001, 3002, etc.

## Project Structure

```
landing-tripel/
├── app/
│   ├── layout.tsx        # Root layout, metadata, fonts
│   ├── page.tsx          # Page composition
│   └── globals.css       # Tailwind imports + custom utilities
├── components/
│   ├── Navbar.tsx        # Sticky nav with blur-on-scroll
│   ├── Hero.tsx          # World map + flight path animation
│   ├── WorldMap.tsx      # react-simple-maps base map
│   ├── Features.tsx      # 4-card features grid
│   ├── HowItWorks.tsx    # 3-step section
│   ├── AppPreview.tsx    # Phone mockups + stats
│   ├── CTAStrip.tsx      # Download CTA banner
│   └── Footer.tsx        # Links + socials
└── public/               # Icons and favicons
```

## Build

```bash
npm run build
npm run start
```

## Deployment

Deploy to [Vercel](https://vercel.com) in one click — just connect this repo and it will auto-deploy on every push to `main`.

Alternatively, run `npm run build` and serve the `.next` output from any Node.js host.
