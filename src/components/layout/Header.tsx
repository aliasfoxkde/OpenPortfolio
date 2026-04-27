// ============================================
// OpenPortfolio - Header Component
// Fixed for Tailwind v4
// ============================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { sections, githubProfile } from '@/data/projects';
import { cn } from '@/lib/utils';

// ============================================
// Mobile Menu
// ============================================

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            className="fixed inset-y-0 right-0 w-72 bg-zinc-950 border-l border-zinc-800 z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <span className="text-lg font-semibold text-white">Menu</span>
              <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close menu">
                <Icon name="x" size={24} />
              </Button>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4">
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={section.href}
                      onClick={onClose}
                      className="flex items-center gap-3 p-3 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                    >
                      <Icon name={section.icon} size={20} />
                      <span>{section.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social */}
            <div className="p-4 border-t border-zinc-800">
              <div className="flex items-center justify-center gap-4">
                <a
                  href={githubProfile.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                  aria-label="GitHub"
                >
                  <Icon name="github" size={24} />
                </a>
                <a
                  href="mailto:micheal.l.c.kinney@gmail.com"
                  className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                  aria-label="Email"
                >
                  <Icon name="mail" size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================
// Section Progress
// ============================================

function SectionProgress({ progress }: { progress: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fixed top-1/2 -translate-y-1/2 right-4 z-30 hidden lg:flex flex-col items-center gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Progress bar */}
      <div className="relative h-48 w-1 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-indigo-500 rounded-full"
          style={{ height: `${progress}%` }}
        />
      </div>

      {/* Labels on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute right-6 flex flex-col gap-2 bg-zinc-900/90 p-2 rounded-lg"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            {sections.map((section) => (
              <a
                key={section.id}
                href={section.href}
                className="text-xs font-medium text-zinc-400 hover:text-white whitespace-nowrap"
              >
                {section.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dots */}
      <div className="flex flex-col gap-3">
        {sections.map((section) => (
          <a
            key={section.id}
            href={section.href}
            className="w-2 h-2 rounded-full bg-zinc-700 hover:bg-zinc-500 transition-colors"
            title={section.name}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================
// Main Header
// ============================================

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((scrollTop / docHeight) * 100 || 0);
      setIsScrolled(scrollTop > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-30 transition-all duration-300",
          isScrolled
            ? "bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-800"
            : "bg-transparent"
        )}
      >
        <Container size="lg">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-3 text-white font-semibold">
              <div className="w-9 h-9 rounded-lg bg-indigo-500 flex items-center justify-center">
                <span className="text-lg font-bold">M</span>
              </div>
              <span className="hidden sm:inline">Micheal Kinney</span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={section.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
                >
                  {section.name}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => window.open(githubProfile.htmlUrl, '_blank', 'noopener')}
              >
                <Icon name="github" size={16} />
                <span>GitHub</span>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="md"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Icon name="menu" size={24} />
            </Button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      {/* Section Progress */}
      <SectionProgress progress={scrollProgress} />

      {/* Spacer */}
      <div className="h-16 sm:h-20" />
    </>
  );
}

export default Header;
