// ============================================
// OpenPortfolio - About Section
// Fixed for Tailwind v4
// ============================================

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { githubProfile, skills } from '@/data/projects';
import { cn, formatNumber } from '@/lib/utils';

function AnimatedCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / 2000, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, isInView]);

  return <span ref={ref}>{formatNumber(count)}{suffix}</span>;
}

function SkillBadge({ skill }: { skill: typeof skills[0] }) {
  const colors = { beginner: 'bg-zinc-600', intermediate: 'bg-blue-500', advanced: 'bg-green-500', expert: 'bg-indigo-500' };
  const levels = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors"
    >
      <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold text-white", colors[skill.level])}>
        {skill.name.charAt(0)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-white truncate">{skill.name}</div>
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <span className="capitalize">{skill.level}</span>
          <span>•</span>
          <span>{skill.years}y</span>
        </div>
      </div>
      <div className="flex gap-0.5">
        {[1, 2, 3, 4].map((lvl) => (
          <div key={lvl} className={cn("w-1.5 h-4 rounded-full", lvl <= levels[skill.level] ? "bg-indigo-500" : "bg-zinc-700")} />
        ))}
      </div>
    </motion.div>
  );
}

function StatCard({ label, value, icon, delay }: { label: string; value: number; icon: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
      className="flex flex-col items-center p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center"
    >
      <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-3">
        <Icon name={icon} size={24} className="text-indigo-500" />
      </div>
      <div className="text-3xl font-bold text-white mb-1">
        <AnimatedCounter end={value} suffix="+" />
      </div>
      <div className="text-sm text-zinc-500">{label}</div>
    </motion.div>
  );
}

export function AboutSection() {
  const categories = [
    { name: 'Frontend', icon: 'monitor', skills: skills.filter((s) => s.category === 'frontend') },
    { name: 'Backend', icon: 'server', skills: skills.filter((s) => s.category === 'backend') },
    { name: 'AI & ML', icon: 'brain', skills: skills.filter((s) => s.category === 'ai-ml') },
    { name: 'DevOps', icon: 'cloud', skills: skills.filter((s) => s.category === 'devops') },
    { name: 'Tools', icon: 'settings', skills: skills.filter((s) => s.category === 'tools') },
  ];

  return (
    <section id="about" className="relative py-20 bg-zinc-950" aria-label="About me">
      <Container size="lg">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Full-Stack developer with a passion for building innovative solutions
          </p>
        </motion.div>

        {/* Profile */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-col lg:flex-row items-center gap-8 mb-16">
          <div className="relative shrink-0">
            <div className="absolute -inset-4 rounded-full bg-indigo-500/30 blur-xl" />
            <img src={githubProfile.avatarUrl} alt={githubProfile.name || githubProfile.login} className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full border-4 border-indigo-500 shadow-xl object-cover" />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{githubProfile.name || githubProfile.login}</h3>
            <p className="text-indigo-500 font-medium mb-4">@{githubProfile.login}</p>
            <p className="text-zinc-400 mb-6 leading-relaxed max-w-xl">{githubProfile.bio}</p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {categories.map((cat) => (
                <Badge key={cat.name} variant="primary" size="md">
                  <Icon name={cat.icon} size={14} />
                  <span>{cat.name}</span>
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

        {/* Skills */}
        <div className="space-y-12">
          {categories.map((cat) => (
            <div key={cat.name}>
              <h4 className="flex items-center gap-2 text-xl font-semibold mb-4">
                <Icon name={cat.icon} size={24} className="text-indigo-500" />
                <span className="text-white">{cat.name}</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {cat.skills.map((skill) => <SkillBadge key={skill.name} skill={skill} />)}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-16 text-center">
          <p className="text-zinc-400 mb-4">Interested in working together?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition-colors">
              <Icon name="mail" size={20} />
              <span>Get in Touch</span>
            </a>
            <a href={githubProfile.htmlUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-zinc-700 text-white font-medium hover:bg-zinc-900 transition-colors">
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
