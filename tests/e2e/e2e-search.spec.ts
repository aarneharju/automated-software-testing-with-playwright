import { test, expect} from "@playwright/test"

test.describe("Search", () => {
    test("Should find search results", async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/")
        await page.locator("#searchTerm").pressSequentially("bank")
        await page.keyboard.press("Enter")

        // Assertion with waitForSelector, fail will be indicated with a timeout
        await page.waitForSelector("li > a")

        // Assertion with expect toHaveCount
        const numberOfLinks = await page.locator("li > a")
        await expect(numberOfLinks).toHaveCount(2)
    })
})