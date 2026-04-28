// ============================================
// OpenPortfolio - Projects Section
// Clean, no animations, no flip
// ============================================

import { useState, useEffect, useMemo, useDeferredValue, useTransition, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { Badge, LanguageBadge, StatusBadge } from '@/components/ui/Badge';
import { loadProjects, projectCategories, githubProfile } from '@/data/projects';
import { invalidateCache } from '@/lib/github';
import type { Project } from '@/lib/types';
import { cn, formatNumber } from '@/lib/utils';

type SortOption = 'recent' | 'stars' | 'name' | 'forks';

// ============================================
// Loading Skeleton
// ============================================

function ProjectSkeleton() {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 h-64 animate-pulse">
      <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800 rounded mb-3" />
      <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded mb-2" />
      <div className="h-12 w-full bg-zinc-200 dark:bg-zinc-800 rounded mb-4" />
      <div className="flex gap-2">
        <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
        <div className="h-6 w-16 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
      </div>
    </div>
  );
}

// ============================================
// Project Card - NO FLIP, clean design
// ============================================

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="h-full"
    >
      <a
        href={project.htmlUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="default" size="sm">{project.category}</Badge>
              {project.status && <StatusBadge status={project.status} showLabel={false} />}
            </div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white truncate">
              {project.name}
            </h3>
          </div>
          <Icon name="external-link" size={16} className="text-zinc-400 flex-shrink-0" />
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 mb-3">
          {project.description || 'No description available'}
        </p>

        {/* Topics */}
        {project.topics && project.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.topics.slice(0, 3).map((topic) => (
              <Badge key={topic} variant="default" size="sm">{topic}</Badge>
            ))}
            {project.topics.length > 3 && (
              <Badge variant="default" size="sm">+{project.topics.length - 3}</Badge>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            {project.language && <LanguageBadge language={project.language} />}
            {project.stars > 0 && (
              <span className="flex items-center gap-1">
                <Icon name="star" size={12} />
                {formatNumber(project.stars)}
              </span>
            )}
            {project.forks > 0 && (
              <span className="flex items-center gap-1">
                <Icon name="fork" size={12} />
                {formatNumber(project.forks)}
              </span>
            )}
          </div>
        </div>
      </a>
    </motion.div>
  );
}

// ============================================
// Search Input
// ============================================

function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative w-full max-w-md">
      <Icon name="code" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search projects..."
        className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-indigo-500 transition-colors"
        aria-label="Search projects"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          aria-label="Clear search"
        >
          <Icon name="x" size={14} />
        </button>
      )}
    </div>
  );
}

// ============================================
// Sort Dropdown
// ============================================

function SortDropdown({ value, onChange }: { value: SortOption; onChange: (v: SortOption) => void }) {
  const [open, setOpen] = useState(false);

  const options: { value: SortOption; label: string }[] = [
    { value: 'recent', label: 'Recently Updated' },
    { value: 'stars', label: 'Most Stars' },
    { value: 'forks', label: 'Most Forks' },
    { value: 'name', label: 'Name (A-Z)' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-700 dark:text-zinc-300"
      >
        <span className="hidden sm:inline">{options.find(o => o.value === value)?.label}</span>
        <Icon name="chevron-down" size={14} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-50 w-48 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg overflow-hidden">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={cn(
                  "w-full px-3 py-2 text-sm text-left",
                  value === opt.value ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600" : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ============================================
// Category Filter - NO DOTS, simple text buttons
// ============================================

function CategoryFilter({ selected, onSelect, counts }: { selected: string; onSelect: (v: string) => void; counts: Record<string, number> }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <button
        onClick={() => onSelect('all')}
        className={cn(
          "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
          selected === 'all' ? "bg-indigo-500 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
        )}
      >
        All ({counts.all || 0})
      </button>
      {projectCategories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelect(cat.value)}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
            selected === cat.value ? "bg-indigo-500 text-white" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
          )}
        >
          {cat.label} ({counts[cat.value] || 0})
        </button>
      ))}
    </div>
  );
}

// ============================================
// Empty State
// ============================================

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Icon name="folder" size={40} className="text-zinc-300 dark:text-zinc-600 mb-4" />
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">No projects found</h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">Try adjusting your search or filter</p>
      <Button variant="outline" size="sm" onClick={onClear}>Clear Search</Button>
    </div>
  );
}

// ============================================
// Main Projects Section
// ============================================

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const deferredSearch = useDeferredValue(searchInput);
  const [isPending, startTransition] = useTransition();

  const load = useCallback(async () => {
    try {
      setIsLoading(true);
      const loadedProjects = await loadProjects();
      setProjects(loadedProjects);
      setLastUpdated(new Date());
      setError(null);
    } catch {
      setError('Failed to load projects');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleRefresh = () => {
    invalidateCache();
    load();
  };

  const handleCategoryChange = useCallback((cat: string) => {
    startTransition(() => setSelectedCategory(cat));
  }, []);

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (deferredSearch) {
      const search = deferredSearch.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search) ||
          p.description.toLowerCase().includes(search) ||
          p.language?.toLowerCase().includes(search) ||
          p.topics?.some((t) => t.toLowerCase().includes(search))
      );
    }

    switch (sortBy) {
      case 'stars':
        result.sort((a, b) => b.stars - a.stars);
        break;
      case 'forks':
        result.sort((a, b) => b.forks - a.forks);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'recent':
      default:
        result.sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime());
    }

    return result;
  }, [projects, selectedCategory, deferredSearch, sortBy]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length };
    projectCategories.forEach((cat) => {
      c[cat.value] = projects.filter((p) => p.category === cat.value).length;
    });
    return c;
  }, [projects]);

  return (
    <section id="projects" className="relative py-16 bg-zinc-50 dark:bg-zinc-950">
      <Container size="xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {isLoading ? 'Loading projects...' : `${projects.length} projects across AI/ML, web development, tools, and more.`}
          </p>
          {lastUpdated && !isLoading && (
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-2">
              Updated {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </motion.div>

        {/* Toolbar */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <SearchInput value={searchInput} onChange={setSearchInput} />
          <div className="flex items-center gap-3">
            <SortDropdown value={sortBy} onChange={setSortBy} />
            <button
              onClick={handleRefresh}
              className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
              aria-label="Refresh projects"
            >
              <Icon name="refresh" size={18} className={isLoading ? 'animate-spin' : ''} />
            </button>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <CategoryFilter selected={selectedCategory} onSelect={handleCategoryChange} counts={counts} />
        </motion.div>

        {/* Result count */}
        <div className={cn("text-sm text-zinc-500 dark:text-zinc-400 mb-4", isPending ? "opacity-50" : "opacity-100")}>
          {filteredProjects.length} {isLoading ? 'loading...' : `of ${projects.length} projects`}
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-8 text-red-500">
            <p>{error}</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={handleRefresh}>Retry</Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => <ProjectSkeleton key={i} />)}
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && !error && (
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div
                key={`${selectedCategory}-${deferredSearch}-${sortBy}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </motion.div>
            ) : (
              <EmptyState onClear={() => setSearchInput('')} />
            )}
          </AnimatePresence>
        )}

        {/* CTA */}
        {!isLoading && !error && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-14 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
              Want to see all {githubProfile.publicRepos} repositories?
            </p>
            <Button
              variant="outline"
              size="md"
              leftIcon={<Icon name="github" size={18} />}
              onClick={() => window.open(githubProfile.htmlUrl, '_blank', 'noopener')}
            >
              View All on GitHub
            </Button>
          </motion.div>
        )}
      </Container>
    </section>
  );
}

export default ProjectsSection;
