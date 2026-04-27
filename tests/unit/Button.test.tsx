import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button Component', () => {
  test('should render with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  test('should apply primary variant styles', () => {
    const { container } = render(<Button variant="primary">Primary</Button>);
    expect(container.firstChild).toHaveClass('bg-[var(--color-primary)]');
  });

  test('should apply secondary variant styles', () => {
    const { container } = render(<Button variant="secondary">Secondary</Button>);
    expect(container.firstChild).toHaveClass('bg-[var(--color-background-alt)]');
  });

  test('should apply outline variant styles', () => {
    const { container } = render(<Button variant="outline">Outline</Button>);
    expect(container.firstChild).toHaveClass('border-2');
  });

  test('should apply ghost variant styles', () => {
    const { container } = render(<Button variant="ghost">Ghost</Button>);
    expect(container.firstChild).toHaveClass('text-[var(--color-foreground)]');
  });

  test('should apply size classes', () => {
    const { container: sm } = render(<Button size="sm">Small</Button>);
    expect(sm.firstChild).toHaveClass('h-8');

    const { container: lg } = render(<Button size="lg">Large</Button>);
    expect(lg.firstChild).toHaveClass('h-12');
  });

  test('should show loading state', () => {
    render(<Button isLoading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toBeDisabled();
  });

  test('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  test('should have accessible label when loading', () => {
    render(<Button isLoading>Submit</Button>);
    expect(screen.getByText('Loading', { selector: '.sr-only' })).toBeInTheDocument();
  });

  test('should render left icon', () => {
    render(<Button leftIcon={<span data-testid="icon">✦</span>}>With Icon</Button>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  test('should render right icon', () => {
    render(<Button rightIcon={<span data-testid="icon">✦</span>}>With Icon</Button>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  test('should handle click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole('button');
    await button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

describe('Button Accessibility', () => {
  test('should have accessible name', () => {
    render(<Button>Accessible Button</Button>);
    expect(screen.getByRole('button', { name: 'Accessible Button' })).toBeInTheDocument();
  });

  test('should indicate disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  test('should indicate loading state', () => {
    render(<Button isLoading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-busy', 'true');
  });
});