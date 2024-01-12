import { test } from '@playwright/test'

test.describe("Tips & tricks section", () => {
    test("TestInfo object",async ({ page }, testInfo) => {
        await page.goto("https://www.example.com")
        console.log(testInfo)
    })
})