import { expect, Locator, Page } from "playwright/test";

export class HomePage {
    readonly page: Page
    readonly signinButton: Locator
    readonly searchBox: Locator

    constructor(page: Page) {
        this.page = page
        this.signinButton = page.locator("#signin_button")
        this.searchBox = page.locator("#searchTerm")
    }

    async visit() {
        await this.page.goto("http://zero.webappsecurity.com/")
    }

    async clickOnSignIn() {
        await this.signinButton.click()
    }

    async searchFor(phrase: string) {
        await this.searchBox.pressSequentially(phrase)
        await this.page.keyboard.press("Enter")
    }

}