// ============================================
// OpenPortfolio - Affiliates Section
// Enhanced with better styling and cards
// ============================================

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

// ============================================
// Project Showcase Data
// ============================================

const projects = [
  {
    name: 'OpenZenith',
    description: 'A comprehensive OSINT platform for threat intelligence gathering, featuring real-time data collection and visualization.',
    url: 'https://openzenith.com',
    icon: 'shield',
    color: 'from-green-500 to-emerald-600',
    tags: ['Security', 'OSINT', 'Python'],
  },
  {
    name: 'TeckSpecs',
    description: 'A modern tech specs aggregator that curates the latest in hardware, software, and emerging technology news.',
    url: 'https://teckspecs.com',
    icon: 'cpu',
    color: 'from-blue-500 to-cyan-600',
    tags: ['Tech', 'News', 'Aggregator'],
  },
  {
    name: 'PatternForge',
    description: 'A developer tool for generating and managing code patterns, templates, and snippets across multiple languages.',
    url: 'https://patternforge.dev',
    icon: 'code',
    color: 'from-purple-500 to-violet-600',
    tags: ['Developer', 'Tools', 'Templates'],
  },
  {
    name: 'OpenPress',
    description: 'A lightweight, privacy-focused CMS built for modern web publishing with Markdown support.',
    url: 'https://openpress.dev',
    icon: 'file-text',
    color: 'from-orange-500 to-red-600',
    tags: ['CMS', 'Publishing', 'Markdown'],
  },
];

// ============================================
// Project Card
// ============================================

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group block p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-transparent hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
        <Icon name={project.icon} size={24} className="text-white" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2 group-hover:text-indigo-500 transition-colors">
        {project.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-2">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="default" size="sm">{tag}</Badge>
        ))}
      </div>

      {/* Link indicator */}
      <div className="flex items-center gap-1 text-sm text-zinc-400 group-hover:text-indigo-500 transition-colors">
        <span>Visit</span>
        <Icon name="external-link" size={14} />
      </div>
    </motion.a>
  );
}

// ============================================
// Sponsorship Section
// ============================================

function Sponsorship() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-8 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/5 dark:via-purple-500/5 dark:to-pink-500/5 border border-indigo-200 dark:border-indigo-800"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Icon */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30">
          <Icon name="heart" size={28} className="text-white" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">Support Open Source</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
            If my projects have helped you, consider sponsoring their development. Every contribution makes a difference.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Icon name="heart" size={14} />}
              onClick={() => window.open('https://github.com/sponsors/aliasfoxkde', '_blank', 'noopener')}
              className="shadow-md"
            >
              GitHub Sponsors
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Icon name="coffee" size={14} />}
              onClick={() => window.open('https://ko-fi.com/aliasfoxkde', '_blank', 'noopener')}
            >
              Buy Me a Coffee
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// Disclosure
// ============================================

function Disclosure() {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30">
      <Icon name="info" size={18} className="text-amber-500 flex-shrink-0" />
      <p className="text-xs text-amber-700 dark:text-amber-300">
        Some links may be affiliate links. I only recommend tools and services I personally use and trust.
      </p>
    </div>
  );
}

// ============================================
// Main Affiliates Section
// ============================================

export function AffiliatesSection() {
  return (
    <section id="affiliates" className="relative py-24 bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/10 to-transparent blur-3xl" />

      <Container size="lg" className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">My Projects</span>
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Tools and platforms I've built to solve real problems
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>

        {/* Sponsorship */}
        <div className="mb-8">
          <Sponsorship />
        </div>

        {/* Disclosure */}
        <Disclosure />
      </Container>
    </section>
  );
}

export default AffiliatesSection;
