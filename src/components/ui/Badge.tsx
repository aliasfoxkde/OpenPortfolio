// ============================================
// OpenPortfolio - Badge Component
// WCAG 2.5 AAA Compliant
// ============================================

import { forwardRef } from 'react';
import { cn, getLanguageColor } from '@/lib/utils';
import type { BadgeProps } from '@/lib/types';

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', isPill = true, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center font-medium transition-colors';

    const variants = {
      default: 'bg-[var(--color-background-elevated)] text-[var(--color-foreground-muted)] border border-[var(--color-border)]',
      primary: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20',
      secondary: 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20',
      success: 'bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/20',
      warning: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border border-[var(--color-warning)]/20',
      error: 'bg-[var(--color-error)]/10 text-[var(--color-error)] border border-[var(--color-error)]/20',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    };

    return (
      <span
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isPill && 'rounded-full',
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

/**
 * Language Badge - Shows language with colored dot
 */
interface LanguageBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  language: string;
  size?: 'sm' | 'md' | 'lg';
}

const LanguageBadge = forwardRef<HTMLSpanElement, LanguageBadgeProps>(
  ({ language, size = 'md', className, style, ...props }, ref) => {
    const color = getLanguageColor(language);
    
    const sizes = {
      sm: 'text-xs gap-1',
      md: 'text-sm gap-1.5',
      lg: 'text-base gap-2',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium text-[var(--color-foreground-muted)]',
          sizes[size],
          className
        )}
        {...props}
      >
        <span
          className="rounded-full"
          style={{
            width: size === 'sm' ? '8px' : size === 'md' ? '10px' : '12px',
            height: size === 'sm' ? '8px' : size === 'md' ? '10px' : '12px',
            backgroundColor: color,
          }}
          aria-hidden="true"
        />
        <span>{language}</span>
      </span>
    );
  }
);

LanguageBadge.displayName = 'LanguageBadge';

/**
 * Category Badge - Shows project category
 */
interface CategoryBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  category: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

const CategoryBadge = forwardRef<HTMLSpanElement, CategoryBadgeProps>(
  ({ category, color, size = 'md', className, ...props }, ref) => {
    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
      lg: 'px-3 py-1.5 text-base',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-medium rounded-full bg-[var(--color-background-elevated)] border border-[var(--color-border)]',
          sizes[size],
          className
        )}
        style={color ? { borderColor: color, color } : undefined}
        {...props}
      >
        {category}
      </span>
    );
  }
);

CategoryBadge.displayName = 'CategoryBadge';

/**
 * Status Badge - Shows project status (live, wip, deprecated)
 */
interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: 'live' | 'wip' | 'deprecated' | 'development' | 'archived';
  showLabel?: boolean;
}

const StatusBadge = forwardRef<HTMLSpanElement, StatusBadgeProps>(
  ({ status, showLabel = true, className, ...props }, ref) => {
    const statusConfig = {
      live: {
        color: 'bg-[var(--color-success)]',
        label: 'Live',
        textColor: 'text-[var(--color-success)]',
      },
      wip: {
        color: 'bg-[var(--color-warning)]',
        label: 'In Progress',
        textColor: 'text-[var(--color-warning)]',
      },
      deprecated: {
        color: 'bg-[var(--color-error)]',
        label: 'Deprecated',
        textColor: 'text-[var(--color-error)]',
      },
      development: {
        color: 'bg-[var(--color-info)]',
        label: 'In Dev',
        textColor: 'text-[var(--color-info)]',
      },
      archived: {
        color: 'bg-[var(--color-foreground-subtle)]',
        label: 'Archived',
        textColor: 'text-[var(--color-foreground-subtle)]',
      },
    };

    const config = statusConfig[status];

    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center gap-1.5 text-sm font-medium', config.textColor, className)}
        {...props}
      >
        <span
          className={cn('w-2 h-2 rounded-full animate-pulse', config.color)}
          aria-hidden="true"
        />
        {showLabel && <span>{config.label}</span>}
      </span>
    );
  }
);

StatusBadge.displayName = 'StatusBadge';

export { Badge, LanguageBadge, CategoryBadge, StatusBadge };
export type { BadgeProps };