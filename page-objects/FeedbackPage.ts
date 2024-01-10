import { expect, Page, Locator } from "playwright/test";

export class FeedbackPage {
    readonly page: Page
    readonly inputName: Locator
    readonly inputEmail: Locator
    readonly inputSubject: Locator
    readonly inputComment: Locator 
    readonly buttonClear: Locator
    readonly buttonSubmit: Locator
    readonly feedbackTitle: Locator

    constructor(page: Page) {
        this.page = page
        this.inputName = page.locator("#name")
        this.inputEmail = page.locator("#email")
        this.inputSubject = page.locator("#subject")
        this.inputComment = page.locator("#comment")
        this.buttonClear = page.locator("input[name=clear]")
        this.buttonSubmit = page.locator ("input[value='Send Message']")
        this.feedbackTitle = page.locator("#feedback-title")
    }

    async fillName(name: string) {
        await this.inputName.fill(name)
    }

    async fillEmail(email: string) {
        await this.inputEmail.fill(email)
    }

    async fillSubject(subject: string) {
        await this.inputSubject.fill(subject)
    }

    async fillComment(comment: string) {
        await this.inputComment.fill(comment)
    }

    async fillForm(name: string, email: string, subject: string, comment: string) {
        await this.fillName(name)
        await this.fillEmail(email)
        await this.fillSubject(subject)
        await this.fillComment(comment)
    }

    async clearForm() {
        await this.page.screenshot({ path: "screenshots/e2e-clear-form-screenshot-filled.png", fullPage: true})
        await this.buttonClear.click()

    }

    async submitForm() {
        await this.page.screenshot({ path: "screenshots/e2e-fill-and-submit-form-screenshot-filled.png", fullPage: true})
        await this.buttonSubmit.click()
        await this.page.screenshot({ path: "screenshots/e2e-clear-form-screenshot-cleared.png", fullPage: true})
    }

    async checkThatTheFeedbackFormHasBeenCleared() {
        await expect(this.inputName).toBeEmpty
        await expect(this.inputEmail).toBeEmpty
        await expect(this.inputSubject).toBeEmpty
        await expect(this.inputComment).toBeEmpty
    }

    async checkThatTheFormHasBeenSent() {
        await expect(this.feedbackTitle).toBeVisible
        await this.page.screenshot({ path: "screenshots/e2e-fill-and-submit-form-screenshot-sent.png"})
    }
}