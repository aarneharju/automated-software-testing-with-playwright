import { test, expect } from "playwright/test";

test.describe.parallel("Visual regression testing example", () => {
    test("Full page snapshot", async ({ page }) => {
        await page.goto("https://www.example.com")
        expect(await page.screenshot()).toMatchSnapshot("homepage.png")
    })

    test("Single element snapshot", async ({ page }) => {
        await page.goto("https://www.example.com")
        const elementToTakeScreenshotOf = await page.$("h1")
        if(elementToTakeScreenshotOf) {
            expect(await elementToTakeScreenshotOf.screenshot()).toMatchSnapshot("homepage-title.png")
        }
    })
})