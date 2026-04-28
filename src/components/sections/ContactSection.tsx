// ============================================
// OpenPortfolio - Contact Section
// Enhanced with better styling
// ============================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';

// ============================================
// Social Links
// ============================================

const socialLinks = [
  { name: 'GitHub', icon: 'github', url: 'https://github.com/aliasfoxkde', color: 'hover:text-white hover:bg-zinc-900 dark:hover:bg-white dark:hover:text-zinc-900' },
  { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com/aliasfoxkde', color: 'hover:text-sky-500 hover:bg-sky-500/10' },
  { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/in/aliasfoxkde', color: 'hover:text-blue-600 hover:bg-blue-600/10' },
  { name: 'Email', icon: 'mail', url: 'mailto:hello@cyopsys.com', color: 'hover:text-red-500 hover:bg-red-500/10' },
];

// ============================================
// Contact Form
// ============================================

interface FormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
}

function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Message must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-8 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/5 dark:via-purple-500/5 dark:to-pink-500/5 border border-indigo-200 dark:border-indigo-800"
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
          <Icon name="check" size={32} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Message Sent!</h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">Thanks for reaching out. I'll get back to you soon.</p>
        <Button variant="outline" onClick={() => setSubmitted(false)}>Send Another</Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
            errors.name ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800'
          }`}
          placeholder="Your name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
            errors.email ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800'
          }`}
          placeholder="your.email@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>

      {/* Project Type */}
      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Project Type
        </label>
        <select
          id="projectType"
          value={formData.projectType}
          onChange={(e) => handleChange('projectType', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors ${
            errors.projectType ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800'
          }`}
        >
          <option value="">Select a project type</option>
          <option value="web">Web Application</option>
          <option value="ai">AI/ML Application</option>
          <option value="api">API Development</option>
          <option value="cli">CLI Tool</option>
          <option value="open-source">Open Source Contribution</option>
          <option value="consulting">Consulting</option>
          <option value="other">Other</option>
        </select>
        {errors.projectType && <p className="mt-1 text-sm text-red-500">{errors.projectType}</p>}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors resize-none ${
            errors.message ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800'
          }`}
          placeholder="Tell me about your project..."
        />
        {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        className="w-full shadow-lg shadow-indigo-500/30"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}

// ============================================
// Quick Contact Cards
// ============================================

function QuickContact() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Quick Connect</h3>
      <div className="grid grid-cols-2 gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 ${link.color} transition-all duration-200 hover:border-transparent hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-white/5`}
          >
            <Icon name={link.icon} size={20} />
            <span className="font-medium">{link.name}</span>
          </a>
        ))}
      </div>

      {/* Response Time */}
      <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/5 dark:to-purple-500/5 border border-indigo-200 dark:border-indigo-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-500/20">
            <Icon name="clock" size={18} className="text-indigo-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-white">Response Time</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Usually within 24 hours</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Main Contact Section
// ============================================

export function ContactSection() {
  return (
    <section id="contact" className="relative py-24 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />

      <Container size="lg" className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Get In Touch</span>
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Have a project in mind? Let's build something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="p-8 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-black/5 dark:shadow-white/5">
              <ContactForm />
            </div>
          </motion.div>

          {/* Quick Contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <QuickContact />

            {/* Fun element */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-white/20">
                  <Icon name="sparkles" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Open for Projects</h3>
                  <p className="text-sm text-white/80">Available for freelance work</p>
                </div>
              </div>
              <p className="text-sm text-white/90">
                I'm currently available for AI integrations, web applications, developer tools, and open source collaborations.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default ContactSection;
