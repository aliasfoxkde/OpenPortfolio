// ============================================
// OpenPortfolio - Header Component
// Fixed for Tailwind v4 with Theme Toggle
// ============================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { useTheme } from '@/lib/theme';
import { sections, githubProfile } from '@/data/projects';

// ============================================
// Icons
// ============================================

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function ComputerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="8" x="5" y="2" rx="2" ry="2"/>
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2"/>
      <line x1="6" x2="6.01" y1="6" y2="6"/>
      <line x1="6" x2="6.01" y1="18" y2="18"/>
    </svg>
  );
}

// ============================================
// Logo Icon
// ============================================

function LogoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="6" fill="#6366f1"/>
      <path d="M8 24L16 8L24 24M11 19H21" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ============================================
// Theme Toggle
// ============================================

function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'system') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('system');
    }
  };

  const ThemeIcon = () => {
    if (theme === 'system') return <ComputerIcon />;
    return resolvedTheme === 'dark' ? <MoonIcon /> : <SunIcon />;
  };

  const getLabel = () => {
    if (theme === 'system') return 'System';
    return theme === 'dark' ? 'Dark' : 'Light';
  };

  return (
    <button
      onClick={cycleTheme}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
      aria-label={`Current theme: ${getLabel()}. Click to change.`}
      title={`Theme: ${getLabel()}`}
    >
      <ThemeIcon />
      <span className="hidden sm:inline">{getLabel()}</span>
    </button>
  );
}

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
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-y-0 right-0 w-72 bg-white dark:bg-zinc-950 border-l border-zinc-200 dark:border-zinc-800 z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
              <span className="text-lg font-semibold text-zinc-900 dark:text-white">Menu</span>
              <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close menu">
                <Icon name="x" size={24} />
              </Button>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={section.href}
                      onClick={onClose}
                      className="flex items-center gap-3 p-3 rounded-lg text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                    >
                      <Icon name={section.icon} size={20} />
                      <span>{section.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
              <ThemeToggle />
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
      <div className="relative h-48 w-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-indigo-500 rounded-full"
          style={{ height: `${progress}%` }}
        />
      </div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute right-6 flex flex-col gap-2 bg-white dark:bg-zinc-900 p-2 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            {sections.map((section) => (
              <a
                key={section.id}
                href={section.href}
                className="text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white whitespace-nowrap"
              >
                {section.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col gap-3">
        {sections.map((section) => (
          <a
            key={section.id}
            href={section.href}
            className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-500 dark:hover:bg-zinc-500 transition-colors"
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
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800'
            : 'bg-transparent'
        }`}
      >
        <Container size="lg">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a href="#hero" className="flex items-center gap-3 text-zinc-900 dark:text-white font-semibold">
              <LogoIcon />
              <span className="hidden sm:inline">Micheal Kinney</span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={section.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  {section.name}
                </a>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button
                variant="primary"
                size="sm"
                className="hidden sm:flex"
                onClick={() => window.open(githubProfile.htmlUrl, '_blank', 'noopener')}
              >
                <Icon name="github" size={16} />
                <span>GitHub</span>
              </Button>
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
          </div>
        </Container>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <SectionProgress progress={scrollProgress} />
      <div className="h-16 sm:h-20" />
    </>
  );
}

export default Header;
