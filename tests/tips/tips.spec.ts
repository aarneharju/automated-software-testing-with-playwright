import { test } from '@playwright/test'

test.describe("Tips & tricks section", () => {
    test("TestInfo object",async ({ page }, testInfo) => {
        await page.goto("https://www.example.com")
        console.log(`This is the config file that was used and it was printed from the testInfo object: ${testInfo.config.configFile}`)
    })

    test("Test skip browser",async ({ page, browserName}) => {
        test.skip(browserName === "chromium", "Feature not ready in Chrome browser")
        await page.goto("https://www.example.com")
    })

    test("Test fixme annotation",async ({ page, browserName}) => {
        test.fixme(browserName === "chromium", "Test is not stable, needs revision")
        await page.goto("https://www.example.com")
    })
})