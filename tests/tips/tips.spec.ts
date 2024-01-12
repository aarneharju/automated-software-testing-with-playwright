import { test } from '@playwright/test'

test.describe("Tips & tricks section", () => {
    test("TestInfo object",async ({ page }, testInfo) => {
        await page.goto("https://www.example.com")
        console.log(`This is the config file that was used and it was printed from the testInfo object: ${testInfo.config.configFile}`)
    })

    test("Test Skip Browser",async ({ page, browserName}) => {
        test.skip(browserName === "chromium", "Feature not ready in Chrome browser")
        await page.goto("https://www.example.com")
    })
})