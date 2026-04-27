// ============================================
// OpenPortfolio - Type Definitions
// ============================================

/**
 * Project category types
 */
export type ProjectCategory =
  | 'all'
  | 'ai-ml'
  | 'web-apps'
  | 'tools'
  | 'games'
  | 'extensions'
  | 'infrastructure';

/**
 * Project interface representing a GitHub repository
 */
export interface Project {
  id: string;
  name: string;
  fullName: string;
  description: string;
  homepage: string;
  htmlUrl: string;
  language: string | null;
  stars: number;
  forks: number;
  watchers: number;
  topics: string[];
  category: ProjectCategory;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  /** Cloudflare Pages deployment URL if applicable */
  deploymentUrl?: string;
  /** Custom domain if configured */
  customDomains?: string[];
  /** Additional links like docs, donate, etc. */
  links?: ProjectLinks;
  /** Tech stack used in the project */
  techStack?: string[];
  /** Project status */
  status?: 'live' | 'wip' | 'deprecated';
}

export interface ProjectLinks {
  /** Live website URL */
  live?: string;
  /** Documentation URL */
  docs?: string;
  /** Donation/support URL */
  donate?: string;
  /** Support/community URL */
  support?: string;
  /** API endpoint if applicable */
  api?: string;
}

/**
 * GitHub user profile
 */
export interface GitHubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string;
  email: string | null;
  hireable: boolean | null;
  publicRepos: number;
  publicGists: number;
  followers: number;
  following: number;
  avatarUrl: string;
  htmlUrl: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Social link interface
 */
export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username?: string;
  isOfficial?: boolean;
}

/**
 * Skill/Tech expertise
 */
export interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
  level: SkillLevel;
  years: number;
}

export type SkillCategory = 'frontend' | 'backend' | 'ai-ml' | 'devops' | 'tools' | 'other';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

/**
 * Affiliate link
 */
export interface AffiliateLink {
  id: string;
  name: string;
  description: string;
  url: string;
  icon: string;
  isSponsored: boolean;
  category: AffiliateCategory;
}

export type AffiliateCategory = 'hosting' | 'tools' | 'services' | 'education' | 'other';

/**
 * Section configuration for snap scrolling
 */
export interface Section {
  id: string;
  name: string;
  icon: string;
  href: string;
}

/**
 * Navigation link
 */
export interface NavLink {
  label: string;
  href: string;
  icon?: string;
  isExternal?: boolean;
}

/**
 * Contact form data
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
  honeypot?: string;
}

/**
 * Animation configuration
 */
export interface AnimationConfig {
  duration: 'fast' | 'base' | 'slow' | 'x-slow';
  easing: 'out' | 'in-out' | 'spring' | 'bounce';
  delay?: number;
  repeat?: boolean;
}

/**
 * Toast notification
 */
export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

/**
 * Theme configuration
 */
export interface ThemeConfig {
  mode: 'dark' | 'light' | 'system';
  reducedMotion: boolean;
  highContrast: boolean;
}

/**
 * SEO metadata
 */
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
  noIndex?: boolean;
}

/**
 * PWA configuration
 */
export interface PWAConfig {
  name: string;
  shortName: string;
  description: string;
  themeColor: string;
  backgroundColor: string;
  display: 'standalone' | 'fullscreen' | 'minimal-ui';
  orientation: 'portrait' | 'landscape' | 'any';
  startUrl: string;
  scope: string;
}

/**
 * Test configuration
 */
export interface TestConfig {
  coverage: {
    statements: number;
    branches: number;
    functions: number;
    lines: number;
  };
  viewport: {
    mobile: { width: number; height: number };
    tablet: { width: number; height: number };
    desktop: { width: number; height: number };
  };
  a11y: {
    minRatio: number;
    minTouchTarget: number;
  };
}

/**
 * Component prop types
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'flat' | 'outline';
  isFlippable?: boolean;
  isFlipped?: boolean;
  onFlip?: () => void;
}

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  isPill?: boolean;
}

export interface IconProps extends React.SVGAttributes<SVGElement> {
  name: string;
  size?: number | string;
  strokeWidth?: number;
  className?: string;
}

/**
 * Hook return types
 */
export interface UseIntersectionObserverResult {
  ref: React.RefObject<HTMLElement | null>;
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
}

export interface UseScrollPositionResult {
  x: number;
  y: number;
  direction: 'up' | 'down' | 'none';
  progress: number;
}

export interface UseMediaQueryResult {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  prefersReducedMotion: boolean;
}