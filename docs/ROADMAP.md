# OpenPortfolio - Future Scope

## Current Implementation

### What's Working
- [x] Dynamic GitHub API loading (non-forked repos)
- [x] Light/Dark/System theme toggle
- [x] Sort by recent, stars, forks, name
- [x] Refresh button to re-fetch
- [x] SEO (sitemap.xml, robots.txt, meta tags)
- [x] Authenticated API (5000 req/hour)
- [x] PWA support

### GitHub Sources
- [x] `aliasfoxkde` user repos (auto-fetched)
- [x] `stackblitz-labs/bolt.diy` (manual)
- [x] `SWARMONE/agentic-swarm-bench` (manual)

---

## Future Scope

### Organization Repos
**Status:** Not implemented

**To enable:**
1. Update token at https://github.com/settings/tokens
2. Add `read:org` scope
3. Update GitHub Secret in repo settings
4. Modify `src/lib/github.ts` to call `/user/orgs` endpoint

**Code changes needed:**
```typescript
// Fetch user's organizations
const orgs = await fetch('https://api.github.com/user/orgs', headers);
// For each org, fetch repos
for (const org of orgs) {
  const orgRepos = await fetch(`https://api.github.com/orgs/${org.login}/repos`, headers);
  allRepos.push(...orgRepos);
}
```

### Project Screenshots
**Status:** Not implemented

**Options:**
1. Use GitHub's repo images API: `https://repository-images.githubusercontent.com/{id}`
2. Use `https://img.shields.io/` for repo badges
3. Use `https://opengraph.github.com/` for OG images

### Code Splitting
**Status:** Not implemented

**Lazy load sections below fold:**
```typescript
const AboutSection = lazy(() => import('./sections/AboutSection'));
const ContactSection = lazy(() => import('./sections/ContactSection'));
```

### Project Detail Pages
**Status:** Not implemented

**Options:**
1. Modal/overlay on card click
2. `/projects/:id` routes with React Router
3. Slide-out panel

### Analytics
**Status:** Not implemented

**Options:**
1. Cloudflare Analytics (built-in with Pages)
2. Privacy-focused: Plausible Analytics
3. Umami (self-hosted)

---

## Deferred Features

| Feature | Priority | Notes |
|---------|----------|-------|
| Organization repos | Low | Requires `read:org` token scope |
| Project screenshots | Medium | API exists, just need UI |
| Code splitting | Low | Bundle is only 450KB |
| Detail pages | Medium | Cards are self-contained |
| Analytics | Low | Cloudflare has basic stats |
