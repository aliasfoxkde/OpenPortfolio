// ============================================
// OpenPortfolio - Badge Component
// Fixed for Tailwind v4
// ============================================

import { forwardRef } from 'react';
import { cn, getLanguageColor } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  isPill?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', isPill = true, children, ...props }, ref) => {
    const base = 'inline-flex items-center font-medium transition-colors';
    const variants = {
      default: 'bg-zinc-800 text-zinc-400 border border-zinc-700',
      primary: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
      secondary: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
      success: 'bg-green-500/10 text-green-400 border border-green-500/20',
      warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
      error: 'bg-red-500/10 text-red-400 border border-red-500/20',
    };
    const sizes = { sm: 'px-2 py-0.5 text-xs', md: 'px-2.5 py-1 text-sm', lg: 'px-3 py-1.5 text-base' };

    return (
      <span ref={ref} className={cn(base, variants[variant], sizes[size], isPill && 'rounded-full', className)} {...props}>
        {children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';

interface LanguageBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  language: string;
  size?: 'sm' | 'md' | 'lg';
}

const LanguageBadge = forwardRef<HTMLSpanElement, LanguageBadgeProps>(
  ({ language, size = 'md', className, ...props }, ref) => {
    const color = getLanguageColor(language);
    const sizes = { sm: 'text-xs gap-1', md: 'text-sm gap-1.5', lg: 'text-base gap-2' };

    return (
      <span ref={ref} className={cn('inline-flex items-center font-medium text-zinc-500', sizes[size], className)} {...props}>
        <span className="rounded-full" style={{ width: size === 'sm' ? '8px' : size === 'md' ? '10px' : '12px', height: size === 'sm' ? '8px' : size === 'md' ? '10px' : '12px', backgroundColor: color }} />
        <span>{language}</span>
      </span>
    );
  }
);
LanguageBadge.displayName = 'LanguageBadge';

interface CategoryBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  category: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

const CategoryBadge = forwardRef<HTMLSpanElement, CategoryBadgeProps>(
  ({ category, color, size = 'md', className, ...props }, ref) => {
    const sizes = { sm: 'px-2 py-0.5 text-xs', md: 'px-2.5 py-1 text-sm', lg: 'px-3 py-1.5 text-base' };

    return (
      <span ref={ref} className={cn('inline-flex items-center font-medium rounded-full bg-zinc-800 border border-zinc-700', sizes[size], className)} style={color ? { borderColor: color, color } : undefined} {...props}>
        {category}
      </span>
    );
  }
);
CategoryBadge.displayName = 'CategoryBadge';

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: 'live' | 'wip' | 'deprecated' | 'development' | 'archived';
  showLabel?: boolean;
}

const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, showLabel = true, className, ...props }, ref) => {
    const config = {
      live: { color: 'bg-green-500', label: 'Live', textColor: 'text-green-400' },
      wip: { color: 'bg-amber-500', label: 'In Progress', textColor: 'text-amber-400' },
      deprecated: { color: 'bg-red-500', label: 'Deprecated', textColor: 'text-red-400' },
      development: { color: 'bg-blue-500', label: 'In Dev', textColor: 'text-blue-400' },
      archived: { color: 'bg-zinc-500', label: 'Archived', textColor: 'text-zinc-400' },
    };
    const c = config[status];

    return (
      <span ref={ref} className={cn('inline-flex items-center gap-1.5 text-sm font-medium', c.textColor, className)} {...props}>
        <span className={cn('w-2 h-2 rounded-full animate-pulse', c.color)} />
        {showLabel && <span>{c.label}</span>}
      </span>
    );
  }
);
StatusBadge.displayName = 'StatusBadge';

export { Badge, LanguageBadge, CategoryBadge, StatusBadge };
