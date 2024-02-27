import { test, expect, type Page } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/what-is-new.html')
})

test.describe('cart test', () => {})
test('cadd item to cart', async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/what-is-new.html')
  await page.locator('li').filter({ hasText: 'Phoebe Zipper Sweatshirt As' }).getByRole('button').click()
  await page.getByRole('button', { name: 'Add to Cart' }).click()
  await page.getByLabel('XS').click()
  await page.getByLabel('Gray').click()
  await page.getByRole('button', { name: 'Add to Cart' }).click()
  await page.getByRole('link', { name: ' My Cart 1 1\nitems' }).click()
})
