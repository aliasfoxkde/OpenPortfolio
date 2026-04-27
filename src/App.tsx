// ============================================
// OpenPortfolio - Main App Component
// ============================================

import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { AffiliatesSection } from '@/components/sections/AffiliatesSection';
import { ContactSection } from '@/components/sections/ContactSection';
import '@/styles/globals.css';

// ============================================
// Loading Skeleton
// ============================================

function LoadingSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
        <p className="text-[var(--color-foreground-muted)]">Loading...</p>
      </div>
    </div>
  );
}

// ============================================
// Main App Component
// ============================================

function App() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-primary)] focus:text-[var(--color-primary-foreground)] focus:rounded-lg"
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;