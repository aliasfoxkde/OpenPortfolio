// ============================================
// OpenPortfolio - Container Component
// WCAG 2.5 AAA Compliant
// ============================================

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer';
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'lg', as: Component = 'div', children, ...props }, ref) => {
    const sizes = {
      sm: 'max-w-3xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      full: 'max-w-full',
    };

    return (
      <Component
        ref={ref}
        className={cn(
          'mx-auto w-full px-4 sm:px-6 lg:px-8',
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Container.displayName = 'Container';

/**
 * Section Container - Full height section with centered content
 */
interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  centered?: boolean;
}

const SectionContainer = forwardRef<HTMLDivElement, SectionContainerProps>(
  ({ className, centered = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'min-h-screen w-full',
          centered && 'flex flex-col items-center justify-center',
          className
        )}
        {...props}
      >
        <div className="w-full">{children}</div>
      </div>
    );
  }
);

SectionContainer.displayName = 'SectionContainer';

export { Container, SectionContainer };
export type { ContainerProps, SectionContainerProps };