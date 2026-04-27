// ============================================
// OpenPortfolio - Affiliates Section
// Affiliate links, sponsors, and donations
// WCAG 2.5 AAA Compliant
// ============================================

import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { affiliateLinks } from '@/data/projects';
import { cn } from '@/lib/utils';

// ============================================
// Affiliate Card Component
// ============================================

interface AffiliateCardProps {
  affiliate: (typeof affiliateLinks)[number];
  index: number;
}

function AffiliateCard({ affiliate, index }: AffiliateCardProps) {
  return (
    <motion.a
      href={affiliate.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className={cn(
        'group relative flex items-start gap-4 p-6 rounded-xl',
        'bg-[var(--color-background-alt)] border border-[var(--color-border)]',
        'hover:border-[var(--color-primary)] transition-all duration-300',
        'cursor-pointer'
      )}
      aria-label={`${affiliate.name}${affiliate.isSponsored ? ' (Sponsored)' : ''} - Opens in new tab`}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-[var(--color-background-elevated)] flex items-center justify-center shrink-0 group-hover:bg-[var(--color-primary)]/10 transition-colors">
        <Icon name={affiliate.icon} size={24} className="text-[var(--color-primary)]" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-[var(--color-foreground)] group-hover:text-[var(--color-primary)] transition-colors">
            {affiliate.name}
          </h4>
          {affiliate.isSponsored && (
            <Badge variant="secondary" size="sm">
              Sponsored
            </Badge>
          )}
        </div>
        <p className="text-sm text-[var(--color-foreground-muted)] line-clamp-2">
          {affiliate.description}
        </p>
      </div>

      {/* Arrow */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <Icon name="arrow-up-right" size={16} className="text-[var(--color-primary)]" />
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />
    </motion.a>
  );
}

// ============================================
// Sponsorship Section Component
// ============================================

function SponsorshipSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5 }}
      className="p-8 rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10 border border-[var(--color-primary)]/20 text-center"
    >
      <motion.div
        className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Icon name="heart" size={32} className="text-[var(--color-primary)]" />
      </motion.div>

      <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-3">
        Support My Work
      </h3>
      <p className="text-[var(--color-foreground-muted)] max-w-xl mx-auto mb-6">
        If you find my projects useful, consider supporting their development.
        Your contribution helps keep these projects free and open source.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Button
          variant="primary"
          size="lg"
          leftIcon={<Icon name="github" size={20} />}
          onClick={() => window.open('https://github.com/sponsors/aliasfoxkde', '_blank', 'noopener')}
          aria-label="Support on GitHub Sponsors"
        >
          GitHub Sponsors
        </Button>
        <Button
          variant="outline"
          size="lg"
          leftIcon={<Icon name="coffee" size={20} />}
          onClick={() => window.open('https://ko-fi.com/aliasfoxkde', '_blank', 'noopener')}
          aria-label="Buy me a coffee on Ko-fi"
        >
          Buy Me a Coffee
        </Button>
      </div>
    </motion.div>
  );
}

// ============================================
// Disclosure Component
// ============================================

function AffiliateDisclosure() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-8 p-4 rounded-lg bg-[var(--color-background-elevated)] border border-[var(--color-border)]"
    >
      <div className="flex items-start gap-3">
        <Icon name="info" size={20} className="text-[var(--color-foreground-muted)] shrink-0 mt-0.5" />
        <div className="text-sm text-[var(--color-foreground-muted)]">
          <p className="font-medium text-[var(--color-foreground)] mb-1">Affiliate Disclosure</p>
          <p>
            This page contains affiliate links. If you make a purchase through these links,
            I may earn a small commission at no extra cost to you. I only recommend products
            and services that I use and trust.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// Main Affiliates Section Component
// ============================================

export function AffiliatesSection() {
  return (
    <section
      id="affiliates"
      className="relative min-h-screen py-20 bg-[var(--color-background)]"
      aria-label="Affiliates and sponsors"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-accent) 1px, transparent 0)`,
          backgroundSize: '50px 50px',
        }}
        aria-hidden="true"
      />

      <Container size="lg">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Partners & Tools</span>
          </h2>
          <p className="text-lg text-[var(--color-foreground-muted)] max-w-2xl mx-auto">
            Products, services, and tools I use and recommend. These help me build
            better projects.
          </p>
        </motion.div>

        {/* Affiliate Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {affiliateLinks.map((affiliate, index) => (
            <AffiliateCard key={affiliate.id} affiliate={affiliate} index={index} />
          ))}
        </div>

        {/* Sponsorship Section */}
        <SponsorshipSection />

        {/* Disclosure */}
        <AffiliateDisclosure />

        {/* Additional Partner CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-[var(--color-foreground-muted)] mb-4">
            Want to partner with me?
          </p>
          <a
            href="mailto:micheal.l.c.kinney@gmail.com?subject=Partnership%20Inquiry"
            className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline"
          >
            <Icon name="mail" size={16} />
            <span>Get in touch</span>
          </a>
        </motion.div>
      </Container>
    </section>
  );
}

export default AffiliatesSection;