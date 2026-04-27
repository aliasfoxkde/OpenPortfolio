// ============================================
// OpenPortfolio - Affiliates Section
// Fixed for Tailwind v4
// ============================================

import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { affiliateLinks } from '@/data/projects';


function AffiliateCard({ affiliate, index }: { affiliate: typeof affiliateLinks[0]; index: number }) {
  return (
    <motion.a
      href={affiliate.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative flex items-start gap-4 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-indigo-500/50 transition-all duration-300 cursor-pointer"
    >
      <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/10 transition-colors">
        <Icon name={affiliate.icon} size={24} className="text-indigo-500" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">{affiliate.name}</h4>
          {affiliate.isSponsored && <Badge variant="secondary" size="sm">Sponsored</Badge>}
        </div>
        <p className="text-sm text-zinc-400 line-clamp-2">{affiliate.description}</p>
      </div>
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <Icon name="arrow-up-right" size={16} className="text-indigo-500" />
      </div>
    </motion.a>
  );
}

function SponsorshipSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-8 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 border border-indigo-500/20 text-center"
    >
      <motion.div className="w-16 h-16 mx-auto mb-6 rounded-full bg-indigo-500/20 flex items-center justify-center" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
        <Icon name="heart" size={32} className="text-indigo-500" />
      </motion.div>
      <h3 className="text-2xl font-bold text-white mb-3">Support My Work</h3>
      <p className="text-zinc-400 max-w-xl mx-auto mb-6">If you find my projects useful, consider supporting their development. Your contribution helps keep these projects free and open source.</p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button variant="primary" size="lg" leftIcon={<Icon name="github" size={20} />} onClick={() => window.open('https://github.com/sponsors/aliasfoxkde', '_blank', 'noopener')}>
          GitHub Sponsors
        </Button>
        <Button variant="outline" size="lg" leftIcon={<Icon name="coffee" size={20} />} onClick={() => window.open('https://ko-fi.com/aliasfoxkde', '_blank', 'noopener')}>
          Buy Me a Coffee
        </Button>
      </div>
    </motion.div>
  );
}

function Disclosure() {
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-8 p-4 rounded-lg bg-zinc-900 border border-zinc-800">
      <div className="flex items-start gap-3">
        <Icon name="info" size={20} className="text-zinc-500 shrink-0 mt-0.5" />
        <div className="text-sm text-zinc-500">
          <p className="font-medium text-white mb-1">Affiliate Disclosure</p>
          <p>This page contains affiliate links. If you make a purchase through these links, I may earn a small commission at no extra cost to you.</p>
        </div>
      </div>
    </motion.div>
  );
}

export function AffiliatesSection() {
  return (
    <section id="affiliates" className="relative py-20 bg-zinc-950" aria-label="Affiliates">
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #06b6d4 1px, transparent 0)', backgroundSize: '50px 50px' }} />

      <Container size="lg">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Partners & Tools</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">Products, services, and tools I use and recommend.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {affiliateLinks.map((affiliate, i) => <AffiliateCard key={affiliate.id} affiliate={affiliate} index={i} />)}
        </div>

        <SponsorshipSection />
        <Disclosure />

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center">
          <p className="text-zinc-400 mb-4">Want to partner with me?</p>
          <a href="mailto:micheal.l.c.kinney@gmail.com?subject=Partnership%20Inquiry" className="inline-flex items-center gap-2 text-indigo-500 hover:underline">
            <Icon name="mail" size={16} />
            <span>Get in touch</span>
          </a>
        </motion.div>
      </Container>
    </section>
  );
}

export default AffiliatesSection;
