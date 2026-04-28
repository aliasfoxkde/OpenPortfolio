// ============================================
// OpenPortfolio - Hero Section
// Clean with subtle cursor-following glow
// ============================================

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { getGitHubProfile } from '@/lib/github';
import { formatNumber } from '@/lib/utils';

// ============================================
// Interactive Cursor Glow
// ============================================

function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
      
      // Hide glow after 2 seconds of no movement
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setIsVisible(false), 2000);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isVisible]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          left: position.x - 200,
          top: position.y - 200,
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </div>
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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <CursorGlow />
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
            <img
              src={avatarUrl}
              alt={`${name}'s avatar`}
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-indigo-500 shadow-lg shadow-indigo-500/30 object-cover"
            />
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-2"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {name}
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
                  <span className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
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
            >
              View on GitHub
            </Button>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Icon name="folder" size={20} />}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
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
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <span className="text-xs text-zinc-400">Scroll to explore</span>
            <div className="w-6 h-10 rounded-full border-2 border-zinc-300 dark:border-zinc-700 flex items-start justify-center p-1 mt-2">
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
