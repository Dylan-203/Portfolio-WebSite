# Dylan Ang — Portfolio

A bilingual (English / 中文) personal portfolio built with React, Vite and Tailwind CSS. The design follows an editorial, paper-and-ink look, and the page is meant to be interacted with rather than just read.

## Features

- **Bilingual content** — switch between English and Chinese from the nav bar. The choice is remembered, and the first visit follows the browser language.
- **Cursor-reactive hero** — the letters of the name soften and thicken as the pointer approaches, using the variable axes of the Fraunces font.
- **Skills ↔ projects linking** — select a skill and the projects that use it stay highlighted while the rest fade out.
- **Project case-study panels** — each project opens in an accessible dialog (Esc, click-outside and focus handling included). Optional fields add problem, role, result and links.
- **Interactive demo** — the energy-monitoring project includes a live chart driven by *simulated* sensor data, with an appliance on/off toggle.
- **Scroll-driven timeline** — the experience line fills as you scroll and each milestone lights up when it is reached.
- **Copy-to-clipboard email** — one click copies the address, with a `mailto:` fallback.
- **Smooth scrolling and custom cursor** — Lenis for scrolling, a lightweight cursor for mouse users only.
- **Accessible by default** — semantic landmarks, keyboard-operable cards, visible focus states, and `prefers-reduced-motion` support.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | React 18 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Smooth scroll | [Lenis](https://github.com/darkroomengineering/lenis) |
| Icons | lucide-react |
| Fonts | Fraunces, Hanken Grotesk, Noto Serif SC, Noto Sans SC (Google Fonts) |

Everything else (reveal effects, spotlight cards, count-up numbers, magnetic buttons, the cursor) is plain CSS and small hand-written components, so there is no animation framework to maintain.

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
npm run dev       # start the dev server at http://localhost:5173
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## Project structure

```
src/
├── App.jsx                  # page composition, language state, shared skill filter
├── content/index.js         # ALL text and data (EN + ZH) — edit this to update the site
├── components/
│   ├── Navigation.jsx       # nav, language toggle, scroll progress
│   ├── Hero.jsx
│   ├── About.jsx            # bento grid
│   ├── Skills.jsx
│   ├── Experience.jsx
│   ├── Projects.jsx         # project rows + case-study dialog
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── Background.jsx       # grain texture and pointer glow
│   ├── CustomCursor.jsx
│   └── ui/                  # CountUp, EnergyDemo, Magnetic, SpotlightCard
├── hooks/useSmoothScroll.js
├── lib/match.js             # skill ↔ project matching
└── index.css
```

## Updating the content

Text and data live in `src/content/index.js`, not inside the components. Each section exports an object with an `en` and a `zh` entry, so a change is made in one place per language.

To add a project, append an item to `projects.en.projects` and `projects.zh.projects`:

```js
{
  title: 'Project name',
  cover: 'my-project.webp',                   // optional screenshot in src/assets/covers
  shortTitle: 'Shorter name for the card',   // optional
  description: 'What it is and what I built.',
  problem: 'The problem it solves.',          // optional
  role: 'My part in it.',                     // optional
  result: 'What came out of it.',             // optional
  links: { github: 'https://…', demo: 'https://…' }, // optional
  tags: ['React', 'Node.js']
}
```

Optional fields appear in the case-study panel only when they are present.

**How skill filtering works:** `lib/match.js` checks whether any word of a skill appears in a project's tags or description. If a skill never shows up in a project, it highlights nothing, so put the technologies you used into the tags.

**Project covers:** put a screenshot in `src/assets/covers/` (WebP, about 1600px wide keeps it light) and set `cover` to its file name. Projects without one get a generated cover (colour, pattern and initials).

## Theming

Colours and fonts are defined in `tailwind.config.js`:

| Token | Use |
| --- | --- |
| `paper` | page background |
| `ink` | text and dark sections |
| `accent` | primary green |
| `sage` | soft tint for highlights |
| `ochre` | secondary text accent |

## Design notes

- **Single-page Vite app, no router.** The site is a one-page showcase, so a framework with server rendering would add cost without a clear benefit.
- **Content separated from presentation.** Updating a CV never requires touching component code.
- **Motion is tied to the user's actions** (pointer, scroll, click) rather than played on load, with one entrance sequence in the hero.
- **Touch and reduced-motion aware.** The custom cursor and pointer effects are disabled on touch devices, and smooth scrolling and animations are turned off when the user prefers reduced motion.

## Deployment

The site is fully static. `npm run build` produces a `dist/` folder that any static host can serve. A `vercel.json` and a `netlify.toml` are included for the single-page fallback, so keep the one that matches your host.

## Notes

- The energy-monitoring chart uses **simulated data** to illustrate the idea; it does not read from the real system.

## License

© Dylan Ang Jing Yuan. All rights reserved.
