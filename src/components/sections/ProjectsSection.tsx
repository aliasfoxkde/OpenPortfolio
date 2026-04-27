// ============================================
// OpenPortfolio - Projects Section
// Filterable grid with flip card projects
// WCAG 2.5 AAA Compliant
// ============================================

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { Badge, LanguageBadge, CategoryBadge, StatusBadge } from '@/components/ui/Badge';
import { allProjects, projectCategories, githubProfile } from '@/data/projects';
import type { Project, ProjectCategory } from '@/lib/types';
import { cn, formatNumber, debounce } from '@/lib/utils';

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
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="h-full"
    >
      <div
        className="relative h-full min-h-[320px] cursor-pointer"
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
        style={{ perspective: '1000px' }}
      >
        <div
          className={cn(
            'relative w-full h-full transition-transform duration-500',
            isFlipped ? 'rotate-y-180' : ''
          )}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front Face */}
          <div
            className="absolute inset-0 rounded-xl border border-[var(--color-border)] bg-[var(--color-background-alt)] p-6 flex flex-col backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* Category Badge */}
            <div className="flex items-center justify-between mb-4">
              <CategoryBadge
                category={projectCategories.find((c) => c.value === project.category)?.label || project.category}
                color={categoryColor}
                size="sm"
              />
              {project.status && <StatusBadge status={project.status} showLabel={false} />}
            </div>

            {/* Project Name */}
            <h3 className="text-xl font-bold text-[var(--color-foreground)] mb-2">
              {project.name}
            </h3>

            {/* Brief Description */}
            <p className="text-sm text-[var(--color-foreground-muted)] line-clamp-3 flex-1">
              {project.description}
            </p>

            {/* Language */}
            <div className="mt-4 mb-4">
              {project.language && <LanguageBadge language={project.language} />}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-[var(--color-foreground-subtle)]">
              {project.stars > 0 && (
                <span className="flex items-center gap-1">
                  <Icon name="star" size={14} />
                  {formatNumber(project.stars)}
                </span>
              )}
              {project.forks > 0 && (
                <span className="flex items-center gap-1">
                  <Icon name="fork" size={14} />
                  {formatNumber(project.forks)}
                </span>
              )}
            </div>

            {/* Flip hint */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-[var(--color-foreground-subtle)]">
              <Icon name="move" size={12} />
              <span>Click to flip</span>
            </div>
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 rounded-xl border border-[var(--color-primary)]/30 bg-[var(--color-background-elevated)] p-6 flex flex-col backface-hidden"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            {/* Tech Stack */}
            {project.techStack && project.techStack.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-[var(--color-foreground-muted)] uppercase tracking-wider mb-2">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="primary" size="sm">
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack.length > 4 && (
                    <Badge variant="default" size="sm">
                      +{project.techStack.length - 4}
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
                leftIcon={<Icon name="github" size={16} />}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.htmlUrl, '_blank', 'noopener');
                }}
                className="w-full"
                aria-label={`View ${project.name} on GitHub`}
              >
                View on GitHub
              </Button>

              {project.deploymentUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Icon name="globe" size={16} />}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.deploymentUrl, '_blank', 'noopener');
                  }}
                  className="w-full"
                  aria-label={`Visit ${project.name} live site`}
                >
                  Live Demo
                </Button>
              )}

              {project.links?.donate && (
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Icon name="heart" size={16} />}
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.links?.donate, '_blank', 'noopener');
                  }}
                  className="w-full"
                  aria-label={`Support ${project.name}`}
                >
                  Support Project
                </Button>
              )}
            </div>

            {/* Back hint */}
            <div className="absolute bottom-4 left-4 flex items-center gap-1 text-xs text-[var(--color-foreground-subtle)]">
              <Icon name="move" size={12} />
              <span>Click to flip back</span>
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
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={cn(
        'relative flex items-center w-full max-w-md rounded-lg border bg-[var(--color-background-alt)] transition-colors',
        isFocused ? 'border-[var(--color-primary)]' : 'border-[var(--color-border)]'
      )}
    >
      <Icon
        name="code"
        size={20}
        className="absolute left-4 text-[var(--color-foreground-muted)]"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search projects..."
        className="w-full pl-12 pr-4 py-3 bg-transparent text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-subtle)] focus:outline-none"
        aria-label="Search projects"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 p-1 rounded-full hover:bg-[var(--color-background-elevated)]"
          aria-label="Clear search"
        >
          <Icon name="x" size={16} />
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
        'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
        isSelected
          ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-md'
          : 'bg-[var(--color-background-alt)] text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-background-elevated)] border border-[var(--color-border)]'
      )}
      aria-pressed={isSelected}
      aria-label={`Filter by ${category.label} (${count} projects)`}
    >
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: isSelected ? 'white' : category.color }}
        aria-hidden="true"
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

interface EmptyStateProps {
  searchQuery: string;
  onClearSearch: () => void;
}

function EmptyState({ searchQuery, onClearSearch }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <Icon name="folder" size={48} className="text-[var(--color-foreground-subtle)] mb-4" />
      <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-2">
        No projects found
      </h3>
      <p className="text-[var(--color-foreground-muted)] mb-4">
        {searchQuery
          ? `No projects match "${searchQuery}"`
          : 'No projects in this category'}
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
  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects based on category and search
  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => {
      // Category filter
      const categoryMatch =
        selectedCategory === 'all' || project.category === selectedCategory;

      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const searchMatch =
        !searchQuery ||
        project.name.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.language?.toLowerCase().includes(searchLower) ||
        project.topics.some((t) => t.toLowerCase().includes(searchLower));

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allProjects.length };
    projectCategories.forEach((cat) => {
      counts[cat.value] = allProjects.filter((p) => p.category === cat.value).length;
    });
    return counts;
  }, []);

  // Debounced search
  const handleSearchChange = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
    }, 300),
    []
  );

  return (
    <section
      id="projects"
      className="relative min-h-screen py-20 bg-[var(--color-background)]"
      aria-label="Projects showcase"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <Container size="lg">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="text-lg text-[var(--color-foreground-muted)] max-w-2xl mx-auto">
            Explore my portfolio of {allProjects.length} projects across AI/ML, web
            development, tools, and more.
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
          <SearchInput value={searchQuery} onChange={handleSearchChange} />

          {/* Result count */}
          <div className="text-sm text-[var(--color-foreground-muted)]">
            Showing {filteredProjects.length} of {allProjects.length} projects
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
          role="group"
          aria-label="Filter projects by category"
        >
          {projectCategories.map((category) => (
            <FilterButton
              key={category.value}
              category={category}
              isSelected={selectedCategory === category.value}
              onClick={() => setSelectedCategory(category.value)}
              count={categoryCounts[category.value] || 0}
            />
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key={`${selectedCategory}-${searchQuery}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              role="list"
              aria-label="Projects list"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          ) : (
            <EmptyState
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
            />
          )}
        </AnimatePresence>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-[var(--color-foreground-muted)] mb-4">
            Want to see all {githubProfile.publicRepos} repositories?
          </p>
          <Button
            variant="outline"
            size="lg"
            leftIcon={<Icon name="github" size={20} />}
            onClick={() => window.open(githubProfile.htmlUrl, '_blank', 'noopener')}
            aria-label="View all GitHub repositories"
          >
            View All on GitHub
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

export default ProjectsSection;