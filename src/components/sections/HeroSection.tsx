// ============================================
// OpenPortfolio - Hero Section
// With particle canvas (user preferred version)
// ============================================

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { getGitHubProfile } from '@/lib/github';
import { formatNumber } from '@/lib/utils';

// ============================================
// Particle Canvas Background
// ============================================

function ParticleCanvas() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.style.position = 'absolute';
    canvas.style.inset = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.className = 'opacity-30';
    
    const container = document.querySelector('#hero > div') as HTMLElement;
    if (container) container.style.position = 'relative';
    container?.appendChild(canvas);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#6366f1', '#818cf8', '#06b6d4', '#a855f7', '#ec4899'];
    const particles: { x: number; y: number; vx: number; vy: number; r: number; color: string }[] = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        const dx = mousePos.x - (p.x / canvas.width) * 100;
        const dy = mousePos.y - (p.y / canvas.height) * 100;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 30) {
          const force = (30 - dist) / 30;
          p.vx -= (dx / dist) * force * 0.02;
          p.vy -= (dy / dist) * force * 0.02;
        }

        p.vx *= 0.99;
        p.vy *= 0.99;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.6;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      canvas.remove();
    };
  }, []);

  return <canvas aria-hidden="true" />;
}

// ============================================
// Gradient Background
// ============================================

function GradientBackground() {
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
          radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, rgba(99, 102, 241, 0.2) 0%, transparent 50%),
          radial-gradient(ellipse at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(6, 182, 212, 0.08) 0%, transparent 60%)
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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <ParticleCanvas />
        <GradientBackground />
      </div>

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />

      {/* Content */}
      <Container size="lg" className="relative z-10 py-20">
        <div className="flex flex-col items-center text-center gap-10">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
          >
            <img
              src={avatarUrl}
              alt={`${name}'s avatar`}
              className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full border-4 border-indigo-500 shadow-2xl object-cover"
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
