// ============================================
// OpenPortfolio - Footer Component
// Light/Dark mode support
// ============================================

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { socialLinks, githubProfile } from '@/data/projects';
import { cn } from '@/lib/utils';

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        "fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full",
        "bg-indigo-500 text-white flex items-center justify-center",
        "hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-500/30",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-950 focus:ring-indigo-500",
        !isVisible && "pointer-events-none"
      )}
      aria-label="Back to top"
    >
      <Icon name="chevron-up" size={24} />
    </motion.button>
  );
}

function SocialIcon({ name, url }: { name: string; url: string }) {
  const iconMap: Record<string, string> = { github: 'github', twitter: 'twitter', linkedin: 'linkedin', mail: 'mail' };
  return (
    <a href={url} target="_blank" rel="noopener noreferrer"
      className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors"
      aria-label={`Follow on ${name}`}>
      <Icon name={iconMap[name] || 'globe'} size={20} />
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Affiliates', href: '#affiliates' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
      <Container size="lg">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center">
                <span className="text-lg font-bold text-white">M</span>
              </div>
              <span className="text-lg font-semibold text-zinc-900 dark:text-white">Micheal Kinney</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Full-Stack Developer specializing in AI/ML, React, TypeScript, Cloudflare.</p>
            <div className="flex items-center gap-3">
              {socialLinks.map((link) => <SocialIcon key={link.name} name={link.icon} url={link.url} />)}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href={githubProfile.htmlUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">GitHub Profile</a></li>
              <li><a href={githubProfile.htmlUrl + '?tab=repositories'} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">All Repositories</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-zinc-500 dark:text-zinc-500">© {year} {githubProfile.name || githubProfile.login}. All rights reserved.</div>
          <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500">
            <span>Built with</span>
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              <Icon name="heart" size={14} className="text-red-500" />
            </motion.span>
            <span>using React, TypeScript & TailwindCSS</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 dark:text-zinc-500">Deployed on</span>
            <a href="https://pages.cloudflare.com" target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-zinc-500 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">Cloudflare Pages</a>
          </div>
        </div>

        {/* Accessibility */}
        <div className="py-4 border-t border-zinc-200 dark:border-zinc-800 text-center">
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            This website is designed to be accessible to all users. If you encounter any barriers, please{' '}
            <a href="mailto:micheal.l.c.kinney@gmail.com?subject=Accessibility%20Issue" className="text-indigo-500 dark:text-indigo-400 hover:underline">let me know</a>.
          </p>
        </div>
      </Container>

      <BackToTopButton />
    </footer>
  );
}

export default Footer;
