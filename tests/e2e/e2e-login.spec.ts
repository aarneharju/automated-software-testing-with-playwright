import { test, expect } from "@playwright/test"

test.describe.parallel("Login / logout flow", () => {
    // Before hook
    test.beforeEach(async ({ page }) => {
        await page.goto("http://zero.webappsecurity.com/")
    })

    // Negative scenario
    test("Negative scenario for login", async ({ page }) => {
        await page.click("#signin_button")
        await page.locator("#user_login").fill("invalid username")
        await page.locator("#user_password").fill("invalid password")
        await page.click("text=Sign in")

        const errorMessage = await page.locator(".alert-error")
        await expect(errorMessage).toContainText("Login and/or password are wrong.")
    })

    // Positive scenario + logout
    test("Positive scenario for login + logout", async ({ page }) => {
        await page.click("#signin_button")
        await page.locator("#user_login").fill("username")
        await page.locator("#user_password").fill("password")
        await page.click("text=Sign in")

        // SSL certificate error fix (chrome or firefox will throw error because of missing sertificate, edge doesn't. If you click back, you can access the site and are logged in however.)
        await page.goto("http://zero.webappsecurity.com/bank/account-summary.html")

        const elementToConfirm = await page.locator("#account_summary_tab")
        await expect(elementToConfirm).toBeVisible()

        await page.goto("http://zero.webappsecurity.com/logout.html")
        await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html")
    })
})