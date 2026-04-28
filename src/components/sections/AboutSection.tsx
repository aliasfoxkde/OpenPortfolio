// ============================================
// OpenPortfolio - About Section
// Clean and professional
// ============================================

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Icon } from '@/components/ui/Icon';
import { Badge } from '@/components/ui/Badge';

// ============================================
// Skills Data
// ============================================

const skillCategories = [
  {
    title: 'Frontend',
    icon: 'monitor',
    skills: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'Framer Motion'],
  },
  {
    title: 'Backend',
    icon: 'server',
    skills: ['Node.js', 'Python', 'FastAPI', 'REST APIs', 'WebSockets'],
  },
  {
    title: 'AI/ML',
    icon: 'brain',
    skills: ['LangChain', 'OpenAI API', 'Anthropic Claude', 'Vector DBs', 'RAG'],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'cloud',
    skills: ['Cloudflare Pages', 'Vercel', 'GitHub Actions', 'Docker', 'CI/CD'],
  },
];

// ============================================
// Timeline Data
// ============================================

const timeline = [
  {
    year: '2024-Present',
    title: 'Full-Stack Developer',
    company: 'Independent / Open Source',
    description: 'Building AI-powered applications, developer tools, and open source projects.',
  },
  {
    year: '2023-2024',
    title: 'Cloud Infrastructure Engineer',
    company: 'Various Projects',
    description: 'Designed and deployed scalable cloud solutions using Cloudflare, AWS, and modern CI/CD.',
  },
  {
    year: '2020-2023',
    title: 'Software Developer',
    company: 'Early Career',
    description: 'Developed web applications, APIs, and automation tools across multiple platforms.',
  },
];

// ============================================
// Stats Counter
// ============================================

function StatCounter({ value, label, icon }: { value: number; label: string; icon: string }) {
  return (
    <div className="flex flex-col items-center p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
      <Icon name={icon} size={24} className="text-indigo-500 mb-2" />
      <span className="text-3xl font-bold text-zinc-900 dark:text-white">{value}+</span>
      <span className="text-sm text-zinc-500 dark:text-zinc-400 text-center">{label}</span>
    </div>
  );
}

// ============================================
// Skill Card
// ============================================

function SkillCard({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="p-6 rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-500/10">
          <Icon name={category.icon} size={20} className="text-indigo-500" />
        </div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{category.title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <Badge key={skill} variant="default" size="sm">{skill}</Badge>
        ))}
      </div>
    </motion.div>
  );
}

// ============================================
// Timeline Item
// ============================================

function TimelineItem({ item, index }: { item: typeof timeline[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="relative pl-8 border-l-2 border-zinc-200 dark:border-zinc-800 last:border-l-0"
    >
      {/* Timeline dot */}
      <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-indigo-500 border-4 border-white dark:border-zinc-950" />
      
      <div className="pb-8 last:pb-0">
        <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">{item.year}</span>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mt-1">{item.title}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">{item.company}</p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.description}</p>
      </div>
    </motion.div>
  );
}

// ============================================
// Main About Section
// ============================================

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 bg-white dark:bg-zinc-950 overflow-hidden">
      <Container size="lg" className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Building the future, one commit at a time
          </p>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
            I'm <span className="font-semibold text-zinc-900 dark:text-white">Micheal L. C. Kinney</span>, a full-stack developer 
            passionate about building AI-powered applications, developer tools, and open source projects that make a difference.
          </p>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            With a focus on developer experience, automation, and intelligent systems, I create everything from 
            AI agents and chatbots to web frameworks and CLI tools. I believe in the power of open source to accelerate innovation.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
        >
          <StatCounter value={93} label="GitHub Repos" icon="folder" />
          <StatCounter value={10} label="Deployments" icon="globe" />
          <StatCounter value={22} label="Followers" icon="users" />
          <StatCounter value={92} label="Projects Built" icon="rocket" />
        </motion.div>

        {/* Skills */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
            Tech Stack
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skillCategories.map((category, i) => (
              <SkillCard key={category.title} category={category} index={i} />
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
            Journey
          </h3>
          <div className="max-w-2xl mx-auto">
            {timeline.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default AboutSection;
