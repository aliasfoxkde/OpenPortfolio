// ============================================
// OpenPortfolio - Hero Section
// Full-screen interactive background
// ============================================

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { getGitHubProfile } from '@/lib/github';
import { formatNumber } from '@/lib/utils';

// ============================================
// Interactive Gradient Background
// ============================================

function InteractiveBackground() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="absolute inset-0 w-full h-full transition-all duration-300 ease-out"
      style={{
        background: `
          radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, rgba(99, 102, 241, 0.25) 0%, transparent 50%),
          radial-gradient(ellipse at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 60%)
        `
      }}
    />
  );
}

// ============================================
// Main Hero Section
// ============================================

export function HeroSection() {
  const [profile, setProfile] = useState<{
    name: string;
    login: string;
    bio: string;
    publicRepos: number;
    followers: number;
    following: number;
    avatarUrl: string;
  } | null>(null);

  useEffect(() => {

    getGitHubProfile().then((p) => {
      if (p) setProfile(p as typeof profile);
    });
  }, []);

  const avatarUrl = profile?.avatarUrl || 'https://avatars.githubusercontent.com/u/14325925?v=4';
  const name = profile?.name || 'Micheal L. C. Kinney';
  const login = profile?.login || 'aliasfoxkde';
  const bio = profile?.bio || 'Full-Stack Developer specializing in AI/ML, React, TypeScript, Cloudflare, and process automation.';
  const publicRepos = profile?.publicRepos || 28;
  const followers = profile?.followers || 22;
  const following = profile?.following || 58;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background - full screen */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <InteractiveBackground />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />

      {/* Content */}
      <Container size="lg" className="relative z-10 py-20">
        <div className="flex flex-col items-center text-center gap-10">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <img
                src={avatarUrl}
                alt={`${name}'s avatar`}
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-indigo-500 shadow-lg shadow-indigo-500/30 object-cover"
              />
            </div>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-2"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-zinc-900 via-indigo-600 to-purple-600 dark:from-white dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                {name}
              </span>
            </h1>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-zinc-600 dark:text-zinc-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-indigo-500">@</span>{login}
            </motion.p>
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-3xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
          >
            {bio}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 sm:gap-12"
          >
            {[
              { label: 'Repos', value: publicRepos, icon: 'folder' },
              { label: 'Followers', value: followers, icon: 'users' },
              { label: 'Following', value: following, icon: 'heart' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Icon name={stat.icon} size={18} className="text-indigo-500" />
                  <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    {formatNumber(stat.value)}
                  </span>
                </div>
                <span className="text-sm text-zinc-500 dark:text-zinc-500">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center gap-4 mt-4"
          >
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Icon name="github" size={20} />}
              onClick={() => window.open(`https://github.com/${login}`, '_blank', 'noopener')}
              className="shadow-lg shadow-indigo-500/30"
            >
              View on GitHub
            </Button>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Icon name="folder" size={20} />}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2"
            >
              View Projects
            </Button>
            <Button
              variant="ghost"
              size="lg"
              leftIcon={<Icon name="mail" size={20} />}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Me
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs text-zinc-400">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-zinc-300 dark:border-zinc-700 flex items-start justify-center p-1">
              <div className="w-1.5 h-3 rounded-full bg-indigo-500" />
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 to-transparent" />
    </section>
  );
}

export default HeroSection;
