// ============================================
// OpenPortfolio - Projects Section
// Filterable grid with flip card projects
// Optimized search with useDeferredValue
// WCAG 2.5 AAA Compliant
// ============================================

import { useState, useMemo, useDeferredValue, useTransition, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { Badge, LanguageBadge, CategoryBadge, StatusBadge } from '@/components/ui/Badge';
import { allProjects, projectCategories, githubProfile } from '@/data/projects';
import type { Project, ProjectCategory } from '@/lib/types';
import { cn, formatNumber } from '@/lib/utils';

// ============================================
// Project Card Component (Flippable)
// ============================================

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const categoryColor = projectCategories.find((c) => c.value === project.category)?.color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="h-full"
    >
      <div
        className="relative h-full min-h-[280px] cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsFlipped(!isFlipped);
          }
        }}
        role="button"
        tabIndex={0}
        aria-pressed={isFlipped}
        aria-label={`${project.name} project card. Click to see more details.`}
      >
        {/* Card Container with 3D flip */}
        <div
          className={cn(
            'relative w-full h-full transition-transform duration-300 ease-out preserve-3d',
            isFlipped ? 'rotate-y-180' : ''
          )}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front Face */}
          <div
            className="absolute inset-0 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-alt)] p-5 flex flex-col backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Category & Status */}
            <div className="flex items-center justify-between mb-3">
              <CategoryBadge
                category={projectCategories.find((c) => c.value === project.category)?.label || project.category}
                color={categoryColor}
                size="sm"
              />
              {project.status && (
                <StatusBadge status={project.status} showLabel={false} />
              )}
            </div>

            {/* Project Name */}
            <h3 className="text-lg font-bold text-[var(--color-foreground)] mb-2 line-clamp-1">
              {project.name}
            </h3>

            {/* Description */}
            <p className="text-sm text-[var(--color-foreground-muted)] line-clamp-3 flex-1">
              {project.description}
            </p>

            {/* Language */}
            <div className="mt-3 mb-2">
              {project.language && <LanguageBadge language={project.language} />}
            </div>

            {/* Stars */}
            {project.stars > 0 && (
              <div className="flex items-center gap-3 text-sm text-[var(--color-foreground-subtle)]">
                <span className="flex items-center gap-1">
                  <Icon name="star" size={14} />
                  {formatNumber(project.stars)}
                </span>
                {project.forks > 0 && (
                  <span className="flex items-center gap-1">
                    <Icon name="fork" size={14} />
                    {formatNumber(project.forks)}
                  </span>
                )}
              </div>
            )}

            {/* Flip hint */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-[var(--color-foreground-subtle)] opacity-50">
              <Icon name="move" size={10} />
            </div>
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 rounded-xl border border-[var(--color-primary)]/50 bg-[var(--color-background-elevated)] p-5 flex flex-col backface-hidden"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="mb-3">
                <h4 className="text-xs font-semibold text-[var(--color-foreground-muted)] uppercase tracking-wider mb-2">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="primary" size="sm">
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack.length > 3 && (
                    <Badge variant="default" size="sm">
                      +{project.techStack.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Links */}
            <div className="flex flex-col gap-2 mt-auto">
              <Button
                variant="primary"
                size="sm"
                leftIcon={<Icon name="github" size={14} />}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.htmlUrl, '_blank', 'noopener');
                }}
                className="w-full"
              >
                View on GitHub
              </Button>

              {project.deploymentUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Icon name="globe" size={14} />}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.deploymentUrl, '_blank', 'noopener');
                  }}
                  className="w-full"
                >
                  Live Demo
                </Button>
              )}
            </div>

            {/* Flip back hint */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-[var(--color-foreground-subtle)] opacity-50">
              <Icon name="move" size={10} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// Search Input Component
// ============================================

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div
      className={cn(
        'relative flex items-center w-full max-w-md rounded-lg border bg-[var(--color-background-alt)] transition-colors',
        'focus-within:border-[var(--color-primary)]',
        'border-[var(--color-border)]'
      )}
    >
      <Icon
        name="code"
        size={18}
        className="absolute left-3 text-[var(--color-foreground-muted)]"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search projects..."
        className="w-full pl-10 pr-10 py-2.5 bg-transparent text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-subtle)] focus:outline-none text-sm"
        aria-label="Search projects"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 p-1 rounded-full hover:bg-[var(--color-background-elevated)] text-[var(--color-foreground-muted)]"
          aria-label="Clear search"
        >
          <Icon name="x" size={14} />
        </button>
      )}
    </div>
  );
}

// ============================================
// Filter Button Component
// ============================================

interface FilterButtonProps {
  category: (typeof projectCategories)[number];
  isSelected: boolean;
  onClick: () => void;
  count: number;
}

function FilterButton({ category, isSelected, onClick, count }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200',
        isSelected
          ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-md'
          : 'bg-[var(--color-background-alt)] text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-background-elevated)] border border-[var(--color-border)]'
      )}
      aria-pressed={isSelected}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: isSelected ? 'white' : category.color }}
      />
      <span>{category.label}</span>
      <span
        className={cn(
          'px-1.5 py-0.5 rounded-full text-xs',
          isSelected ? 'bg-white/20' : 'bg-[var(--color-background-elevated)]'
        )}
      >
        {count}
      </span>
    </button>
  );
}

// ============================================
// Empty State Component
// ============================================

function EmptyState({ searchQuery, onClearSearch }: { searchQuery: string; onClearSearch: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <Icon name="folder" size={40} className="text-[var(--color-foreground-subtle)] mb-4" />
      <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-2">
        No projects found
      </h3>
      <p className="text-sm text-[var(--color-foreground-muted)] mb-4">
        {searchQuery ? `No projects match "${searchQuery}"` : 'No projects in this category'}
      </p>
      {searchQuery && (
        <Button variant="outline" size="sm" onClick={onClearSearch}>
          Clear Search
        </Button>
      )}
    </motion.div>
  );
}

// ============================================
// Main Projects Section Component
// ============================================

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [searchInput, setSearchInput] = useState('');

  // Use deferred value for search to keep UI responsive
  const deferredSearch = useDeferredValue(searchInput);

  // Track pending state for visual feedback
  const [isPending, startTransition] = useTransition();

  // Handle category change with transition
  const handleCategoryChange = useCallback((category: ProjectCategory) => {
    startTransition(() => {
      setSelectedCategory(category);
    });
  }, []);

  // Handle search change
  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  // Filter projects - memoized for performance
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      // Category filter
      const categoryMatch = selectedCategory === 'all' || project.category === selectedCategory;

      // Search filter - use deferred value
      if (!deferredSearch) return categoryMatch;

      const searchLower = deferredSearch.toLowerCase();
      const searchMatch =
        project.name.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.language?.toLowerCase().includes(searchLower) ||
        project.topics.some((t) => t.toLowerCase().includes(searchLower));

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, deferredSearch]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allProjects.length };
    projectCategories.forEach((cat) => {
      counts[cat.value] = allProjects.filter((p) => p.category === cat.value).length;
    });
    return counts;
  }, []);

  return (
    <section
      id="projects"
      className="relative min-h-screen py-16 bg-[var(--color-background)]"
      aria-label="Projects showcase"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      <Container size="xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-base text-[var(--color-foreground-muted)] max-w-2xl mx-auto">
            {allProjects.length} projects across AI/ML, web development, tools, and more.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
        >
          {/* Search */}
          <SearchInput value={searchInput} onChange={handleSearchChange} />

          {/* Result count */}
          <div className={cn(
            'text-sm text-[var(--color-foreground-muted)] transition-opacity',
            isPending ? 'opacity-50' : 'opacity-100'
          )}>
            {filteredProjects.length} of {allProjects.length} projects
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
          role="group"
          aria-label="Filter projects by category"
        >
          {projectCategories.map((category) => (
            <FilterButton
              key={category.value}
              category={category}
              isSelected={selectedCategory === category.value}
              onClick={() => handleCategoryChange(category.value)}
              count={categoryCounts[category.value] || 0}
            />
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key={`${selectedCategory}-${deferredSearch}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              role="list"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          ) : (
            <EmptyState
              searchQuery={deferredSearch}
              onClearSearch={() => setSearchInput('')}
            />
          )}
        </AnimatePresence>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 text-center"
        >
          <p className="text-sm text-[var(--color-foreground-muted)] mb-4">
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
      </Container>
    </section>
  );
}

export default ProjectsSection;
