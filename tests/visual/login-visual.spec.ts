import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe.parallel("Visual regression test for login", () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
    })
    
    test("Visual regression test of a failed login", async ({ page }) => {
        await loginPage.login("invalid username", "invalid password")
        await loginPage.doAVisualRegressionCheckThatTheLoginFailed()
    })

    test("Visual regression test of a successful login", async ({ page }) => {
        await loginPage.login("username", "password")
        await loginPage.doAVisualRegressionCheckThatTheLoginWasSuccessful()
    })
})