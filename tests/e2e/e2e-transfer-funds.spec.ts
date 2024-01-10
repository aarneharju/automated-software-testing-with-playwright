import { test } from "@playwright/test"
import { HomePage } from "../../page-objects/HomePage"
import { LoginPage } from "../../page-objects/LoginPage"
import { Navbar } from "../../page-objects/Navbar"
import { TransferFundsPage } from "../../page-objects/TrasferFundsPage"

test.describe("Transfer funds", () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let navBar: Navbar
    let transferFundsPage: TransferFundsPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        navBar = new Navbar(page)
        transferFundsPage = new TransferFundsPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login("username", "password")
    })

    test("Transfer funds", async ({ page }) => {
        await navBar.goToPage("Transfer Funds")
        await transferFundsPage.transferFundsFromSavingsToCheckingAccount()

        await transferFundsPage.checkThatTheTransferIsOkAndYouGetForwardedToTheVerificationPage()
        await transferFundsPage.checkThatTheTransferWasConfirmed()
    })
})