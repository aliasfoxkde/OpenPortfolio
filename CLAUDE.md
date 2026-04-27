# OpenPortfolio - Claude Code Configuration

**Project:** Micheal Kinney Portfolio Website  
**Date:** 2026-04-26  

---

## 📋 Project Context

This is a portfolio website for Micheal Kinney (aliasfoxkde), a Full-Stack developer with 92 GitHub repositories and 10+ Cloudflare Pages deployments.

### Key Data Points
- **GitHub:** https://github.com/aliasfoxkde (92 repos, 22 followers)
- **Primary Projects:** OpenZenith, TeckSpecs, PatternForge, OpenPress, WebOS, StationAware
- **Avatar:** https://avatars.githubusercontent.com/u/161227007?v=4

### Tech Stack
- Vite + React 19 + TypeScript
- TailwindCSS v4
- Framer Motion
- Radix UI + Lucide Icons
- Vitest + Playwright
- Cloudflare Pages

---

## 🎯 Current Goal

Building a world-class portfolio website with:
- Interactive animated hero with particle background
- Snap-scrolling navigation with progress indicator
- Project showcase with flip cards and filtering
- WCAG 2.5 AAA accessibility
- 100% test coverage
- PWA support
- Deployed to Cloudflare Pages

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `docs/RESEARCH.md` | Data extraction results |
| `docs/PLANNING.md` | Implementation plan |
| `docs/PRD.md` | Product requirements |
| `docs/TASKS.md` | Task tracking (152 tasks) |
| `docs/PROGRESS.md` | Progress log |
| `src/data/projects.ts` | Project data (all 92 repos) |
| `src/components/sections/` | Section components |
| `src/components/ui/` | UI components (Button, Badge, Card, etc.) |

---

## 🔧 Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Tests
npm test
npm run test:unit
npm run test:e2e

# Lint
npm run lint
npm run format

# Deploy
npm run deploy:preview
npm run deploy:production
```

---

## ✅ Quality Standards

- **Accessibility:** WCAG 2.5 AAA
- **Performance:** Lighthouse 95+
- **Testing:** 90%+ coverage, all critical paths tested
- **Code:** Strict TypeScript, ESLint + Prettier
- **PWA:** Full offline support, installable

---

## 📝 Notes

- All project data in `src/data/projects.ts` - no placeholder/mock data
- Components are fully accessible with ARIA attributes
- Design tokens in CSS variables (see `src/styles/globals.css`)
- Test files in `tests/unit/` and `tests/e2e/`

---

**Last Updated:** 2026-04-26  
**Status:** Foundation complete, Navigation/Header in progress