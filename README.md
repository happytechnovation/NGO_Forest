# Treelands Foundation — Website

A modern, fully responsive, **content-driven** website for Treelands Foundation, a Bengaluru-based
forestry & environment non-profit. Built with **React + TypeScript + Vite + Tailwind CSS**.

## Quick start

```bash
npm install            # install dependencies
npm run download-assets # (optional) re-fetch images from the live site into public/resources
npm run dev            # start dev server  → http://localhost:5173
npm run build          # type-check + production build → dist/
npm run preview        # preview the production build locally
```

## Editing content (no code required)

All text and images live in **`src/data/*.json`**. Edit a file and the site updates automatically:

| File | Controls |
|------|----------|
| `site.config.json` | Brand, navigation, WhatsApp number, social links, SEO |
| `contact.json` | Addresses, phones, emails, office hours, map |
| `home.json` | Hero, intro, vision, mission, core values |
| `services.json` | The 6 services |
| `team.json` | Team members (name, title, bio, photo) |
| `projects.json` | Projects |
| `partners.json` | Partner organisations |
| `gallery.json` | Gallery images + categories |
| `blogs.json` | Blog posts (+ detail body) |
| `faq.json` | FAQ accordion |
| `impact.json` | Animated impact stat counters |
| `getInvolved.json` | Get Involved cards |
| `stories.json` | Field stories |
| `credentials.json` | Trust / registration badges |
| `donate.json` | Donate section content |

**Icons:** `icon` fields use [lucide](https://lucide.dev) names (e.g. `"TreePine"`). To use a new
icon, add it to the registry in `src/lib/icon.tsx`.

**Images:** drop files into `public/resources/...` and reference them as `/resources/...`.

## Theming

The forest colour palette and design tokens live in **`tailwind.config.ts`** (and
`src/index.css` for CSS variables). Change a colour there to re-skin the whole site.

## Contact form (EmailJS)

The contact form works out of the box via a `mailto:` fallback. To send emails directly,
create a free [EmailJS](https://www.emailjs.com/) account and copy `.env.example` → `.env`
with your `VITE_EMAILJS_*` IDs. The template should include the fields:
`user_name, user_email, user_phone, subject, message`.

## Structure

```
public/resources/   self-hosted images (brand, team, gallery, projects, stories)
src/data/           JSON content + typed loader (index.ts)
src/types/          TypeScript interfaces for the JSON
src/lib/            helpers (icon registry, cn, date, email config)
src/components/ui/        reusable UI kit
src/components/layout/    Navbar, Footer, WhatsApp FAB, Layout, PageHeader
src/components/sections/  page sections (Hero, Services, Donate, …)
src/components/cards/     ProjectCard, TeamCard
src/pages/          one component per route
scripts/            asset-download script
```

## To complete before go-live

- Confirm **80G/12A** tax status, **CIN**, bank/UPI details → update `credentials.json`, `donate.json`
- Replace placeholder **impact numbers** → `impact.json`
- Add real **social media URLs** → `site.config.json`
- Connect **EmailJS** → `.env`
- Choose a host (Netlify / Vercel / GitHub Pages / cPanel). For a sub-folder host, set `base` in `vite.config.ts`.
