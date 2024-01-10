import { expect, Locator, Page } from "playwright/test";

export class TransferFundsPage {
    readonly page: Page
    readonly fromAccountId: Locator
    readonly toAccountId: Locator
    readonly amount: Locator
    readonly description: Locator
    readonly submit: Locator
    readonly headerToVerifySuccessfulTransfer: Locator
    readonly elementTransactionConfirmed: Locator

    constructor(page: Page) {
        this.page = page
        this.fromAccountId = page.locator("#tf_fromAccountId")
        this.toAccountId = page.locator("#tf_toAccountId")
        this.amount = page.locator("#tf_amount")
        this.description = page.locator("#tf_description")
        this.submit = page.locator("#btn_submit")
        this.headerToVerifySuccessfulTransfer = page.locator("h2.board-header")
        this.elementTransactionConfirmed = page.locator(".alert-success")
    }

    async transferFundsFromSavingsToCheckingAccount() {
        await this.fromAccountId.selectOption("3")
        await this.toAccountId.selectOption("2")
        await this.amount.fill("550")
        await this.description.fill("Transfer description")
        await this.submit.click()
        
    }
    async checkThatTheTransferIsOkAndYouGetForwardedToTheVerificationPage() {
        await expect(this.headerToVerifySuccessfulTransfer).toContainText("Verify")
        this.submitVerifiedTransfer()
    }

    async checkThatTheTransferWasConfirmed() {
        await expect(this.elementTransactionConfirmed).toContainText("You successfully submitted your transaction")
    }
    
    async submitVerifiedTransfer() {
        await this.submit.click()
    }
}   