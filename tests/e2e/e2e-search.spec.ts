import { test, expect} from "@playwright/test"

test.describe("Search", () => {
    test("Should find search results", async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/")
        await page.locator("#searchTerm").pressSequentially("bank")
        await page.keyboard.press("Enter")

        await page.waitForSelector("li > a")
    })
})