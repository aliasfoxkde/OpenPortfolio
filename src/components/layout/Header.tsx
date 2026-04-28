// ============================================
// OpenPortfolio - Header Component
// Logo in upper left, clean and simple
// ============================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { LogoIcon } from '@/components/ui/LogoIcon';
import { useTheme } from '@/lib/theme';
import { sections, githubProfile } from '@/data/projects';

// ============================================
// Theme Toggle
// ============================================

function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === 'system') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('system');
  };

  return (
    <button
      onClick={cycleTheme}
      className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'system' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="14" height="8" x="5" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/></svg>
      ) : resolvedTheme === 'dark' ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
      )}
    </button>
  );
}

// ============================================
// Mobile Menu
// ============================================

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

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
              <LogoIcon size={24} />
              <Button variant="ghost" size="sm" onClick={onClose}>
                <Icon name="x" size={24} />
              </Button>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={section.href} onClick={onClose}
                      className="flex items-center gap-3 p-3 rounded-lg text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
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
// Main Header
// ============================================

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800' : 'bg-transparent'
      }`}>
        <Container size="lg">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo - upper left */}
            <a href="#hero" aria-label="Back to top">
              <LogoIcon size={32} />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {sections.map((section) => (
                <a key={section.id} href={section.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors">
                  {section.name}
                </a>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="primary" size="sm" className="hidden sm:flex"
                onClick={() => window.open(githubProfile.htmlUrl, '_blank', 'noopener')}>
                <Icon name="github" size={16} />
                <span>GitHub</span>
              </Button>
              <Button variant="ghost" size="md" className="md:hidden"
                onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">
                <Icon name="menu" size={24} />
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <div className="h-16 sm:h-20" />
    </>
  );
}

export default Header;
