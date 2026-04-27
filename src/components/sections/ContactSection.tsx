// ============================================
// OpenPortfolio - Contact Section
// Contact form with validation
// WCAG 2.5 AAA Compliant
// ============================================

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Container';
import { socialLinks } from '@/data/projects';
import { cn } from '@/lib/utils';

// ============================================
// Form Input Component
// ============================================

interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'as'> {
  label: string;
  error?: string;
  hint?: string;
  as?: 'input';
}

interface FormTextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'as'> {
  label: string;
  error?: string;
  hint?: string;
  as: 'textarea';
}

function FormInput({ label, error, hint, id, className, ...props }: Omit<FormInputProps, 'as'>) {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const hasError = Boolean(error);

  return (
    <div className="space-y-1">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-[var(--color-foreground)]"
      >
        {label}
        {props.required && <span className="text-[var(--color-error)] ml-1">*</span>}
      </label>
      <input
        id={inputId}
        className={cn(
          'w-full px-4 py-3 rounded-lg bg-[var(--color-background-alt)] border text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-subtle)]',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-background)]',
          hasError
            ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]'
            : 'border-[var(--color-border)] focus:ring-[var(--color-primary)]',
          className
        )}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />
      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-xs text-[var(--color-foreground-subtle)]">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-[var(--color-error)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function FormTextarea({ label, error, hint, id, className, ...props }: FormTextareaProps) {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const hasError = Boolean(error);

  return (
    <div className="space-y-1">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-[var(--color-foreground)]"
      >
        {label}
        {props.required && <span className="text-[var(--color-error)] ml-1">*</span>}
      </label>
      <textarea
        id={inputId}
        className={cn(
          'w-full px-4 py-3 rounded-lg bg-[var(--color-background-alt)] border text-[var(--color-foreground)] placeholder:text-[var(--color-foreground-subtle)]',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--color-background)]',
          hasError
            ? 'border-[var(--color-error)] focus:ring-[var(--color-error)]'
            : 'border-[var(--color-border)] focus:ring-[var(--color-primary)]',
          className
        )}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        {...props}
      />
      {hint && !error && (
        <p id={`${inputId}-hint`} className="text-xs text-[var(--color-foreground-subtle)]">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-[var(--color-error)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ============================================
// Success Message Component
// ============================================

function SuccessMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center py-12"
    >
      <motion.div
        className="w-16 h-16 rounded-full bg-[var(--color-success)]/20 flex items-center justify-center mb-4"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Icon name="check-circle" size={32} className="text-[var(--color-success)]" />
      </motion.div>
      <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2">
        Message Sent!
      </h3>
      <p className="text-[var(--color-foreground-muted)]">
        Thank you for reaching out. I'll get back to you soon.
      </p>
    </motion.div>
  );
}

// ============================================
// Error Message Component
// ============================================

function ErrorMessage({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center text-center py-12"
    >
      <div className="w-16 h-16 rounded-full bg-[var(--color-error)]/20 flex items-center justify-center mb-4">
        <Icon name="x-circle" size={32} className="text-[var(--color-error)]" />
      </div>
      <h3 className="text-xl font-semibold text-[var(--color-foreground)] mb-2">
        Something went wrong
      </h3>
      <p className="text-[var(--color-foreground-muted)] mb-4">{message}</p>
      <Button variant="outline" onClick={onRetry}>
        Try Again
      </Button>
    </motion.div>
  );
}

// ============================================
// Main Contact Section Component
// ============================================

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Honeypot check
  if (formState.honeypot) {
    // Bot detected - silently reject
    return <SuccessMessage />;
  }

  const validateForm = (): boolean => {
    const newErrors = {
      name: '',
      email: '',
      message: '',
    };

    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formState.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setStatus('loading');

    try {
      // Simulate API call - in production, this would be a real API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate success (in production, handle actual API response)
      setStatus('success');
      setFormState({ name: '', email: '', subject: '', message: '', honeypot: '' });
    } catch {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    // Clear error on change
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen py-20 bg-[var(--color-background-alt)]"
      aria-label="Contact me"
    >
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
            <span className="gradient-text">Get in Touch</span>
          </h2>
          <p className="text-lg text-[var(--color-foreground-muted)] max-w-2xl mx-auto">
            Have a question or want to work together? Fill out the form below and
            I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-[var(--color-background)] rounded-2xl border border-[var(--color-border)] p-8">
              {status === 'success' ? (
                <SuccessMessage />
              ) : status === 'error' ? (
                <ErrorMessage
                  message={errorMessage}
                  onRetry={() => setStatus('idle')}
                />
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  noValidate
                  aria-label="Contact form"
                >
                  {/* Honeypot field - hidden from users */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formState.honeypot}
                    onChange={handleInputChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <FormInput
                    label="Name"
                    name="name"
                    type="text"
                    value={formState.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    placeholder="Your name"
                    required
                    autoComplete="name"
                  />

                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    placeholder="your.email@example.com"
                    required
                    autoComplete="email"
                  />

                  <FormInput
                    label="Subject"
                    name="subject"
                    type="text"
                    value={formState.subject}
                    onChange={handleInputChange}
                    placeholder="What's this about?"
                    autoComplete="off"
                  />

                  <FormTextarea
                    as="textarea"
                    label="Message"
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    error={errors.message}
                    placeholder="Tell me about your project or question..."
                    required
                    rows={5}
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={status === 'loading'}
                    className="w-full"
                    aria-label="Send message"
                  >
                    {status !== 'loading' && <Icon name="send" size={20} />}
                    <span>Send Message</span>
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Social Links */}
            <div className="bg-[var(--color-background)] rounded-2xl border border-[var(--color-border)] p-8">
              <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">
                Connect with me
              </h3>
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg bg-[var(--color-background-alt)] hover:bg-[var(--color-background-elevated)] transition-colors group"
                    aria-label={`${link.name}${link.username ? ` - ${link.username}` : ''}`}
                  >
                    <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors">
                      <Icon name={link.icon} size={20} className="text-[var(--color-primary)]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-[var(--color-foreground)]">
                        {link.name}
                      </div>
                      {link.username && (
                        <div className="text-sm text-[var(--color-foreground-muted)]">
                          {link.username}
                        </div>
                      )}
                    </div>
                    <Icon
                      name="external"
                      size={16}
                      className="text-[var(--color-foreground-subtle)] group-hover:text-[var(--color-primary)] transition-colors"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-[var(--color-background)] rounded-2xl border border-[var(--color-border)] p-8">
              <h3 className="text-lg font-semibold text-[var(--color-foreground)] mb-4">
                Quick Info
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[var(--color-foreground-muted)]">
                  <Icon name="clock" size={20} className="text-[var(--color-primary)]" />
                  <span>Response time: Usually within 24-48 hours</span>
                </div>
                <div className="flex items-center gap-3 text-[var(--color-foreground-muted)]">
                  <Icon name="globe" size={20} className="text-[var(--color-primary)]" />
                  <span>Available for remote work worldwide</span>
                </div>
                <div className="flex items-center gap-3 text-[var(--color-foreground-muted)]">
                  <Icon name="zap" size={20} className="text-[var(--color-primary)]" />
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