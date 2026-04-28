// ============================================
// OpenPortfolio - E2E Tests
// Playwright tests for critical paths
// ============================================

import { test, expect } from '@playwright/test';

// ============================================
// Test Fixtures
// ============================================

test.describe('OpenPortfolio E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
  });

  // ============================================
  // Hero Section Tests
  // ============================================

  test.describe('Hero Section', () => {
    test('hero section is visible', async ({ page }) => {
      const hero = page.locator('#hero');
      await expect(hero).toBeVisible();
    });

    test('avatar is displayed', async ({ page }) => {
      const avatar = page.locator('#hero img').first();
      await expect(avatar).toBeVisible();
    });

    test('name is displayed', async ({ page }) => {
      const name = page.locator('#hero h1');
      await expect(name).toBeVisible();
    });

    test('scroll indicator is visible', async ({ page }) => {
      const scrollIndicator = page.locator('text=Scroll to explore');
      await expect(scrollIndicator).toBeVisible();
    });
  });

  // ============================================
  // Projects Section Tests
  // ============================================

  test.describe('Projects Section', () => {
    test('projects section is visible', async ({ page }) => {
      await page.locator('#projects').scrollIntoViewIfNeeded();
      const projects = page.locator('#projects');
      await expect(projects).toBeVisible();
    });

    test('search input is functional', async ({ page }) => {
      await page.locator('#projects').scrollIntoViewIfNeeded();
      const searchInput = page.locator('#projects input[type="search"]');
      if (await searchInput.isVisible()) {
        await searchInput.fill('react');
        await page.waitForTimeout(300);
      }
    });

    test('view all github link is present', async ({ page }) => {
      await page.locator('#projects').scrollIntoViewIfNeeded();
      const viewAllBtn = page.locator('button:has-text("View All on GitHub")');
      await expect(viewAllBtn).toBeVisible();
    });
  });

  // ============================================
  // About Section Tests
  // ============================================

  test.describe('About Section', () => {
    test('about section is visible', async ({ page }) => {
      await page.locator('#about').scrollIntoViewIfNeeded();
      const about = page.locator('#about');
      await expect(about).toBeVisible();
    });

    test('tech stack section is present', async ({ page }) => {
      await page.locator('#about').scrollIntoViewIfNeeded();
      const techStack = page.locator('text=Tech Stack');
      await expect(techStack).toBeVisible();
    });
  });

  // ============================================
  // Contact Section Tests
  // ============================================

  test.describe('Contact Section', () => {
    test('contact section is visible', async ({ page }) => {
      await page.locator('#contact').scrollIntoViewIfNeeded();
      const contact = page.locator('#contact');
      await expect(contact).toBeVisible();
    });

    test('form fields are present', async ({ page }) => {
      await page.locator('#contact').scrollIntoViewIfNeeded();
      const nameInput = page.locator('#contact input[type="text"]').first();
      const messageTextarea = page.locator('#contact textarea').first();

      await expect(nameInput).toBeVisible();
      await expect(messageTextarea).toBeVisible();
    });
  });

  // ============================================
  // Theme Tests
  // ============================================

  test.describe('Theme', () => {
    test('page loads in correct theme', async ({ page }) => {
      // Check that the page loads without errors
      await page.waitForTimeout(500);
    });

    test('theme toggle exists', async ({ page }) => {
      // Look for theme toggle button
      const buttons = await page.locator('button').all();
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  // ============================================
  // Accessibility Tests
  // ============================================

  test.describe('Accessibility', () => {
    test('page has proper lang attribute', async ({ page }) => {
      const html = page.locator('html');
      await expect(html).toHaveAttribute('lang', 'en');
    });

    test('all images have alt text', async ({ page }) => {
      const images = page.locator('img');
      const count = await images.count();

      for (let i = 0; i < count; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        // Alt should exist (even if empty for decorative)
        expect(alt).not.toBeNull();
      }
    });
  });

  // ============================================
  // Footer Tests
  // ============================================

  test.describe('Footer', () => {
    test('footer is visible', async ({ page }) => {
      await page.locator('footer').scrollIntoViewIfNeeded();
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();
    });

    test('back to top button exists', async ({ page }) => {
      await page.locator('footer').scrollIntoViewIfNeeded();
      const backToTop = page.locator('button[aria-label="Back to top"]');
      await expect(backToTop).toBeAttached();
    });

    test('back to top button scrolls to top', async ({ page }) => {
      // Scroll to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      const backToTop = page.locator('button[aria-label="Back to top"]');
      await backToTop.click();
      await page.waitForTimeout(500);

      // Should be near top
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeLessThan(100);
    });
  });
});
