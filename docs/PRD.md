# OpenPortfolio - Product Requirements Document

**Version:** 1.0.0  
**Date:** 2026-04-26  
**Status:** Draft  
**Author:** Micheal Kinney (aliasfoxkde)  

---

## 🎯 Product Vision

A world-class portfolio website that consolidates all projects, resources, and professional presence into one cohesive, polished, and interactive experience. The portfolio should feel like navigating a premium software product—not a static webpage.

### Core Experience Goals
1. **Impressive First Impression** - Animated hero that showcases technical capability
2. **Easy Navigation** - Snap-scrolling sections with clear visual hierarchy
3. **Deep Project Showcase** - Interactive flip cards with comprehensive project details
4. **Professional Footer** - Complete contact info, social links, and legal compliance

---

## 📋 Requirements Matrix

### Must Have (P0)

#### Hero Section
- [ ] Animated particle/gradient background with interactive elements
- [ ] GitHub avatar integration with glow effect
- [ ] Name, title, and tagline display
- [ ] CTA buttons (GitHub, Projects, Contact)
- [ ] Scroll indicator animation

#### Navigation
- [ ] Sticky header with snap-scrolling behavior
- [ ] Section progress indicator
- [ ] Mobile hamburger menu with slide-out drawer
- [ ] Smooth scroll to sections
- [ ] Active section highlighting

#### Projects Showcase
- [ ] Filterable grid by project category
- [ ] Flip cards with:
  - Front: Project thumbnail, name, brief description
  - Back: Full description, tech stack, links (live, github, docs, donate)
- [ ] Category badges and language icons
- [ ] Hover animations (3D flip, glow, shadow lift)
- [ ] Search functionality

#### About Section
- [ ] Bio text with animated typing effect
- [ ] Skills/technologies grid
- [ ] Statistics (repos, commits, languages)
- [ ] Profile photo with frame animation

#### Sponsor/Affiliate Section
- [ ] Affiliate links grid with icons
- [ ] Sponsored project showcase
- [ ] Donation links (GitHub Sponsors, Ko-fi, Patreon)
- [ ] Clear affiliate disclosure

#### Footer
- [ ] Contact information (email, location)
- [ ] Social media links (GitHub, Twitter, LinkedIn, etc.)
- [ ] Navigation links (sitemap)
- [ ] Copyright and legal links (Privacy, Terms)
- [ ] RSS feed subscription
- [ ] Back-to-top button

### Should Have (P1)

#### Additional Features
- [ ] Blog/news section with recent posts
- [ ] Testimonials or reviews carousel
- [ ] Timeline of achievements
- [ ] Open-source contributions showcase
- [ ] Skills radar/chart visualization

#### Performance
- [ ] Lighthouse score 95+ (Performance, Accessibility, Best Practices, SEO)
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Cumulative Layout Shift < 0.1

### Could Have (P2)

#### Extra Polish
- [ ] Custom cursor effects
- [ ] Sound effects (optional, muted by default)
- [ ] 3D scene background (Three.js)
- [ ] Multi-language support
- [ ] Theme switcher (light/dark/high-contrast)

---

## 🎨 Design Specifications

### Color Palette
```
--background:        #0a0a0f (near black)
--background-alt:    #12121a (elevated surface)
--foreground:        #fafafa (white text)
--foreground-muted:  #a1a1aa (gray text)
--primary:           #6366f1 (indigo)
--primary-glow:       #818cf8 (lighter indigo)
--accent:            #06b6d4 (cyan)
--accent-glow:       #22d3ee (lighter cyan)
--success:           #22c55e (green)
--warning:           #f59e0b (amber)
--error:             #ef4444 (red)
```

### Typography
```
--font-sans:   Inter, system-ui, sans-serif
--font-mono:   JetBrains Mono, Fira Code, monospace
--font-heading: Inter, 700 weight

--text-xs:    0.75rem / 1rem
--text-sm:    0.875rem / 1.25rem
--text-base:  1rem / 1.5rem
--text-lg:    1.125rem / 1.75rem
--text-xl:    1.25rem / 1.75rem
--text-2xl:   1.5rem / 2rem
--text-3xl:   1.875rem / 2.25rem
--text-4xl:   2.25rem / 2.5rem
```

### Spacing System
```
--space-1:  0.25rem  (4px)
--space-2:  0.5rem   (8px)
--space-3:  0.75rem  (12px)
--space-4:  1rem     (16px)
--space-5:  1.25rem  (20px)
--space-6:  1.5rem   (24px)
--space-8:  2rem     (32px)
--space-10: 2.5rem   (40px)
--space-12: 3rem     (48px)
--space-16: 4rem     (64px)
--space-20: 5rem     (80px)
--space-24: 6rem     (96px)
```

### Animation Specifications
```
--ease-out:      cubic-bezier(0.33, 1, 0.68, 1)
--ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1)
--ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1)
--duration-fast: 150ms
--duration-base: 300ms
--duration-slow: 500ms
--duration-x-slow: 1000ms
```

### Breakpoints
```
--sm:  640px   (mobile landscape)
--md:  768px   (tablet)
--lg:  1024px  (laptop)
--xl:  1280px  (desktop)
--2xl: 1536px  (large desktop)
```

---

## 📊 Component Inventory

### Navigation Components
| Component | States | Accessibility |
|-----------|--------|---------------|
| Header | default, scrolled, mobile-open | role="navigation", aria-label |
| NavLink | default, hover, active, focus | aria-current="page" |
| MobileMenu | closed, open, animating | role="dialog", focus-trap |
| ProgressIndicator | visible, hidden | aria-live="polite" |

### Hero Components
| Component | States | Accessibility |
|-----------|--------|---------------|
| HeroBackground | loading, ready | aria-hidden="true" |
| Avatar | default, hover, glowing | role="img", aria-label |
| CTASection | default, hover, disabled | role="group" |
| ScrollIndicator | visible, hidden | aria-hidden="true" |

### Project Components
| Component | States | Accessibility |
|-----------|--------|---------------|
| ProjectGrid | default, filtered, loading | role="list" |
| ProjectCard | default, hover, flipped, focus | role="listitem" |
| CategoryFilter | default, selected | role="radiogroup" |
| ProjectSearch | empty, typing, results | role="searchbox" |

### Footer Components
| Component | States | Accessibility |
|-----------|--------|---------------|
| FooterLinks | default, hover | nav with aria-label |
| SocialLinks | default, hover | ul with semantic icons |
| BackToTop | hidden, visible, hover | aria-label, scroll focus |
| LegalLinks | default | links to legal pages |

---

## 🔐 Accessibility Requirements (WCAG 2.5 AAA)

### Perceivable
- [ ] Color contrast ratio minimum 7:1 for normal text
- [ ] 4.5:1 for large text and UI components
- [ ] All non-text content has text alternative
- [ ] Content can be presented in different ways
- [ ] Distinguishable - audio control, spacing, etc.

### Operable
- [ ] All functionality keyboard accessible
- [ ] No keyboard trap
- [ ] Skip navigation links
- [ ] Sufficient time to read content
- [ ] No content flashes more than 3 times/second
- [ ] Users can navigate to find content
- [ ] Focus visible and identifiable
- [ ] Touch target minimum 44x44px

### Understandable
- [ ] Language of page identifiable
- [ ] Consistent navigation
- [ ] Error identification and suggestion
- [ ] Labels and instructions

### Robust
- [ ] Valid HTML
- [ ] Name, role, value是可识别的
- [ ] Status messages可编程识别的

---

## 📱 PWA Requirements

### Manifest
```json
{
  "name": "Micheal Kinney - Developer Portfolio",
  "short_name": "MichealKinney",
  "description": "Full-Stack Developer | ML/AI | Process Automation",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0a0a0f",
  "theme_color": "#6366f1",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### Service Worker
- [ ] Cache-first for static assets
- [ ] Network-first for API calls
- [ ] Offline fallback page
- [ ] Background sync for form submissions
- [ ] Push notifications (optional)

### Install Prompt
- [ ] Custom install banner
- [ ] Deferred prompt handling
- [ ] Install button in mobile menu

---

## 🧪 Testing Requirements

### Unit Tests (Vitest)
- [ ] All utility functions
- [ ] All hooks (custom React hooks)
- [ ] All data transformations
- [ ] Component rendering (snapshot + logic)
- Target: 90%+ coverage

### Integration Tests
- [ ] Navigation flow
- [ ] Project filtering
- [ ] Card flip animations
- [ ] Form submissions

### E2E Tests (Playwright)
- [ ] Home page load
- [ ] Navigation snap scrolling
- [ ] Project card interactions
- [ ] Mobile responsive
- [ ] Accessibility audit
- [ ] Performance metrics
- Target: Critical paths 100%

### Accessibility Tests
- [ ] axe-core automated checks
- [ ] Manual screen reader testing
- [ ] Keyboard navigation audit
- [ ] Color contrast verification

---

## 🚀 Deployment Requirements

### Cloudflare Pages
- [ ] Wrangler configuration
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Environment variables
- [ ] Custom domain setup
- [ ] Preview deployments for PRs

### CI/CD Pipeline
- [ ] GitHub Actions for tests
- [ ] Pre-commit hooks (lint, type-check, tests)
- [ ] Preview deployments
- [ ] Production deployment gate

---

## 📦 Dependencies

### Core
```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "typescript": "^5.6.0",
  "vite": "^6.0.0",
  "@vitejs/plugin-react": "^4.0.0",
  "tailwindcss": "^4.0.0",
  "framer-motion": "^11.0.0"
}
```

### UI Components
```json
{
  "@radix-ui/react-dialog": "^1.0.0",
  "@radix-ui/react-dropdown-menu": "^2.0.0",
  "@radix-ui/react-navigation-menu": "^1.0.0",
  "@radix-ui/react-tooltip": "^1.0.0",
  "lucide-react": "^0.400.0",
  "clsx": "^2.0.0"
}
```

### Testing
```json
{
  "vitest": "^2.0.0",
  "@testing-library/react": "^15.0.0",
  "@testing-library/jest-dom": "^6.0.0",
  "playwright": "^1.40.0",
  "@playwright/test": "^1.40.0",
  "axe-core": "^4.8.0"
}
```

### Icons
- Lucide React (primary)
- Custom SVG for brand icons
- Social media icons (SVG sprites)

---

## 📝 Content Structure

### Home Page Sections
1. **Hero** - Full viewport, animated background
2. **About** - Profile, bio, skills
3. **Projects** - Filterable showcase grid
4. **Affiliates** - Sponsored and affiliate links
5. **Contact** - Contact form and info
6. **Footer** - Full footer with all links

### Project Categories
1. **AI/ML** - OpenZenith, EdgeMind, PrisAI, platform
2. **Web Apps** - OpenPress, WebOS, Productivity
3. **Tools** - PatternForge, TeckSpecs, OpenCAD
4. **Games** - Buy-A-Buddy, Vibe-Kanban
5. **Extensions** - OpenClaw, KiloCode, mcp-configure
6. **Infrastructure** - harness, backend, platform

---

## ✅ Approval Criteria

Before project is considered complete:

1. [ ] All P0 features implemented and tested
2. [ ] WCAG 2.5 AAA compliance verified
3. [ ] Lighthouse scores 95+ in all categories
4. [ ] 100% test coverage on critical paths
5. [ ] PWA installable and working offline
6. [ ] Deployed to Cloudflare Pages with custom domain
7. [ ] No console errors in production build
8. [ ] All links and resources functional
9. [ ] Mobile responsive (iOS Safari, Chrome Android)
10. [ ] GitHub Actions passing

---

**Document Version:** 1.0.0  
**Last Updated:** 2026-04-26  
**Status:** Ready for Implementation