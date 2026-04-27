// ============================================
// OpenPortfolio - About Section
// Profile, bio, stats, and skills
// WCAG 2.5 AAA Compliant
// ============================================

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { githubProfile, skills } from '@/data/projects';
import { cn, formatNumber } from '@/lib/utils';
import type { Skill } from '@/lib/types';

// ============================================
// Animated Counter Component
// ============================================

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

function AnimatedCounter({ end, duration = 2000, suffix = '', className }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [end, duration, isInView]);

  return (
    <span ref={ref} className={className}>
      {formatNumber(count)}{suffix}
    </span>
  );
}

// ============================================
// Skill Badge Component
// ============================================

interface SkillBadgeProps {
  skill: Skill;
  index: number;
}

function SkillBadge({ skill, index }: SkillBadgeProps) {
  const levelColors = {
    beginner: 'var(--color-foreground-subtle)',
    intermediate: 'var(--color-info)',
    advanced: 'var(--color-success)',
    expert: 'var(--color-primary)',
  };

  const levelToBars = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
    expert: 4,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="flex items-center gap-3 p-3 rounded-lg bg-[var(--color-background-alt)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-colors"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold"
        style={{ backgroundColor: levelColors[skill.level], color: 'white' }}
        aria-hidden="true"
      >
        {skill.name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-[var(--color-foreground)] truncate">
          {skill.name}
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--color-foreground-muted)]">
          <span className="capitalize">{skill.level}</span>
          <span>•</span>
          <span>{skill.years}y</span>
        </div>
      </div>
      {/* Level indicator */}
      <div className="flex gap-0.5" aria-label={`Skill level: ${skill.level}`}>
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={cn(
              'w-1.5 h-4 rounded-full',
              level <= levelToBars[skill.level]
                ? 'bg-[var(--color-primary)]'
                : 'bg-[var(--color-border)]'
            )}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ============================================
// Stat Card Component
// ============================================

interface StatCardProps {
  label: string;
  value: number;
  icon: string;
  delay: number;
}

function StatCard({ label, value, icon, delay }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 0.3 }}
      className="flex flex-col items-center p-6 rounded-xl bg-[var(--color-background-alt)] border border-[var(--color-border)] text-center"
    >
      <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-3">
        <Icon name={icon} size={24} className="text-[var(--color-primary)]" />
      </div>
      <div className="text-3xl font-bold text-[var(--color-foreground)] mb-1">
        <AnimatedCounter end={value} suffix="+" />
      </div>
      <div className="text-sm text-[var(--color-foreground-muted)]">{label}</div>
    </motion.div>
  );
}

// ============================================
// Main About Section Component
// ============================================

export function AboutSection() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Group skills by category
  const skillCategories = [
    {
      name: 'Frontend',
      icon: 'monitor',
      skills: skills.filter((s) => s.category === 'frontend'),
    },
    {
      name: 'Backend',
      icon: 'server',
      skills: skills.filter((s) => s.category === 'backend'),
    },
    {
      name: 'AI & ML',
      icon: 'brain',
      skills: skills.filter((s) => s.category === 'ai-ml'),
    },
    {
      name: 'DevOps',
      icon: 'cloud',
      skills: skills.filter((s) => s.category === 'devops'),
    },
    {
      name: 'Tools',
      icon: 'settings',
      skills: skills.filter((s) => s.category === 'tools'),
    },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen py-20 bg-[var(--color-background-alt)]"
      aria-label="About me"
    >
      <Container size="lg">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-lg text-[var(--color-foreground-muted)] max-w-2xl mx-auto">
            Full-Stack developer with a passion for building innovative solutions
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col lg:flex-row items-center gap-8 mb-16"
        >
          {/* Avatar */}
          <div className="relative shrink-0">
            {/* Glow effect */}
            {!isReducedMotion && (
              <motion.div
                className="absolute -inset-4 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
                }}
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            )}

            <motion.img
              src={githubProfile.avatarUrl}
              alt={`${githubProfile.name || githubProfile.login}'s profile photo`}
              className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full border-4 border-[var(--color-primary)] shadow-xl object-cover"
              whileHover={{ rotate: [0, -3, 3, 0] }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Info */}
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-foreground)] mb-2">
              {githubProfile.name || githubProfile.login}
            </h3>
            <p className="text-[var(--color-primary)] font-medium mb-4">
              @{githubProfile.login}
            </p>
            <p className="text-[var(--color-foreground-muted)] mb-6 leading-relaxed">
              {githubProfile.bio || 'Passionate developer focused on creating innovative solutions with modern technologies.'}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {skillCategories.map((category) => (
                <Badge key={category.name} variant="primary" size="md">
                  <Icon name={category.icon} size={14} />
                  <span>{category.name}</span>
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <StatCard label="Repositories" value={githubProfile.publicRepos} icon="folder" delay={0.1} />
          <StatCard label="Followers" value={githubProfile.followers} icon="users" delay={0.2} />
          <StatCard label="Following" value={githubProfile.following} icon="heart" delay={0.3} />
          <StatCard label="Skills" value={skills.length} icon="star" delay={0.4} />
        </div>

        {/* Skills Grid */}
        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <div key={category.name}>
              <motion.h4
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 text-xl font-semibold mb-4"
              >
                <Icon name={category.icon} size={24} className="text-[var(--color-primary)]" />
                <span>{category.name}</span>
              </motion.h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBadge
                    key={skill.name}
                    skill={skill}
                    index={categoryIndex * 0.1 + skillIndex * 0.05}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-[var(--color-foreground-muted)] mb-4">
            Interested in working together?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-primary-foreground)] font-medium hover:bg-[var(--color-primary-hover)] transition-colors"
            >
              <Icon name="mail" size={20} />
              <span>Get in Touch</span>
            </a>
            <a
              href={githubProfile.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[var(--color-border)] text-[var(--color-foreground)] font-medium hover:bg-[var(--color-background-elevated)] transition-colors"
            >
              <Icon name="github" size={20} />
              <span>View GitHub</span>
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default AboutSection;