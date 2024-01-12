import { test, expect } from "@playwright/test"
import { LoginPage } from "../../page-objects/LoginPage"
import { HomePage } from "../../page-objects/HomePage"

test.describe("Login / logout flow", () => {
    let loginPage: LoginPage
    let homePage: HomePage

    // Before hook
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        await homePage.visit()
    })
    
    // Negative scenario
    test("Negative scenario for login", async ({ page }) => {
        await homePage.clickOnSignIn()
        await loginPage.login("invalid username", "invalid password")
        await loginPage.assertErrorMessage()
    })

    // Positive scenario + logout
    test("Positive scenario for login + logout", async ({ page }) => {
        await homePage.clickOnSignIn()
        await loginPage.login("username", "password")

        // SSL certificate error fix (chrome or firefox will throw error because of missing sertificate, edge=webkit doesn't. If you click back, you can access the site and are logged in however.)
        await page.goto("http://zero.webappsecurity.com/bank/account-summary.html")

        const elementToConfirm = await page.locator("#account_summary_tab")
        await expect(elementToConfirm).toBeVisible()

        await page.goto("http://zero.webappsecurity.com/logout.html")
        await expect(page).toHaveURL("http://zero.webappsecurity.com/index.html")
    })
})