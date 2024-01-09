import { test, expect } from "@playwright/test"

test.describe("Transfer funds", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/")
        await page.click("#signin_button")
        await page.locator("#user_login").fill("username")
        await page.locator("#user_password").fill("password")
        await page.click("text=Sign in")

        // SSL certificate error fix (chrome or firefox will throw error because of missing sertificate, edge doesn't. If you click back, you can access the site and are logged in however.)
        await page.goto("http://zero.webappsecurity.com/bank/account-summary.html")
    })

    test("Transfer funds", async ({ page }) => {
         await page.locator("#transfer_funds_tab").click()
         await page.locator("#tf_fromAccountId").selectOption("3")
         await page.locator("#tf_toAccountId").selectOption("2")
         await page.locator("#tf_amount").fill("550")
         await page.locator("#tf_description").fill("Transfer description")
         await page.locator("#btn_submit").click()

         const elementVerificationHeader = await page.locator("h2.board-header")
         await expect(elementVerificationHeader).toContainText("Verify")
         await page.locator("#btn_submit").click()

         const elementTransactionConfirmed = await page.locator(".alert-success")
         await expect(elementTransactionConfirmed).toContainText("You successfully submitted your transaction")
    })
})