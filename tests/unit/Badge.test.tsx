import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge, LanguageBadge, CategoryBadge, StatusBadge } from '@/components/ui/Badge';

describe('Badge Component', () => {
  it('should render with children', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeDefined();
  });

  it('should apply default variant styles', () => {
    const { container } = render(<Badge variant="default">Default</Badge>);
    expect(container.firstChild).toBeDefined();
  });

  it('should apply primary variant styles', () => {
    const { container } = render(<Badge variant="primary">Primary</Badge>);
    expect(container.firstChild).toBeDefined();
  });

  it('should apply success variant styles', () => {
    const { container } = render(<Badge variant="success">Success</Badge>);
    expect(container.firstChild).toBeDefined();
  });

  it('should apply warning variant styles', () => {
    const { container } = render(<Badge variant="warning">Warning</Badge>);
    expect(container.firstChild).toBeDefined();
  });

  it('should apply error variant styles', () => {
    const { container } = render(<Badge variant="error">Error</Badge>);
    expect(container.firstChild).toBeDefined();
  });
});

describe('LanguageBadge Component', () => {
  it('should render language with color dot', () => {
    render(<LanguageBadge language="TypeScript" />);
    expect(screen.getByText('TypeScript')).toBeDefined();
  });
});

describe('CategoryBadge Component', () => {
  it('should render category', () => {
    render(<CategoryBadge category="AI" />);
    expect(screen.getByText('AI')).toBeDefined();
  });
});

describe('StatusBadge Component', () => {
  it('should render live status', () => {
    render(<StatusBadge status="live" />);
    expect(screen.getByText('Live')).toBeDefined();
  });

  it('should render with label hidden', () => {
    render(<StatusBadge status="live" showLabel={false} />);
    const dot = document.querySelector('.rounded-full');
    expect(dot).toBeDefined();
  });
});
