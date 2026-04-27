// ============================================
// OpenPortfolio - GitHub API Integration
// Dynamically loads repos from GitHub API
// Uses authenticated requests to avoid rate limits
// ============================================

import type { Project, ProjectCategory } from '@/lib/types';

const GITHUB_API = 'https://api.github.com';
const USERNAME = 'aliasfoxkde';

// GitHub Personal Access Token for authenticated requests
// Increases rate limit from 60/hour to 5000/hour
// Set via VITE_GITHUB_TOKEN environment variable
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || '';

/**
 * Manually specified contributed projects
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
 * GitHub repository topics that indicate categories
 */
const TOPIC_CATEGORIES: Record<string, ProjectCategory> = {
  'ai': 'ai-ml',
  'ml': 'ai-ml',
  'machine-learning': 'ai-ml',
  'llm': 'ai-ml',
  'webapp': 'web-apps',
  'website': 'web-apps',
  'cms': 'web-apps',
  'productivity': 'web-apps',
  'game': 'games',
  'tool': 'tools',
  'cli': 'tools',
  'automation': 'tools',
  'vscode': 'extensions',
  'extension': 'extensions',
  'devops': 'infrastructure',
  'infrastructure': 'infrastructure',
  'learning': 'learning',
  'template': 'templates',
};

/**
 * Featured repo names
 */
const FEATURED_REPOS = new Set([
  'openzenith', 'teckspecs', 'patternforge', 'openpress', 'webos',
  'edgemind', 'buy_a_buddy', 'stationaware', 'prisai', 'openportfolio',
  'opencad', 'bolt.diy', 'agentic-swarm-bench'
]);

/**
 * Map topics to category
 */
function getCategoryFromTopics(topics: string[]): ProjectCategory {
  for (const topic of topics) {
    if (TOPIC_CATEGORIES[topic]) {
      return TOPIC_CATEGORIES[topic];
    }
  }
  return 'tools';
}

/**
 * Map GitHub language to category fallback
 */
function getCategoryFromLanguage(language: string | null): ProjectCategory {
  const langMap: Record<string, ProjectCategory> = {
    TypeScript: 'web-apps',
    JavaScript: 'web-apps',
    Python: 'tools',
    HTML: 'web-apps',
    CSS: 'web-apps',
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
 * Build tech stack from language and topics
 */
function buildTechStack(language: string | null, topics: string[]): string[] {
  const stack: string[] = [];
  if (language) stack.push(language);
  // Add common frameworks from topics
  const frameworks = topics.filter(t => ['react', 'vue', 'angular', 'nextjs', 'vite', 'tailwind', 'fastapi', 'flask', 'django', 'express'].includes(t.toLowerCase()));
  stack.push(...frameworks);
  return [...new Set(stack)].slice(0, 6);
}

/**
 * Check if repo should be featured
 */
function isFeatured(name: string, stars: number, hasHomepage: boolean, topics: string[]): boolean {
  const lower = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (FEATURED_REPOS.has(lower)) return true;
  if (stars > 10) return true;
  if (hasHomepage) return true;
  if (topics.some(t => ['ai', 'ml', 'llm', 'webapp'].includes(t.toLowerCase()))) return true;
  return false;
}

/**
 * Create headers with auth token
 */
function getHeaders(): HeadersInit {
  return {
    Accept: 'application/vnd.github.v3+json',
    ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
  };
}

/**
 * Fetch GitHub profile
 */
export async function fetchGitHubProfile() {
  try {
    const response = await fetch(`${GITHUB_API}/users/${USERNAME}`, {
      headers: getHeaders(),
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
 * Fetch all non-forked repos
 */
export async function fetchGitHubRepos(): Promise<Project[]> {
  try {
    const response = await fetch(
      `${GITHUB_API}/users/${USERNAME}/repos?per_page=100&sort=updated&type=owner`,
      { headers: getHeaders() }
    );
    if (!response.ok) throw new Error('Failed to fetch repos');
    const repos = await response.json();

    // Get contributed project IDs to avoid duplicates
    const contributedIds = CONTRIBUTED_PROJECTS.map((p) => p.id);

    // Filter out forks, merge with contributed
    const originalRepos: Project[] = repos
      .filter((repo: Record<string, unknown>) => !(repo.fork as boolean))
      .map((repo: Record<string, unknown>) => {
        const topics = (repo.topics as string[]) || [];
        const lang = repo.language as string | null;
        const homepage = repo.homepage as string | undefined;
        const name = repo.name as string;
        const lower = name.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        return {
          id: lower,
          name,
          fullName: `${USERNAME}/${name}`,
          description: (repo.description as string) || '',
          homepage: homepage || '',
          htmlUrl: repo.html_url as string,
          language: lang,
          stars: repo.stargazers_count as number,
          forks: repo.forks_count as number,
          watchers: repo.watchers_count as number,
          topics,
          category: topics.length > 0 ? getCategoryFromTopics(topics) : getCategoryFromLanguage(lang),
          isFeatured: isFeatured(name, repo.stargazers_count as number, !!homepage, topics),
          isArchived: repo.archived as boolean,
          createdAt: repo.created_at as string,
          updatedAt: repo.updated_at as string,
          pushedAt: repo.pushed_at as string,
          deploymentUrl: homepage,
          links: homepage ? { live: homepage } : undefined,
          status: getStatus({ archived: repo.archived as boolean, homepage }),
          techStack: buildTechStack(lang, topics),
        } satisfies Project;
      })
      .filter((r: Project) => !contributedIds.includes(r.id));

    return [...CONTRIBUTED_PROJECTS, ...originalRepos] as Project[];
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

/**
 * Cache
 */
let cachedProfile: Awaited<ReturnType<typeof fetchGitHubProfile>> = null;
let cachedRepos: Project[] = [];
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getGitHubProfile() {
  const now = Date.now();
  if (!cachedProfile || now - lastFetch > CACHE_DURATION) {
    cachedProfile = await fetchGitHubProfile();
    lastFetch = now;
  }
  return cachedProfile;
}

export async function getGitHubRepos() {
  const now = Date.now();
  if (cachedRepos.length === 0 || now - lastFetch > CACHE_DURATION) {
    cachedRepos = await fetchGitHubRepos();
    lastFetch = now;
  }
  return cachedRepos;
}

export function invalidateCache() {
  cachedProfile = null;
  cachedRepos = [];
  lastFetch = 0;
}
