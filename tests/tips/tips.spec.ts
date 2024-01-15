import { expect, test } from '@playwright/test'
import { getRandomNumber, getRandomString } from '../../utils/data-helpers'

test.describe.parallel("Tips & tricks section", () => {
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

    // Parametrized tests
    const people = ["Kim", "Sonja", "Raja"]
    for (const name of people) {
        test(`Running test for ${name}`,async ({ page }) => {
            await page.goto("http://zero.webappsecurity.com/")
            await page.locator("#searchTerm").fill(name)
            await page.waitForTimeout(3000)
        })
    }

    test("Mouse movement", async ({ page }) => {
        await page.goto("https://codepen.io/Rahulive/pen/RwWYmVY")
        await page.waitForTimeout(500)
        await page.mouse.move(100, 600, {steps: 50})
        await page.waitForTimeout(500)
        await page.mouse.move(600, 600, {steps: 50})
        await page.waitForTimeout(500)
        await page.mouse.move(100, 600, {steps: 50})
        await page.waitForTimeout(500)
        await page.mouse.move(600, 600, {steps: 50})
        await page.waitForTimeout(500)
    })

    test("Multiple tabs inside one browser",async ({ browser }) => {
        const context = await browser.newContext()
        const page1 = await context.newPage()
        const page2 = await context.newPage()
        const page3 = await context.newPage()
        await page1.goto("https://www.google.com")
        await page2.goto("https://www.youtube.com")
        await page3.goto("https://www.twitch.tv")
        await page1.waitForTimeout(5000)
    })

    test("Save webpage as pdf",async ({ page }) => {
        await page.goto("https://store.steampowered.com")
        // await page.waitForURL("https://store.steampowered.com")
        await page.waitForTimeout(7000)
        await page.emulateMedia({ media: "screen"})
        await page.pdf({ path: "pdf/steam-site.pdf"})
    })

    test("Get random number",async () => {
        const randomNumber = await getRandomNumber()
        console.log(randomNumber)
    })

    test("Get random string",async () => {
        const randomString = await getRandomString()
        console.log(randomString);
        
    })
})