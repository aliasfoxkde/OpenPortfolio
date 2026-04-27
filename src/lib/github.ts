// ============================================
// OpenPortfolio - GitHub API Integration
// Dynamically loads repos from GitHub API
// ============================================

import type { Project, ProjectCategory } from '@/lib/types';

const GITHUB_API = 'https://api.github.com';
const USERNAME = 'aliasfoxkde';

/**
 * Manually specified contributed projects (not owned by aliasfoxkde)
 * These will be merged with fetched repos
 */
const CONTRIBUTED_PROJECTS: Partial<Project>[] = [
  {
    id: 'bolt-diy',
    name: 'Bolt.Diy',
    fullName: 'stackblitz-labs/bolt.diy',
    description: 'Prompt, run, edit, and deploy full-stack web applications using any LLM. (Contributor)',
    homepage: 'https://stackblitz-labs.github.io/bolt.diy/',
    htmlUrl: 'https://github.com/stackblitz-labs/bolt.diy',
    language: 'TypeScript',
    stars: 19293,
    forks: 10384,
    watchers: 0,
    topics: ['bolt', 'ai', 'coding', 'llm', 'vibe-coding'],
    category: 'ai-ml',
    isFeatured: true,
    isArchived: false,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2026-04-25T00:00:00Z',
    pushedAt: '2026-04-26T00:00:00Z',
    deploymentUrl: 'https://stackblitz-labs.github.io/bolt.diy/',
    links: { live: 'https://stackblitz-labs.github.io/bolt.diy/', docs: 'https://github.com/stackblitz-labs/bolt.diy#readme' },
    techStack: ['TypeScript', 'React', 'Vite', 'Multiple LLM Providers'],
    status: 'live',
    isContributed: true,
  },
  {
    id: 'agentic-swarm-bench',
    name: 'Agentic Swarm Bench',
    fullName: 'SWARMONE/agentic-swarm-bench',
    description: 'Benchmarking platform for agentic swarm AI systems. (Contributor)',
    homepage: 'https://agenticswarmbench.com/',
    htmlUrl: 'https://github.com/SWARMONE/agentic-swarm-bench',
    language: 'Python',
    stars: 46,
    forks: 4,
    watchers: 0,
    topics: ['ai', 'benchmark', 'swarm', 'agents'],
    category: 'ai-ml',
    isFeatured: true,
    isArchived: false,
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2026-04-20T00:00:00Z',
    pushedAt: '2026-04-26T00:00:00Z',
    deploymentUrl: 'https://agenticswarmbench.com/',
    links: { live: 'https://agenticswarmbench.com/', docs: 'https://github.com/SWARMONE/agentic-swarm-bench#readme' },
    techStack: ['Python', 'FastAPI', 'React'],
    status: 'live',
    isContributed: true,
  },
];

/**
 * Map GitHub language to project category
 */
function getCategoryFromLanguage(language: string | null): ProjectCategory {
  const langMap: Record<string, ProjectCategory> = {
    TypeScript: 'web-apps',
    JavaScript: 'web-apps',
    Python: 'tools',
    HTML: 'web-apps',
    CSS: 'web-apps',
    Rust: 'tools',
    Go: 'tools',
    Java: 'tools',
    'C++': 'tools',
    Ruby: 'web-apps',
    PHP: 'web-apps',
  };
  return langMap[language || ''] || 'tools';
}

/**
 * Get status from repo metadata
 */
function getStatus(repo: { archived: boolean; homepage?: string }): 'live' | 'archived' | 'development' {
  if (repo.archived) return 'archived';
  if (repo.homepage) return 'live';
  return 'development';
}

/**
 * Determine if repo should be featured
 */
function isFeatured(name: string, stars: number, hasHomepage: boolean): boolean {
  const featuredNames = ['openzenith', 'teckspecs', 'patternforge', 'openpress', 'webos', 'edgemind', 'buy_a_buddy', 'stationaware', 'prisai', 'openportfolio'];
  const lowercaseName = name.toLowerCase().replace(/-/g, '_');
  return featuredNames.includes(lowercaseName) || stars > 10 || hasHomepage;
}

/**
 * Fetch GitHub profile
 */
export async function fetchGitHubProfile(): Promise<{
  login: string;
  name: string | null;
  bio: string | null;
  publicRepos: number;
  followers: number;
  following: number;
  avatarUrl: string;
  htmlUrl: string;
} | null> {
  try {
    const response = await fetch(`${GITHUB_API}/users/${USERNAME}`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
    });
    if (!response.ok) throw new Error('Failed to fetch profile');
    const data = await response.json();
    return {
      login: data.login,
      name: data.name,
      bio: data.bio,
      publicRepos: data.public_repos,
      followers: data.followers,
      following: data.following,
      avatarUrl: data.avatar_url,
      htmlUrl: data.html_url,
    };
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return null;
  }
}

/**
 * Fetch all non-forked repos for a user
 */
export async function fetchGitHubRepos(): Promise<Project[]> {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${USERNAME}/repos?per_page=100&sort=updated&type=owner`,
      { headers: { Accept: 'application/vnd.github.v3+json' } }
    );
    if (!response.ok) throw new Error('Failed to fetch repos');
    const repos = await response.json();

    // Filter out forks, keep only original repos
    const originalRepos: Project[] = repos
      .filter((repo: { fork: boolean }) => !repo.fork)
      .map((repo: Record<string, unknown>) => ({
        id: (repo.name as string).toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: repo.name as string,
        fullName: `${USERNAME}/${repo.name}`,
        description: (repo.description as string) || '',
        homepage: (repo.homepage as string) || '',
        htmlUrl: repo.html_url as string,
        language: repo.language as string | null,
        stars: repo.stargazers_count as number,
        forks: repo.forks_count as number,
        watchers: repo.watchers_count as number,
        topics: (repo.topics as string[]) || [],
        category: getCategoryFromLanguage(repo.language as string | null),
        isFeatured: isFeatured(repo.name as string, repo.stargazers_count as number, Boolean(repo.homepage)),
        isArchived: repo.archived as boolean,
        createdAt: repo.created_at as string,
        updatedAt: repo.updated_at as string,
        pushedAt: repo.pushed_at as string,
        deploymentUrl: (repo.homepage as string) || undefined,
        links: repo.homepage ? { live: repo.homepage as string } : undefined,
        status: getStatus({ archived: repo.archived as boolean, homepage: repo.homepage as string | undefined }),
        techStack: [(repo.language as string) || 'Unknown'].filter(Boolean),
      }));

    // Merge with contributed projects
    const contributedIds = CONTRIBUTED_PROJECTS.map((p) => p.id);
    const allProjects = [
      ...CONTRIBUTED_PROJECTS,
      ...originalRepos.filter((r) => !contributedIds.includes(r.id)),
    ] as Project[];

    return allProjects;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

/**
 * Cache for GitHub data
 */
let cachedProfile: Awaited<ReturnType<typeof fetchGitHubProfile>> = null;
let cachedRepos: Project[] = [];
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get cached GitHub profile
 */
export async function getGitHubProfile() {
  const now = Date.now();
  if (!cachedProfile || now - lastFetch > CACHE_DURATION) {
    cachedProfile = await fetchGitHubProfile();
    lastFetch = now;
  }
  return cachedProfile;
}

/**
 * Get cached repos
 */
export async function getGitHubRepos() {
  const now = Date.now();
  if (cachedRepos.length === 0 || now - lastFetch > CACHE_DURATION) {
    cachedRepos = await fetchGitHubRepos();
    lastFetch = now;
  }
  return cachedRepos;
}

/**
 * Force refresh cache
 */
export function invalidateCache() {
  cachedProfile = null;
  cachedRepos = [];
  lastFetch = 0;
}
