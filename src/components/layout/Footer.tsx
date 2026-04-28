// ============================================
// OpenPortfolio - Footer Component
// Fixed - using LogoIcon
// ============================================

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { LogoIcon } from '@/components/ui/LogoIcon';
import { socialLinks } from '@/data/projects';
import { cn } from '@/lib/utils';

// ============================================
// Back To Top Button
// ============================================

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8, y: isVisible ? 0 : 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        "fixed bottom-6 right-6 z-40 w-14 h-14",
        "rounded-xl",
        "bg-gradient-to-br from-indigo-500 to-purple-600 text-white",
        "flex items-center justify-center",
        "shadow-xl shadow-indigo-500/40",
        "border border-white/20",
        "hover:shadow-2xl hover:shadow-indigo-500/60",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:focus:ring-offset-zinc-950 focus:ring-indigo-500",
        !isVisible && "pointer-events-none opacity-0"
      )}
      aria-label="Back to top"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 15-6-6-6 6"/>
      </svg>
    </motion.button>
  );
}

// ============================================
// Social Link Icon
// ============================================

function SocialIcon({ name, url, icon }: { name: string; url: string; icon: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
      aria-label={`Follow on ${name}`}
    >
      <Icon name={icon} size={18} />
    </a>
  );
}

// ============================================
// Main Footer
// ============================================

export function Footer() {
  return (
    <>
      <BackToTopButton />
      <footer className="relative bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
        <Container size="lg" className="py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo and Name */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <a href="#hero" aria-label="Back to top">
                <LogoIcon size={40} />
              </a>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Micheal L. C. Kinney</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => (
                <SocialIcon key={link.name} name={link.name} url={link.url} icon={link.icon} />
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
    </>
  );
}

export default Footer;
