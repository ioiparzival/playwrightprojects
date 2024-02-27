import { test, expect, type Page } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("https://magento.softwaretestingboard.com/")
})

test.describe("main page test", () => {
  test("should have title", async ({ page }) => {
    expect(await page.title()).toBe("Home Page")
  })

  test("Is menu bar visible", async ({ page }) => {
    let menuBar = [
      {
        "What's New": "a#ui-id-3",
        Women: "a#ui-id-4",
        Men: " a#ui-id-5",
        Kids: "a#ui-id-6",
      },
    ]
    await page.click("a#ui-id-3")
    await page.click("a#ui-id-4")
    await page.click("a#ui-id-5")
    await page.click("a#ui-id-6")
  })

  test("Woman bar", async ({ page }) => {
    let menuOptionsTops = ["Jackets", "Hoodies & Sweatshirts", "Tees", "Bras & Tanks"]
    await expect(page.getByRole("menuitem", { name: "Tops" })).toBeHidden()
    await expect(page.getByRole("menuitem", { name: "Bottoms" })).toBeHidden()
    await page.getByRole("menuitem", { name: "Women" }).hover()
    await expect(page.getByRole("menuitem", { name: "Tops" })).toBeVisible()
    await expect(page.getByRole("menuitem", { name: "Bottoms" })).toBeVisible()
    await page.getByRole("menuitem", { name: "Tops" }).hover()
  })

  test("footer is visible", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Search Terms" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Privacy and Cookie Policy" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Advanced Search" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Orders and Returns" })).toBeVisible()
  })

  test("Search Terms page", async ({ page }) => {
    await page.getByRole("link", { name: "Search Terms" }).click()
    await expect(page.url()).toContain("/search/term/popular/")
  })
  test("Privacy and cookie page", async ({ page }) => {
    await page.getByRole("link", { name: "Privacy and Cookie Policy" }).click()
    await expect(page.url()).toContain("privacy-policy-cookie-restriction-mode")
  })
  test("Advanced search page", async ({ page }) => {
    await page.getByRole("link", { name: "Advanced Search" }).click()
    await expect(page.url()).toContain("/catalogsearch/advanced/")
  })
  test("Orders and Returns", async ({ page }) => {
    await page.getByRole("link", { name: "Orders and Returns" }).click()
    await expect(page.url()).toContain("sales/guest/form/")
  })

  test("Promo block", async ({ page }) => {
    await expect(page.getByRole("link", { name: "New Luma Yoga Collection Get" })).toBeVisible()
    await expect(page.getByRole("link", { name: "20% OFF Luma pants when you" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Even more ways to mix and" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Take it from Erin Luma" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Science meets performance" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Twice around, twice as nice" })).toBeVisible()
  })
})
