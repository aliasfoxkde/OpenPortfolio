// ============================================
// OpenPortfolio - Hero Section
// Interactive animated hero with particle background
// WCAG 2.5 AAA Compliant
// ============================================

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { githubProfile } from '@/data/projects';
import { cn } from '@/lib/utils';

// ============================================
// Particle Background Component
// ============================================

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];
    const particleCount = 80;
    const colors = ['#6366f1', '#818cf8', '#06b6d4', '#22d3ee', '#a855f7'];

    // Resize handler
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
      });
    }

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentMouseX = mouseX.get();
      const currentMouseY = mouseY.get();

      particles.forEach((p) => {
        // Mouse interaction
        const dx = currentMouseX - p.x;
        const dy = currentMouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.vx -= (dx / dist) * force * 0.02;
          p.vy -= (dy / dist) * force * 0.02;
        }

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Boundary check
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw connections
        particles.forEach((p2) => {
          const d = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - d / 120) * 0.3;
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isReducedMotion, mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

// ============================================
// Gradient Background (Fallback for reduced motion)
// ============================================

function GradientBackground() {
  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        background: `
          radial-gradient(ellipse at 20% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(168, 85, 247, 0.05) 0%, transparent 70%)
        `,
      }}
      aria-hidden="true"
    />
  );
}

// ============================================
// Animated Avatar Component
// ============================================

function AnimatedAvatar() {
  const [isHovered, setIsHovered] = useState(false);
  const scale = useSpring(1, { stiffness: 300, damping: 20 });
  const glowOpacity = useMotionValue(0.5);

  useEffect(() => {
    if (isHovered) {
      scale.set(1.05);
      glowOpacity.set(1);
    } else {
      scale.set(1);
      glowOpacity.set(0.5);
    }
  }, [isHovered, scale, glowOpacity]);

  return (
    <motion.div
      className="relative"
      style={{ scale }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-4 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
          opacity: glowOpacity.get(),
          filter: 'blur(20px)',
        }}
        animate={{
          scale: isHovered ? [1, 1.1, 1] : [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Avatar image */}
      <motion.img
        src={githubProfile.avatarUrl}
        alt={`${githubProfile.name || githubProfile.login}'s avatar`}
        className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-[var(--color-primary)] shadow-lg object-cover"
        style={{
          boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)',
        }}
        whileHover={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.5 }}
      />

      {/* Online indicator */}
      <motion.div
        className="absolute bottom-2 right-2 w-6 h-6 bg-[var(--color-success)] rounded-full border-4 border-[var(--color-background)]"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        title="Available for work"
      />
    </motion.div>
  );
}

// ============================================
// Typing Animation Component
// ============================================

interface TypingTextProps {
  text: string;
  className?: string;
  delay?: number;
}

function TypingText({ text, className, delay = 0 }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTyping(true);
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <span className={cn('inline-block', className)}>
      {displayedText}
      {isTyping && (
        <span className="inline-block w-0.5 h-[1em] bg-[var(--color-primary)] ml-1 animate-blink" />
      )}
    </span>
  );
}

// ============================================
// Scroll Indicator Component
// ============================================

function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
    >
      <span className="text-sm text-[var(--color-foreground-muted)] font-medium">
        Scroll to explore
      </span>
      <motion.div
        className="w-6 h-10 rounded-full border-2 border-[var(--color-border)] flex items-start justify-center p-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full"
          animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}

// ============================================
// Main Hero Section Component
// ============================================

export function HeroSection() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const tagline = 'Full-Stack developer with passion for CS, ML/AI, process automation, and technical writing.';

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--color-background)]">
        {isReducedMotion ? <GradientBackground /> : <ParticleCanvas />}
      </div>

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <Container size="lg" className="relative z-10 py-20">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatedAvatar />
          </motion.div>

          {/* Name */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            <span className="text-[var(--color-foreground)]">
              {githubProfile.name || githubProfile.login}
            </span>
          </motion.p>

          {/* Username */}
          <motion.p
            className="text-lg sm:text-xl text-[var(--color-foreground-muted)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="text-[var(--color-primary)]">@</span>
            {githubProfile.login}
          </motion.p>

          {/* Tagline with typing effect */}
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className="text-base sm:text-lg text-[var(--color-foreground-muted)] leading-relaxed">
              <TypingText text={tagline} delay={800} />
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            {[
              { label: 'Repos', value: githubProfile.publicRepos },
              { label: 'Followers', value: githubProfile.followers },
              { label: 'Following', value: githubProfile.following },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)]">
                  {stat.value}
                </div>
                <div className="text-sm text-[var(--color-foreground-muted)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Icon name="github" size={20} />}
              onClick={() => window.open(githubProfile.htmlUrl, '_blank', 'noopener')}
              aria-label="View GitHub profile"
            >
              View on GitHub
            </Button>
            <Button
              variant="outline"
              size="lg"
              leftIcon={<Icon name="folder" size={20} />}
              onClick={() => {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label="View projects section"
            >
              View Projects
            </Button>
            <Button
              variant="ghost"
              size="lg"
              leftIcon={<Icon name="mail" size={20} />}
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label="View contact section"
            >
              Contact Me
            </Button>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      {!isReducedMotion && <ScrollIndicator />}

      {/* Gradient fade at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--color-background)] to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}

export default HeroSection;