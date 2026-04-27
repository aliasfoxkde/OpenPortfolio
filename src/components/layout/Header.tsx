// ============================================
// OpenPortfolio - Header Component
// Sticky navigation with mobile menu
// WCAG 2.5 AAA Compliant
// ============================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { navLinks, sections } from '@/data/projects';
import { cn } from '@/lib/utils';

// ============================================
// Mobile Menu Component
// ============================================

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Close on escape key
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
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <motion.div
            className="fixed inset-y-0 right-0 w-72 bg-[var(--color-background-alt)] border-l border-[var(--color-border)] z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            role="dialog"
            aria-label="Navigation menu"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
              <span className="text-lg font-semibold text-[var(--color-foreground)]">Menu</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                aria-label="Close menu"
              >
                <Icon name="x" size={24} />
              </Button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4">
              <ul className="space-y-2" role="list">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={section.href}
                      className="flex items-center gap-3 p-3 rounded-lg text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-background-elevated)] transition-colors"
                      onClick={onClose}
                    >
                      <Icon name={section.icon} size={20} />
                      <span>{section.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Social Links */}
            <div className="p-4 border-t border-[var(--color-border)]">
              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://github.com/aliasfoxkde"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-background-elevated)] transition-colors"
                  aria-label="GitHub profile"
                >
                  <Icon name="github" size={24} />
                </a>
                <a
                  href="https://twitter.com/aliasfoxkde"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-background-elevated)] transition-colors"
                  aria-label="Twitter profile"
                >
                  <Icon name="twitter" size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/micheal-kinney"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-background-elevated)] transition-colors"
                  aria-label="LinkedIn profile"
                >
                  <Icon name="linkedin" size={24} />
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
// Section Progress Indicator
// ============================================

interface SectionProgressProps {
  progress: number;
  currentSection: string;
}

function SectionProgress({ progress, currentSection }: SectionProgressProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="fixed top-1/2 -translate-y-1/2 right-4 z-30 hidden lg:flex flex-col items-center gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="navigation"
      aria-label="Section navigation"
    >
      {/* Progress bar */}
      <div className="relative h-48 w-1 bg-[var(--color-border)] rounded-full overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-[var(--color-primary)] rounded-full"
          style={{ height: `${progress}%` }}
          transition={{ type: 'spring', damping: 30, stiffness: 100 }}
        />
      </div>

      {/* Section labels */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute right-6 flex flex-col gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
          >
            {sections.map((section) => (
              <a
                key={section.id}
                href={section.href}
                className={cn(
                  'text-xs font-medium transition-colors whitespace-nowrap',
                  currentSection === section.id
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)]'
                )}
              >
                {section.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section dots */}
      <div className="flex flex-col gap-3">
        {sections.map((section) => (
          <a
            key={section.id}
            href={section.href}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              currentSection === section.id
                ? 'bg-[var(--color-primary)] scale-125'
                : 'bg-[var(--color-border)] hover:bg-[var(--color-foreground-muted)]'
            )}
            aria-label={`Go to ${section.name} section`}
            title={section.name}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================
// Main Header Component
// ============================================

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('hero');

  // Scroll detection
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

  // Intersection Observer for section detection
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-30 transition-all duration-300',
          isScrolled
            ? 'bg-[var(--color-background)]/80 backdrop-blur-lg border-b border-[var(--color-border)]'
            : 'bg-transparent'
        )}
        role="banner"
      >
        <Container size="lg">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a
              href="#hero"
              className="flex items-center gap-3 text-[var(--color-foreground)] font-semibold"
              aria-label="Go to home section"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
                <span className="text-lg sm:text-xl font-bold">M</span>
              </div>
              <span className="hidden sm:inline">Micheal Kinney</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    currentSection === link.href.slice(1)
                      ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/10'
                      : 'text-[var(--color-foreground-muted)] hover:text-[var(--color-foreground)] hover:bg-[var(--color-background-alt)]'
                  )}
                  aria-current={currentSection === link.href.slice(1) ? 'page' : undefined}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => window.open('https://github.com/aliasfoxkde', '_blank', 'noopener')}
                aria-label="View GitHub profile"
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
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <Icon name="menu" size={24} />
            </Button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Section Progress Indicator */}
      <SectionProgress progress={scrollProgress} currentSection={currentSection} />

      {/* Spacer for fixed header */}
      <div className="h-16 sm:h-20" aria-hidden="true" />
    </>
  );
}

export default Header;