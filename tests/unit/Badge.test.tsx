import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge, LanguageBadge, CategoryBadge, StatusBadge } from '@/components/ui/Badge';

describe('Badge Component', () => {
  test('should render text', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  test('should apply default variant styles', () => {
    const { container } = render(<Badge>Default</Badge>);
    expect(container.firstChild).toHaveClass('bg-[var(--color-background-elevated)]');
  });

  test('should apply primary variant styles', () => {
    const { container } = render(<Badge variant="primary">Primary</Badge>);
    expect(container.firstChild).toHaveClass('bg-[var(--color-primary)]/10');
  });

  test('should apply success variant styles', () => {
    const { container } = render(<Badge variant="success">Success</Badge>);
    expect(container.firstChild).toHaveClass('bg-[var(--color-success)]/10');
  });

  test('should apply warning variant styles', () => {
    const { container } = render(<Badge variant="warning">Warning</Badge>);
    expect(container.firstChild).toHaveClass('bg-[var(--color-warning)]/10');
  });

  test('should apply error variant styles', () => {
    const { container } = render(<Badge variant="error">Error</Badge>);
    expect(container.firstChild).toHaveClass('bg-[var(--color-error)]/10');
  });
});

describe('LanguageBadge Component', () => {
  test('should render language name', () => {
    render(<LanguageBadge language="TypeScript" />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  test('should render colored dot', () => {
    const { container } = render(<LanguageBadge language="TypeScript" />);
    const dot = container.querySelector('span.rounded-full');
    expect(dot).toBeInTheDocument();
  });

  test('should apply size classes', () => {
    const { container: sm } = render(<LanguageBadge language="JavaScript" size="sm" />);
    const { container: lg } = render(<LanguageBadge language="JavaScript" size="lg" />);
    expect(sm.firstChild).toHaveClass('text-xs');
    expect(lg.firstChild).toHaveClass('text-base');
  });
});

describe('CategoryBadge Component', () => {
  test('should render category name', () => {
    render(<CategoryBadge category="AI & ML" />);
    expect(screen.getByText('AI & ML')).toBeInTheDocument();
  });

  test('should apply custom color', () => {
    const { container } = render(<CategoryBadge category="Tools" color="#22c55e" />);
    expect(container.firstChild).toHaveStyle({ color: '#22c55e' });
  });
});

describe('StatusBadge Component', () => {
  test('should render live status', () => {
    render(<StatusBadge status="live" />);
    expect(screen.getByText('Live')).toBeInTheDocument();
  });

  test('should render in-progress status', () => {
    render(<StatusBadge status="wip" />);
    expect(screen.getByText('In Progress')).toBeInTheDocument();
  });

  test('should render deprecated status', () => {
    render(<StatusBadge status="deprecated" />);
    expect(screen.getByText('Deprecated')).toBeInTheDocument();
  });

  test('should hide label when showLabel is false', () => {
    render(<StatusBadge status="live" showLabel={false} />);
    expect(screen.queryByText('Live')).not.toBeInTheDocument();
  });

  test('should render animated dot', () => {
    const { container } = render(<StatusBadge status="live" />);
    const dot = container.querySelector('.animate-pulse');
    expect(dot).toBeInTheDocument();
  });
});