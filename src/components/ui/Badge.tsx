// ============================================
// OpenPortfolio - Badge Component
// No animate-pulse, clean styling
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
    const base = 'inline-flex items-center font-medium';
    const variants = {
      default: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300',
      primary: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
      secondary: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
      success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
      warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
      error: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
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
    const dotSize = size === 'sm' ? '6px' : size === 'md' ? '8px' : '10px';
    const sizes = { sm: 'text-xs gap-1.5', md: 'text-sm gap-2', lg: 'text-base gap-2' };

    return (
      <span ref={ref} className={cn('inline-flex items-center font-medium text-zinc-600 dark:text-zinc-400', sizes[size], className)} {...props}>
        <span className="rounded-full flex-shrink-0" style={{ width: dotSize, height: dotSize, backgroundColor: color }} />
        <span>{language}</span>
      </span>
    );
  }
);
LanguageBadge.displayName = 'LanguageBadge';

interface CategoryBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  category: string;
  size?: 'sm' | 'md' | 'lg';
}

const CategoryBadge = forwardRef<HTMLSpanElement, CategoryBadgeProps>(
  ({ category, size = 'md', className, ...props }, ref) => {
    const sizes = { sm: 'px-2 py-0.5 text-xs', md: 'px-2.5 py-1 text-sm', lg: 'px-3 py-1.5 text-base' };

    return (
      <span ref={ref} className={cn('inline-flex items-center font-medium rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300', sizes[size], className)} {...props}>
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
      live: { color: 'bg-green-500', label: 'Live', textColor: 'text-green-600 dark:text-green-400' },
      wip: { color: 'bg-amber-500', label: 'In Progress', textColor: 'text-amber-600 dark:text-amber-400' },
      deprecated: { color: 'bg-red-500', label: 'Deprecated', textColor: 'text-red-600 dark:text-red-400' },
      development: { color: 'bg-blue-500', label: 'In Dev', textColor: 'text-blue-600 dark:text-blue-400' },
      archived: { color: 'bg-zinc-500', label: 'Archived', textColor: 'text-zinc-600 dark:text-zinc-400' },
    };
    const c = config[status];

    return (
      <span ref={ref} className={cn('inline-flex items-center gap-1.5 text-sm font-medium', c.textColor, className)} {...props}>
        <span className={cn('w-2 h-2 rounded-full', c.color)} />
        {showLabel && <span>{c.label}</span>}
      </span>
    );
  }
);
StatusBadge.displayName = 'StatusBadge';

export { Badge, LanguageBadge, CategoryBadge, StatusBadge };
