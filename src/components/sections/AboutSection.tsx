// ============================================
// OpenPortfolio - About Section
// Enhanced with better content and visuals
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
    skills: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'Framer Motion', 'Radix UI'],
  },
  {
    title: 'Backend',
    icon: 'server',
    skills: ['Node.js', 'Python', 'FastAPI', 'REST APIs', 'WebSockets', 'GraphQL'],
  },
  {
    title: 'AI/ML',
    icon: 'brain',
    skills: ['LangChain', 'OpenAI API', 'Anthropic Claude', 'Vector DBs', 'RAG', 'Agents'],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'cloud',
    skills: ['Cloudflare Pages', 'Vercel', 'GitHub Actions', 'Docker', 'CI/CD', 'Linux'],
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
    description: 'Building AI-powered applications, developer tools, and open source projects. Focused on DX, automation, and intelligent systems.',
  },
  {
    year: '2023-2024',
    title: 'Cloud Infrastructure Engineer',
    company: 'Various Projects',
    description: 'Designed and deployed scalable cloud solutions using Cloudflare, AWS, and modern CI/CD pipelines.',
  },
  {
    year: '2020-2023',
    title: 'Software Developer',
    company: 'Early Career',
    description: 'Developed web applications, APIs, and automation tools. Shipped 10+ Cloudflare Pages deployments.',
  },
];

// ============================================
// Stats Counter
// ============================================

function StatCounter({ value, label, icon }: { value: number; label: string; icon: string }) {
  return (
    <div className="flex flex-col items-center p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
      <Icon name={icon} size={24} className="text-indigo-500 mb-2" />
      <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
        {value}+
      </span>
      <span className="text-sm text-zinc-500 dark:text-zinc-400 text-center">{label}</span>
    </div>
  );
}

// ============================================
// Skill Badge Grid
// ============================================

function SkillGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {skillCategories.map((category, i) => (
        <motion.div
          key={category.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
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
      ))}
    </div>
  );
}

// ============================================
// Timeline
// ============================================

function Timeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 transform sm:-translate-x-px" />

      <div className="space-y-8">
        {timeline.map((item, i) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className={`relative flex flex-col sm:flex-row gap-4 sm:gap-8 ${
              i % 2 === 0 ? 'sm:flex-row-reverse' : ''
            }`}
          >
            {/* Spacer for alternating */}
            <div className="hidden sm:block flex-1" />

            {/* Dot */}
            <div className="absolute left-0 sm:left-1/2 w-4 h-4 rounded-full bg-indigo-500 border-4 border-white dark:border-zinc-950 transform -translate-x-1/2 sm:-translate-x-1/2 shadow-lg shadow-indigo-500/30" />

            {/* Content */}
            <div className="flex-1 pl-8 sm:pl-0">
              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">{item.year}</span>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mt-1">{item.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">{item.company}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.description}</p>
              </div>
            </div>

            {/* Spacer for alternating */}
            <div className="hidden sm:block flex-1" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// Main About Section
// ============================================

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 bg-white dark:bg-zinc-950 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />

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
          <div className="prose prose-zinc dark:prose-invert mx-auto">
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-6">
              I'm <span className="font-semibold text-zinc-900 dark:text-white">Micheal Kinney</span>, a full-stack developer 
              passionate about building AI-powered applications, developer tools, and open source projects that make a difference.
            </p>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              With a focus on developer experience, automation, and intelligent systems, I create everything from 
              <span className="text-indigo-500"> AI agents and chatbots</span> to 
              <span className="text-indigo-500"> web frameworks and CLI tools</span>. I believe in the power of 
              <span className="text-purple-500"> open source</span> to accelerate innovation.
            </p>
            <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              When I'm not coding, you'll find me exploring new AI capabilities, contributing to open source, 
              or building tools that help other developers ship faster. My goal is to make technology more 
              accessible and powerful for everyone.
            </p>
          </div>
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
          <SkillGrid />
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
            Journey
          </h3>
          <Timeline />
        </div>
      </Container>
    </section>
  );
}

export default AboutSection;
