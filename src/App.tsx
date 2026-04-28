// ============================================
// OpenPortfolio - Main App Component
// ============================================

import { Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { AffiliatesSection } from '@/components/sections/AffiliatesSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ThemeProvider } from '@/lib/theme';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';

// ============================================
// Loading Skeleton
// ============================================

function LoadingSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    </div>
  );
}

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
        "bg-indigo-500 text-white flex items-center justify-center",
        "shadow-lg shadow-indigo-500/30",
        "hover:bg-indigo-600",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:focus:ring-offset-zinc-950 focus:ring-indigo-500",
        "transition-all duration-300",
        !isVisible && "pointer-events-none"
      )}
      aria-label="Back to top"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 15-6-6-6 6"/>
      </svg>
    </motion.button>
  );
}

// ============================================
// Main App Component
// ============================================

function AppContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-500 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main id="main" role="main">
        <Suspense fallback={<LoadingSkeleton />}>
          <HeroSection />
        </Suspense>
        <Suspense fallback={<LoadingSkeleton />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<LoadingSkeleton />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<LoadingSkeleton />}>
          <AffiliatesSection />
        </Suspense>
        <Suspense fallback={<LoadingSkeleton />}>
          <ContactSection />
        </Suspense>
      </main>

      {/* Back to Top Button */}
      <BackToTopButton />

      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
