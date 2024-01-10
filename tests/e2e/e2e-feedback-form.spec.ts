import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { FeedbackPage } from '../../page-objects/FeedbackPage'

test.describe.parallel("Feedback form", ()=> {
    let homePage: HomePage
    let feedbackPage: FeedbackPage
  
    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        feedbackPage = new FeedbackPage(page)
        
        await homePage.visit()
        await homePage.goToFeedbackForm()
        await feedbackPage.fillForm("test name", "test email", "test subject", "test comment")
        // await feedbackPage.fillName("test name")
        // await feedbackPage.fillEmail("test email")
        // await feedbackPage.fillSubject("test subject")
        // await feedbackPage.fillComment("test comment")
    })

    test("Clear form", async ({ page }) => {
        await feedbackPage.clearForm()
        await feedbackPage.checkThatTheFeedbackFormHasBeenCleared()
    })

    test("Fill and submit form",async ({ page }) => {
        await feedbackPage.submitForm()
        await feedbackPage.checkThatTheFormHasBeenSent()
    })
})