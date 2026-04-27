// ============================================
// OpenPortfolio - Hero Section
// Fixed avatar URL and Tailwind v4
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

    const colors = ['#6366f1', '#818cf8', '#06b6d4', '#22d3ee', '#a855f7'];
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

    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener('mousemove', handleMouseMove);

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        const dx = mouseX - p.x, dy = mouseY - p.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.vx -= (dx / dist) * 0.02; p.vy -= (dy / dist) * 0.02;
        }
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.5;
        ctx.fill();

        particles.forEach((p2) => {
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - d / 120) * 0.2;
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
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
  );
}

// ============================================
// Gradient Background (Reduced Motion)
// ============================================

function GradientBackground() {
  return (
    <div className="absolute inset-0 w-full h-full" style={{
      background: 'radial-gradient(ellipse at 20% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(168, 85, 247, 0.05) 0%, transparent 70%)'
    }} aria-hidden="true" />
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
    htmlUrl: string;
  } | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);

    // Fetch profile from GitHub API
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
      <div className="absolute inset-0 bg-white dark:bg-zinc-950">
        {isReducedMotion ? <GradientBackground /> : <ParticleCanvas />}
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />

      {/* Content */}
      <Container size="lg" className="relative z-10 py-20">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-indigo-500/30 dark:bg-indigo-500/30 blur-xl animate-pulse" />
              <img
                src={avatarUrl}
                alt={`${name}'s avatar`}
                className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-indigo-500 shadow-lg shadow-indigo-500/30 object-cover"
              />
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-zinc-950 animate-pulse" />
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white"
          >
            {name}
          </motion.h1>

          {/* Username */}
          <motion.p
            className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-indigo-500">@</span>{login}
          </motion.p>

          {/* Bio */}
          <motion.p
            className="max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {bio}
          </motion.p>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 sm:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {[
              { label: 'Repos', value: publicRepos },
              { label: 'Followers', value: followers },
              { label: 'Following', value: following },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-indigo-500">
                  {formatNumber(stat.value)}
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
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
        </div>
      </Container>

      {/* Gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-zinc-950 to-transparent" />
    </section>
  );
}

export default HeroSection;
