// ============================================
// OpenPortfolio - Footer Component
// Full footer with all links and legal
// WCAG 2.5 AAA Compliant
// ============================================

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { footerLinks, socialLinks, githubProfile } from '@/data/projects';
import { cn } from '@/lib/utils';

// ============================================
// Back to Top Button Component
// ============================================

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full',
        'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]',
        'flex items-center justify-center',
        'hover:bg-[var(--color-primary-hover)] transition-colors',
        'shadow-lg shadow-[var(--color-primary)]/30',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-background)] focus:ring-[var(--color-primary)]',
        !isVisible && 'pointer-events-none'
      )}
      aria-label="Back to top"
      title="Back to top"
    >
      <Icon name="chevron-up" size={24} />
    </motion.button>
  );
}

// ============================================
// Social Icon Component
// ============================================

function SocialIcon({ name, url }: { name: string; url: string }) {
  const iconMap: Record<string, string> = {
    github: 'github',
    twitter: 'twitter',
    linkedin: 'linkedin',
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'w-10 h-10 rounded-full flex items-center justify-center',
        'bg-[var(--color-background-elevated)] border border-[var(--color-border)]',
        'text-[var(--color-foreground-muted)]',
        'hover:text-[var(--color-primary)] hover:border-[var(--color-primary)]',
        'transition-colors duration-200'
      )}
      aria-label={`Follow on ${name}`}
    >
      <Icon name={iconMap[name] || 'globe'} size={20} />
    </a>
  );
}

// ============================================
// Main Footer Component
// ============================================

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative bg-[var(--color-background)] border-t border-[var(--color-border)]"
      role="contentinfo"
    >
      <Container size="lg">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)] flex items-center justify-center">
                <span className="text-lg font-bold">M</span>
              </div>
              <span className="text-lg font-semibold text-[var(--color-foreground)]">
                Micheal Kinney
              </span>
            </div>
            <p className="text-sm text-[var(--color-foreground-muted)] mb-4">
              Full-Stack developer with passion for CS, ML/AI, process automation,
              and technical writing.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <SocialIcon key={link.name} name={link.icon} url={link.url} />
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-foreground)] uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2" role="list">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-foreground)] uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2" role="list">
              <li>
                <a
                  href={githubProfile.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  GitHub Profile
                </a>
              </li>
              <li>
                <a
                  href={githubProfile.htmlUrl + '?tab=repositories'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  All Repositories
                </a>
              </li>
              <li>
                <a
                  href="/rss.xml"
                  className="text-sm text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  RSS Feed
                </a>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  className="text-sm text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)] transition-colors"
                >
                  Sitemap
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--color-foreground)] uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2" role="list">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="text-sm text-[var(--color-foreground-subtle)]">
            © {currentYear} {githubProfile.name || githubProfile.login}. All rights reserved.
          </div>

          {/* Built with */}
          <div className="flex items-center gap-2 text-sm text-[var(--color-foreground-subtle)]">
            <span>Built with</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Icon name="heart" size={14} className="text-[var(--color-error)]" />
            </motion.span>
            <span>using React, TypeScript & TailwindCSS</span>
          </div>

          {/* Deploy badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--color-foreground-subtle)]">
              Deployed on
            </span>
            <a
              href="https://pages.cloudflare.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)] transition-colors"
              aria-label="Cloudflare Pages"
            >
              Cloudflare Pages
            </a>
          </div>
        </div>

        {/* Accessibility Statement */}
        <div className="py-4 border-t border-[var(--color-border)] text-center">
          <p className="text-xs text-[var(--color-foreground-subtle)]">
            This website is designed to be accessible to all users. If you encounter
            any barriers, please{' '}
            <a
              href="mailto:micheal.l.c.kinney@gmail.com?subject=Accessibility%20Issue"
              className="text-[var(--color-primary)] hover:underline"
            >
              let me know
            </a>
            .
          </p>
        </div>
      </Container>

      {/* Back to Top Button */}
      <BackToTopButton />
    </footer>
  );
}

export default Footer;