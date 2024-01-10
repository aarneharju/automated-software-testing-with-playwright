import { test, expect } from "@playwright/test"
import { HomePage } from "../../page-objects/HomePage"
import { LoginPage } from "../../page-objects/LoginPage"

test.describe("Transfer funds", () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login("username", "password")
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