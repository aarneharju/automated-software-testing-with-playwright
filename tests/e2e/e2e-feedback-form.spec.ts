import { test, expect} from '@playwright/test'

test.describe.parallel("Feedback form", async ()=> {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/")
        await page.locator("#feedback").click()
        await page.waitForURL("http://zero.webappsecurity.com/feedback.html")
        await page.locator("#name").fill("test name")
        await page.locator("#email").fill("test.email.address@email.com")
        await page.locator("#subject").fill("test subject")
        await page.locator("#comment").fill("test comment")
    })

    test("Clear form", async ({ page }) => {
        await page.screenshot({ path: "screenshots/e2e-clear-form-screenshot-filled.png", fullPage: true})
        await page.locator("input[name=clear]").click()
        await page.screenshot({ path: "screenshots/e2e-clear-form-screenshot-cleared.png", fullPage: true})

        const nameInput = await page.locator("#name")
        await expect(nameInput).toBeEmpty()
        const emailInput = await page.locator("#email")
        await expect(emailInput).toBeEmpty()
        const subjectInput = await page.locator("#subject")
        await expect(subjectInput).toBeEmpty()
        const commentInput = await page.locator("#comment")
        await expect(commentInput).toBeEmpty()
    })

    test("Fill and submit form",async ({ page }) => {
        await page.screenshot({ path: "screenshots/e2e-fill-and-submit-form-screenshot-filled.png", fullPage: true})
        await page.locator("input[value='Send Message']").click()
        await page.waitForURL("http://zero.webappsecurity.com/sendFeedback.html")
        await page.waitForSelector("#feedback-title") // alternate check
        await page.screenshot({ path: "screenshots/e2e-fill-and-submit-form-screenshot-sent.png"})
    })
})