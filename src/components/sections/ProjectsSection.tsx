// ============================================
// OpenPortfolio - Projects Section
// Dynamic loading with async/await
// ============================================

import { useState, useEffect, useMemo, useDeferredValue, useTransition, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { Badge, LanguageBadge, CategoryBadge, StatusBadge } from '@/components/ui/Badge';
import { loadProjects, projectCategories, githubProfile } from '@/data/projects';
import type { Project } from '@/lib/types';
import { cn, formatNumber } from '@/lib/utils';

// ============================================
// Loading Skeleton
// ============================================

function ProjectSkeleton() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 h-full animate-pulse">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-5 w-20 bg-zinc-800 rounded-full" />
        <div className="h-5 w-5 bg-zinc-800 rounded-full" />
      </div>
      <div className="h-6 w-3/4 bg-zinc-800 rounded mb-2" />
      <div className="space-y-2 mb-3">
        <div className="h-4 w-full bg-zinc-800 rounded" />
        <div className="h-4 w-5/6 bg-zinc-800 rounded" />
      </div>
      <div className="flex gap-2 mb-4">
        <div className="h-5 w-16 bg-zinc-800 rounded-full" />
        <div className="h-5 w-16 bg-zinc-800 rounded-full" />
      </div>
      <div className="h-10 w-full bg-zinc-800 rounded-lg" />
    </div>
  );
}

// ============================================
// Project Card Component
// ============================================

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const categoryColor = projectCategories.find((c) => c.value === project.category)?.color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="group relative"
    >
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 h-full flex flex-col transition-all duration-300 hover:border-indigo-500/50 hover:bg-zinc-900">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <CategoryBadge
                category={projectCategories.find((c) => c.value === project.category)?.label || project.category}
                color={categoryColor}
                size="sm"
              />
              {project.status && <StatusBadge status={project.status} showLabel={false} />}
              {project.isContributed && (
                <Badge variant="secondary" size="sm">Contributor</Badge>
              )}
            </div>
            <h3 className="text-lg font-semibold text-white truncate">
              {project.name}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-zinc-400 flex-1 line-clamp-3 mb-3">
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
        <div className="flex items-center justify-between gap-4 pt-3 border-t border-zinc-800">
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

        {/* Links */}
        <div className="flex gap-2 mt-4">
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Icon name="github" size={14} />}
            onClick={() => window.open(project.htmlUrl, '_blank', 'noopener')}
            className="flex-1"
          >
            GitHub
          </Button>
          {project.deploymentUrl && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Icon name="globe" size={14} />}
              onClick={() => window.open(project.deploymentUrl, '_blank', 'noopener')}
              className="flex-1"
            >
              Live
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// Search Input
// ============================================

function SearchInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="relative w-full max-w-md">
      <Icon name="code" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search projects..."
        className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-zinc-800 bg-zinc-900/50 text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
        aria-label="Search projects"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded text-zinc-500 hover:text-white hover:bg-zinc-800"
          aria-label="Clear search"
        >
          <Icon name="x" size={14} />
        </button>
      )}
    </div>
  );
}

// ============================================
// Category Filter
// ============================================

function CategoryFilter({
  selected,
  onSelect,
  counts,
}: {
  selected: string;
  onSelect: (v: string) => void;
  counts: Record<string, number>;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {projectCategories.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onSelect(cat.value)}
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border",
            selected === cat.value
              ? "bg-indigo-500 text-white border-indigo-500"
              : "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700"
          )}
          aria-pressed={selected === cat.value}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: selected === cat.value ? 'white' : cat.color }}
          />
          <span>{cat.label}</span>
          <span className={cn(
            "px-1.5 py-0.5 rounded-full text-xs",
            selected === cat.value ? "bg-white/20" : "bg-zinc-800"
          )}>
            {counts[cat.value] || 0}
          </span>
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
      <Icon name="folder" size={40} className="text-zinc-600 mb-4" />
      <h3 className="text-lg font-semibold text-white mb-2">No projects found</h3>
      <p className="text-sm text-zinc-500 mb-4">Try adjusting your search or filter</p>
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
  const deferredSearch = useDeferredValue(searchInput);
  const [isPending, startTransition] = useTransition();

  // Load projects on mount
  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        const loadedProjects = await loadProjects();
        setProjects(loadedProjects);
        setError(null);
      } catch (err) {
        setError('Failed to load projects');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const handleCategoryChange = useCallback((cat: string) => {
    startTransition(() => setSelectedCategory(cat));
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;
      
      if (!deferredSearch) return categoryMatch;
      
      const search = deferredSearch.toLowerCase();
      const searchMatch =
        project.name.toLowerCase().includes(search) ||
        project.description.toLowerCase().includes(search) ||
        project.language?.toLowerCase().includes(search) ||
        project.topics?.some((t) => t.toLowerCase().includes(search));
      
      return categoryMatch && searchMatch;
    });
  }, [projects, selectedCategory, deferredSearch]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: projects.length };
    projectCategories.forEach((cat) => {
      c[cat.value] = projects.filter((p) => p.category === cat.value).length;
    });
    return c;
  }, [projects]);

  return (
    <section id="projects" className="relative py-16 bg-zinc-950" aria-label="Projects showcase">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />

      <Container size="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-base text-zinc-400 max-w-2xl mx-auto">
            {isLoading ? 'Loading projects...' : `${projects.length} projects across AI/ML, web development, tools, and more.`}
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
        >
          <SearchInput value={searchInput} onChange={setSearchInput} />
          <div className={cn("text-sm text-zinc-500 transition-opacity", isPending ? "opacity-50" : "opacity-100")}>
            {filteredProjects.length} {isLoading ? 'loading...' : `of ${projects.length} projects`}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10"
        >
          <CategoryFilter selected={selectedCategory} onSelect={handleCategoryChange} counts={counts} />
        </motion.div>

        {/* Error State */}
        {error && (
          <div className="text-center py-8 text-red-400">
            <Icon name="alert-circle" size={24} className="mx-auto mb-2" />
            <p>{error}</p>
            <Button variant="outline" size="sm" className="mt-4" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <ProjectSkeleton key={i} />)}
          </div>
        )}

        {/* Projects Grid */}
        {!isLoading && !error && (
          <AnimatePresence mode="wait">
            {filteredProjects.length > 0 ? (
              <motion.div
                key={`${selectedCategory}-${deferredSearch}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-14 text-center"
          >
            <p className="text-sm text-zinc-500 mb-4">
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
