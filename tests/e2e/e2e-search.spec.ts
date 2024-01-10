import { test, expect } from "@playwright/test"
import { HomePage } from "../../page-objects/HomePage"

test.describe("Search", () => {
    test("Should find search results", async ({ page }) => {
        const homePage = new HomePage(page)

        await homePage.visit()
        await homePage.searchFor("bank")

        // Assertion with waitForSelector, fail will be indicated with a timeout
        await page.waitForSelector("li > a")

        // Assertion with expect toHaveCount
        const numberOfLinks = await page.locator("li > a")
        await expect(numberOfLinks).toHaveCount(2)
    })
})