// ============================================
// OpenPortfolio - Project Data
// Dynamic loading from GitHub API
// ============================================

import { getGitHubRepos, getGitHubProfile } from '@/lib/github';
import type { Project } from '@/lib/types';

/**
 * Get all projects (dynamically loaded)
 */
export async function getAllProjects(): Promise<Project[]> {
  return getGitHubRepos();
}

/**
 * Get GitHub profile (dynamically loaded)
 */
export async function getProfile() {
  return getGitHubProfile();
}

/**
 * Default profile data (fallback while loading)
 */
export const defaultProfile = {
  login: 'aliasfoxkde',
  name: 'Micheal Kinney',
  bio: 'Full-Stack developer with passion for CS, ML/AI, process automation, and technical writing.',
  company: null,
  location: null,
  blog: '',
  email: null,
  hireable: null,
  publicRepos: 28,
  publicGists: 0,
  followers: 22,
  following: 58,
  avatarUrl: 'https://avatars.githubusercontent.com/u/14325925?v=4',
  htmlUrl: 'https://github.com/aliasfoxkde',
  createdAt: '2023-06-15T00:00:00Z',
  updatedAt: '2026-04-26T00:00:00Z',
};

import type { GitHubProfile, SocialLink, Skill } from '@/lib/types';

export const githubProfile: GitHubProfile = {
  login: 'aliasfoxkde',
  name: 'Micheal Kinney',
  bio: 'Full-Stack developer with passion for CS, ML/AI, process automation, and technical writing.',
  company: null,
  location: null,
  blog: '',
  email: null,
  hireable: null,
  publicRepos: 28,
  publicGists: 0,
  followers: 22,
  following: 58,
  avatarUrl: 'https://avatars.githubusercontent.com/u/14325925?v=4',
  htmlUrl: 'https://github.com/aliasfoxkde',
  createdAt: '2023-06-15T00:00:00Z',
  updatedAt: '2026-04-26T00:00:00Z',
};

/**
 * Project Categories
 */
export const projectCategories = [
  { value: 'all', label: 'All Projects', color: '#6366f1' },
  { value: 'ai-ml', label: 'AI & ML', color: '#06b6d4' },
  { value: 'web-apps', label: 'Web Apps', color: '#8b5cf6' },
  { value: 'tools', label: 'Tools', color: '#22c55e' },
  { value: 'games', label: 'Games', color: '#f59e0b' },
  { value: 'extensions', label: 'Extensions', color: '#ec4899' },
  { value: 'infrastructure', label: 'Infrastructure', color: '#6366f1' },
  { value: 'learning', label: 'Learning', color: '#14b8a6' },
  { value: 'templates', label: 'Templates', color: '#f97316' },
] as const;

/**
 * All projects - loaded dynamically from GitHub API
 * This is a placeholder that gets replaced on load
 */
export let allProjects: Project[] = [];

/**
 * Load projects from GitHub API
 */
export async function loadProjects(): Promise<Project[]> {
  allProjects = await getGitHubRepos();
  return allProjects;
}

/**
 * Social Links
 */
export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com/aliasfoxkde', icon: 'github', username: 'aliasfoxkde', isOfficial: true },
  { name: 'Email', url: 'mailto:micheal.l.c.kinney@gmail.com', icon: 'mail', username: 'micheal.l.c.kinney@gmail.com', isOfficial: true },
];

/**
 * Skills/Tech Stack
 */
export const skills: Skill[] = [
  { name: 'React', icon: 'react', category: 'frontend', level: 'expert', years: 5 },
  { name: 'TypeScript', icon: 'typescript', category: 'frontend', level: 'expert', years: 4 },
  { name: 'TailwindCSS', icon: 'tailwind', category: 'frontend', level: 'expert', years: 3 },
  { name: 'Vite', icon: 'vite', category: 'frontend', level: 'advanced', years: 3 },
  { name: 'Framer Motion', icon: 'framer', category: 'frontend', level: 'advanced', years: 2 },
  { name: 'Three.js', icon: 'threejs', category: 'frontend', level: 'intermediate', years: 2 },
  { name: 'Node.js', icon: 'nodejs', category: 'backend', level: 'expert', years: 6 },
  { name: 'Python', icon: 'python', category: 'backend', level: 'advanced', years: 4 },
  { name: 'FastAPI', icon: 'fastapi', category: 'backend', level: 'advanced', years: 2 },
  { name: 'LLM Integration', icon: 'ai', category: 'ai-ml', level: 'advanced', years: 2 },
  { name: 'AI Agents', icon: 'agents', category: 'ai-ml', level: 'advanced', years: 2 },
  { name: 'WebLLM', icon: 'webllm', category: 'ai-ml', level: 'intermediate', years: 1 },
  { name: 'Cloudflare', icon: 'cloudflare', category: 'devops', level: 'expert', years: 3 },
  { name: 'Docker', icon: 'docker', category: 'devops', level: 'advanced', years: 4 },
  { name: 'GitHub Actions', icon: 'github-actions', category: 'devops', level: 'advanced', years: 3 },
  { name: 'VSCode', icon: 'vscode', category: 'tools', level: 'expert', years: 5 },
  { name: 'Git', icon: 'git', category: 'tools', level: 'expert', years: 8 },
  { name: 'Playwright', icon: 'playwright', category: 'tools', level: 'advanced', years: 2 },
];

/**
 * Sections
 */
export const sections = [
  { id: 'hero', name: 'Home', icon: 'home', href: '#hero' },
  { id: 'about', name: 'About', icon: 'user', href: '#about' },
  { id: 'projects', name: 'Projects', icon: 'folder', href: '#projects' },
  { id: 'affiliates', name: 'Affiliates', icon: 'heart', href: '#affiliates' },
  { id: 'contact', name: 'Contact', icon: 'mail', href: '#contact' },
] as const;

/**
 * Affiliate Links
 */
export const affiliateLinks = [
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    description: 'Edge computing, CDN, DNS, and developer platform.',
    url: 'https://www.cloudflare.com/',
    icon: 'cloudflare',
    isSponsored: false,
    category: 'hosting',
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Support open source work via GitHub Sponsors.',
    url: 'https://github.com/sponsors/aliasfoxkde',
    icon: 'github',
    isSponsored: false,
    category: 'other',
  },
  {
    id: 'jetbrains',
    name: 'JetBrains',
    description: 'Professional developer tools and IDEs.',
    url: 'https://jb.gg/RWBCJ7',
    icon: 'jetbrains',
    isSponsored: false,
    category: 'tools',
  },
];

/**
 * Navigation Links
 */
export const navLinks = [
  { label: 'Home', href: '#hero', isExternal: false },
  { label: 'About', href: '#about', isExternal: false },
  { label: 'Projects', href: '#projects', isExternal: false },
  { label: 'Affiliates', href: '#affiliates', isExternal: false },
  { label: 'Contact', href: '#contact', isExternal: false },
];

/**
 * Footer Links
 */
export const footerLinks = {
  navigation: [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Affiliates', href: '#affiliates' },
    { label: 'Contact', href: '#contact' },
  ],
  social: [
    { label: 'GitHub', href: 'https://github.com/aliasfoxkde', icon: 'github' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

/**
 * SEO Config
 */
export const seoConfig = {
  title: 'Micheal Kinney - Full-Stack Developer',
  description: 'Full-Stack developer with passion for CS, ML/AI, process automation. Explore AI platforms, web apps, and developer tools.',
  keywords: ['Micheal Kinney', 'aliasfoxkde', 'Full-Stack Developer', 'AI', 'ML', 'React', 'TypeScript', 'Cloudflare'],
  ogImage: 'https://avatars.githubusercontent.com/u/14325925?v=4',
  ogType: 'website' as const,
};

/**
 * PWA Config
 */
export const pwaConfig = {
  name: 'Micheal Kinney - Developer Portfolio',
  shortName: 'MichealK',
  description: 'Full-Stack Developer | ML/AI | Process Automation',
  themeColor: '#6366f1',
  backgroundColor: '#0a0a0f',
  display: 'standalone' as const,
  orientation: 'any' as const,
  startUrl: '/',
  scope: '/',
};
