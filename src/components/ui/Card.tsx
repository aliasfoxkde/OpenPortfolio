// ============================================
// OpenPortfolio - Card Component
// WCAG 2.5 AAA Compliant
// ============================================

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { CardProps } from '@/lib/types';

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', isFlippable = false, isFlipped = false, onFlip, children, ...props }, ref) => {
    const baseStyles =
      'relative rounded-xl border transition-all duration-300 overflow-hidden';

    const variants = {
      default: 'bg-[var(--color-background-alt)] border-[var(--color-border)] shadow-md',
      elevated: 'bg-[var(--color-background-elevated)] border-[var(--color-border)] shadow-xl',
      flat: 'bg-[var(--color-background-alt)] border-transparent',
      outline: 'bg-transparent border-[var(--color-primary)]/30 hover:border-[var(--color-primary)]',
    };

    if (isFlippable) {
      return (
        <div
          className={cn('perspective-1000', className)}
          onClick={onFlip}
          role="button"
          tabIndex={0}
          aria-pressed={isFlipped}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onFlip?.();
            }
          }}
        >
          <div
            ref={ref}
            className={cn(
              baseStyles,
              variants[variant],
              'w-full h-full min-h-[280px] cursor-pointer transform-style-3d transition-transform duration-500',
              isFlipped && 'rotate-y-180'
            )}
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
            {...props}
          >
            {/* Front */}
            <div
              className="absolute inset-0 backface-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              {Array.isArray(children) ? children[0] : children}
            </div>
            {/* Back */}
            <div
              className="absolute inset-0 backface-hidden rotate-y-180"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              {Array.isArray(children) ? children[1] : children}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Card Header
 */
const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-4 pb-0', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

/**
 * Card Content
 */
const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-4', className)}
      {...props}
    />
  )
);
CardContent.displayName = 'CardContent';

/**
 * Card Footer
 */
const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-4 pt-0 flex items-center gap-2', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardContent, CardFooter };
export type { CardProps };