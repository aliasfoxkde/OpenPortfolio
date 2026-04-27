// ============================================
// OpenPortfolio - Test Setup
// WCAG 2.5 AAA Compliant Testing
// ============================================

import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((_query: string) => ({
    matches: false,
    media: _query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(
    _callback: IntersectionObserverCallback,
    _options?: IntersectionObserverInit
  ) {}

  observe(_target: Element): void {
    // Do nothing for tests
  }

  unobserve(_target: Element): void {
    // Do nothing for tests
  }

  disconnect(): void {
    // Do nothing for tests
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

window.IntersectionObserver = MockIntersectionObserver;

// Mock ResizeObserver
class MockResizeObserver implements ResizeObserver {
  constructor(_callback: ResizeObserverCallback) {}

  observe(_target: Element): void {
    // Do nothing for tests
  }

  unobserve(_target: Element): void {
    // Do nothing for tests
  }

  disconnect(): void {
    // Do nothing for tests
  }
}

window.ResizeObserver = MockResizeObserver;

// Mock scrollTo
window.scrollTo = vi.fn();

// Mock scrollY
Object.defineProperty(window, 'scrollY', { value: 0 });
Object.defineProperty(window, 'scrollX', { value: 0 });

// Mock getBoundingClientRect
Element.prototype.getBoundingClientRect = vi.fn(() => ({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  toJSON: () => '',
}));

// Mock requestAnimationFrame
global.requestAnimationFrame = (callback: FrameRequestCallback) => setTimeout(callback, 0);
global.cancelAnimationFrame = (id: number) => clearTimeout(id);

// Mock WebSocket
class MockWebSocket {
  constructor(_url: string) {}

  close(): void {}

  send(_data: string | ArrayBuffer | Blob): void {}
}

global.WebSocket = MockWebSocket as unknown as typeof WebSocket;

// Reset all mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
});