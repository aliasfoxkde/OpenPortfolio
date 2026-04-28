// ============================================
// OpenPortfolio - Hero Section
// Stylistic and interactive
// ============================================

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { getGitHubProfile } from '@/lib/github';
import { formatNumber } from '@/lib/utils';

// ============================================
// Particle Background
// ============================================

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#6366f1', '#818cf8', '#06b6d4', '#a855f7', '#ec4899'];
    const particles: { x: number; y: number; vx: number; vy: number; r: number; color: string; alpha: number }[] = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        r: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.3,
      });
    }

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouse);

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
          const force = (200 - dist) / 200;
          p.vx -= (dx / dist) * force * 0.03;
          p.vy -= (dy / dist) * force * 0.03;
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
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        particles.forEach((p2) => {
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (d < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - d / 150) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}

// ============================================
// Gradient Background
// ============================================

function GradientBackground() {
  return (
    <div className="absolute inset-0 w-full h-full" style={{
      background: `
        radial-gradient(ellipse at 15% 20%, rgba(99, 102, 241, 0.25) 0%, transparent 50%),
        radial-gradient(ellipse at 85% 80%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 60%)
      `
    }} aria-hidden="true" />
  );
}

// ============================================
// Floating Orbs
// ============================================

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/10 blur-3xl"
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -30, 50, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '10%', left: '5%' }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-cyan-500/15 to-blue-500/10 blur-3xl"
        animate={{
          x: [0, -40, 20, 0],
          y: [0, 40, -20, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '10%', right: '10%' }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-pink-500/10 to-purple-500/10 blur-3xl"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, 20, -30, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '50%', right: '20%' }}
      />
    </div>
  );
}

// ============================================
// Glowing Border Ring
// ============================================

function GlowingRing() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
    >
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
        </defs>
        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth="2"
          strokeDasharray="8 8"
          className="animate-[spin_60s_linear_infinite]"
        />
      </svg>
    </motion.div>
  );
}

// ============================================
// Main Hero Section
// ============================================

export function HeroSection() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
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
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);

    getGitHubProfile().then((p) => {
      if (p) setProfile(p as typeof profile);
    });
  }, []);

  const avatarUrl = profile?.avatarUrl || 'https://avatars.githubusercontent.com/u/14325925?v=4';
  const name = profile?.name || 'Micheal Kinney';
  const login = profile?.login || 'aliasfoxkde';
  const bio = profile?.bio || 'Full-Stack Developer specializing in AI/ML, React, TypeScript, Cloudflare, and process automation.';
  const publicRepos = profile?.publicRepos || 28;
  const followers = profile?.followers || 22;
  const following = profile?.following || 58;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        {isReducedMotion ? <GradientBackground /> : <ParticleCanvas />}
        <FloatingOrbs />
        <GlowingRing />
      </div>

      {/* Noise */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />

      {/* Content */}
      <Container size="lg" className="relative z-10 py-20">
        <div className="flex flex-col items-center text-center gap-10">
          {/* Avatar with glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
            className="relative"
          >
            {/* Glow rings */}
            <motion.div
              className="absolute -inset-8 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-full h-full rounded-full border-2 border-dashed border-indigo-500/30" />
            </motion.div>
            <motion.div
              className="absolute -inset-4 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-full h-full rounded-full border border-purple-500/20" />
            </motion.div>

            {/* Avatar */}
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 blur-xl opacity-50" />
              <img
                src={avatarUrl}
                alt={`${name}'s avatar`}
                className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full border-4 border-white dark:border-zinc-800 shadow-2xl object-cover"
              />
              {/* Status dot */}
              <motion.div
                className="absolute bottom-1 right-1 w-8 h-8 rounded-full border-4 border-white dark:border-zinc-800 bg-green-500"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
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
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="text-center group"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Icon name={stat.icon} size={18} className="text-indigo-500" />
                  <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    {formatNumber(stat.value)}
                  </span>
                </div>
                <span className="text-sm text-zinc-500 dark:text-zinc-500">{stat.label}</span>
              </motion.div>
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
            <motion.div
              className="w-6 h-10 rounded-full border-2 border-zinc-300 dark:border-zinc-700 flex items-start justify-center p-1"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-1.5 h-3 rounded-full bg-indigo-500" />
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 to-transparent" />
    </section>
  );
}

export default HeroSection;
