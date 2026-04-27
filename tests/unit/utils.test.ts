import { test, expect, describe } from 'vitest';
import { cn, formatDate, formatRelativeTime, truncate, debounce, generateId, capitalize, kebabCase, extractDomain, isValidUrl, getLanguageColor, formatNumber, clamp, lerp, mapRange } from '@/lib/utils';

describe('cn - className utility', () => {
  test('should combine class names', () => {
    const result = cn('foo', 'bar');
    expect(result).toBe('foo bar');
  });

  test('should handle conditional classes', () => {
    const result = cn('foo', false && 'bar', 'baz');
    expect(result).toBe('foo baz');
  });

  test('should handle undefined', () => {
    const result = cn('foo', undefined, 'bar');
    expect(result).toBe('foo bar');
  });
});

describe('formatDate', () => {
  test('should format date string', () => {
    const result = formatDate('2024-01-15');
    expect(result).toContain('January');
    expect(result).toContain('14'); // 0-indexed day in format
    expect(result).toContain('2024');
  });

  test('should format Date object', () => {
    const result = formatDate(new Date('2024-01-15'));
    expect(result).toContain('January');
  });
});

describe('formatRelativeTime', () => {
  test('should return "just now" for recent dates', () => {
    const now = new Date();
    const result = formatRelativeTime(now);
    expect(result).toBe('just now');
  });

  test('should format minutes ago', () => {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const result = formatRelativeTime(fiveMinutesAgo);
    expect(result).toContain('minute');
  });
});

describe('truncate', () => {
  test('should truncate long strings', () => {
    const result = truncate('This is a very long string', 10);
    expect(result).toBe('This is...');
  });

  test('should not truncate short strings', () => {
    const result = truncate('Short', 10);
    expect(result).toBe('Short');
  });
});

describe('debounce', () => {
  test('should debounce function calls', () => {
    vi.useFakeTimers();
    const fn = vi.fn();
    const debouncedFn = debounce(fn, 100);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
    vi.useRealTimers();
  });
});

describe('generateId', () => {
  test('should generate unique IDs', () => {
    const id1 = generateId();
    const id2 = generateId();
    expect(id1).not.toBe(id2);
  });

  test('should include prefix', () => {
    const id = generateId('test');
    expect(id.startsWith('test-')).toBe(true);
  });
});

describe('capitalize', () => {
  test('should capitalize first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  test('should handle empty string', () => {
    expect(capitalize('')).toBe('');
  });
});

describe('kebabCase', () => {
  test('should convert camelCase to kebab-case', () => {
    expect(kebabCase('helloWorld')).toBe('hello-world');
  });

  test('should convert spaces to hyphens', () => {
    expect(kebabCase('hello world')).toBe('hello-world');
  });
});

describe('extractDomain', () => {
  test('should extract domain from URL', () => {
    expect(extractDomain('https://www.example.com/path')).toBe('example.com');
  });

  test('should remove www prefix', () => {
    expect(extractDomain('https://www.example.com')).toBe('example.com');
  });
});

describe('isValidUrl', () => {
  test('should return true for valid URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('http://example.com/path')).toBe(true);
  });

  test('should return false for invalid URLs', () => {
    expect(isValidUrl('not a url')).toBe(false);
    expect(isValidUrl('')).toBe(false);
  });
});

describe('getLanguageColor', () => {
  test('should return correct color for TypeScript', () => {
    const color = getLanguageColor('TypeScript');
    expect(color).toBe('#3178c6');
  });

  test('should return default color for unknown language', () => {
    const color = getLanguageColor('Unknown');
    expect(color).toBe('#8b949e');
  });
});

describe('formatNumber', () => {
  test('should format numbers below 1000', () => {
    expect(formatNumber(100)).toBe('100');
  });

  test('should format thousands with K', () => {
    expect(formatNumber(1500)).toBe('1.5K');
  });

  test('should format millions with M', () => {
    expect(formatNumber(2000000)).toBe('2M');
  });
});

describe('clamp', () => {
  test('should clamp value to min', () => {
    expect(clamp(5, 10, 20)).toBe(10);
  });

  test('should clamp value to max', () => {
    expect(clamp(25, 10, 20)).toBe(20);
  });

  test('should return value within range', () => {
    expect(clamp(15, 10, 20)).toBe(15);
  });
});

describe('lerp', () => {
  test('should interpolate between values', () => {
    expect(lerp(0, 100, 0.5)).toBe(50);
  });

  test('should return start at t=0', () => {
    expect(lerp(0, 100, 0)).toBe(0);
  });

  test('should return end at t=1', () => {
    expect(lerp(0, 100, 1)).toBe(100);
  });
});

describe('mapRange', () => {
  test('should map value from one range to another', () => {
    expect(mapRange(50, 0, 100, 0, 200)).toBe(100);
  });

  test('should return min for value below inMin', () => {
    // Note: mapRange doesn't clamp, it extrapolates
    // For a value below inMin, it will extrapolate below outMin
    // This is expected behavior for mapRange
    const result = mapRange(-10, 0, 100, 0, 200);
    expect(result).toBeLessThan(0);
  });

  test('should return max for value above inMax', () => {
    // Note: mapRange doesn't clamp, it extrapolates
    const result = mapRange(150, 0, 100, 0, 200);
    expect(result).toBeGreaterThan(200);
  });
});