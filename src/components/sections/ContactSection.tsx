// ============================================
// OpenPortfolio - Contact Section
// Fixed for Tailwind v4
// ============================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';

function FormField({ label, error, type = 'text', name, value, onChange, placeholder, required }: {
  label: string; error?: string; type?: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; placeholder?: string; required?: boolean;
}) {
  const id = `input-${name}`;
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-zinc-300">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={cn(
          "w-full px-4 py-3 rounded-lg bg-zinc-900 border text-white placeholder:text-zinc-600",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950",
          error ? "border-red-500 focus:ring-red-500" : "border-zinc-800 focus:ring-indigo-500"
        )}
        aria-invalid={error ? "true" : undefined}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

function TextArea({ label, error, name, value, onChange, placeholder, required, rows = 5 }: {
  label: string; error?: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; placeholder?: string; required?: boolean; rows?: number;
}) {
  const id = `input-${name}`;
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-zinc-300">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={cn(
          "w-full px-4 py-3 rounded-lg bg-zinc-900 border text-white placeholder:text-zinc-600 resize-none",
          "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950",
          error ? "border-red-500 focus:ring-red-500" : "border-zinc-800 focus:ring-indigo-500"
        )}
        aria-invalid={error ? "true" : undefined}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = { name: '', email: '', message: '' };
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    await new Promise((r) => setTimeout(r, 1500));
    setStatus('success');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-20 bg-zinc-950" aria-label="Contact">
      <Container size="lg">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Get in Touch</span>
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">Have a question or want to work together? Fill out the form below.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-8">
              {status === 'success' ? (
                <div className="flex flex-col items-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                    <Icon name="check-circle" size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                  <p className="text-zinc-400">Thank you for reaching out. I'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <FormField label="Name" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required error={errors.name} />
                  <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your.email@example.com" required error={errors.email} />
                  <FormField label="Subject" name="subject" value={form.subject} onChange={handleChange} placeholder="What's this about?" />
                  <TextArea label="Message" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." required error={errors.message} />
                  <Button type="submit" variant="primary" size="lg" isLoading={status === 'loading'} className="w-full">
                    {status !== 'loading' && <Icon name="send" size={20} />}
                    <span>Send Message</span>
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-8">
              <h3 className="text-lg font-semibold text-white mb-4">Connect with me</h3>
              <div className="space-y-4">
                {[
                  { name: 'GitHub', url: 'https://github.com/aliasfoxkde', icon: 'github', username: 'aliasfoxkde' },
                  { name: 'Email', url: 'mailto:micheal.l.c.kinney@gmail.com', icon: 'mail', username: 'micheal.l.c.kinney@gmail.com' },
                ].map((link) => (
                  <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                      <Icon name={link.icon} size={20} className="text-indigo-500" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">{link.name}</div>
                      <div className="text-sm text-zinc-500">{link.username}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 p-8">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-zinc-400">
                  <Icon name="clock" size={20} className="text-indigo-500" />
                  <span>Response time: Usually within 24-48 hours</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400">
                  <Icon name="globe" size={20} className="text-indigo-500" />
                  <span>Available for remote work worldwide</span>
                </div>
                <div className="flex items-center gap-3 text-zinc-400">
                  <Icon name="zap" size={20} className="text-indigo-500" />
                  <span>Open to collaboration and new projects</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default ContactSection;
