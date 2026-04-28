// ============================================
// OpenPortfolio - Footer Component
// With LogoIcon
// ============================================

import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { LogoIcon } from '@/components/ui/LogoIcon';
import { socialLinks } from '@/data/projects';

// ============================================
// Main Footer
// ============================================

export function Footer() {
  return (
    <footer className="relative bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
      <Container size="lg" className="py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <a href="#hero" aria-label="Back to top">
              <LogoIcon size={40} />
            </a>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Micheal L. C. Kinney
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-indigo-500 hover:border-indigo-500 transition-colors"
                aria-label={`${link.name} profile`}
              >
                <Icon name={link.icon} size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-900 text-center">
          <p className="text-xs text-zinc-400 dark:text-zinc-600">
            © {new Date().getFullYear()} Micheal L. C. Kinney. Built with React, TailwindCSS, and Framer Motion.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
