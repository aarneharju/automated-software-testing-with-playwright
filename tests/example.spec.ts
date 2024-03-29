import {test, expect} from '@playwright/test'
import { loadHomePage, asserTitle } from '../helpers'

test('Simple basic test', async ({page}) => {
  await page.goto('https://www.example.com')
  const pageTitle = await page.locator('h1')
  await expect(pageTitle).toContainText('Example Domain')
})

test("Clicking on Elements @myTag", async ({page}) => {
  await page.goto("http://zero.webappsecurity.com/index.html")
  await page.click("#signin_button")
  await page.click("text=Sign in")

  const errorMessage = await page.locator(".alert-error")
  await expect(errorMessage).toContainText("Login and/or password are wrong.")
})

test.skip("Selectors", async ({page}) => {
  
  // text
  await page.click("text=some text")

  // css selectors
  await page.click("button")
  await page.click("#id-name")
  await page.click(".class-name")

  // only visible css selector
  await page.click(".submit-button:visible")

  // combinations
  await page.click(".username .first") // playwright will click an element that has class username and class of first

  // xpath
  await page.click("//button")

})

test.describe.parallel.only("My first test suite", () => {
  test("Working with inputs",async ({page}) => {
    await page.goto("http://zero.webappsecurity.com/index.html")
    await page.click("#signin_button")
  
    await page.fill("#user_login", "incorrect_username")
    await page.fill("#user_password", "incorrect_password")
    await page.click("text=Sign in")
  
    const errorMessage = await page.locator(".alert-error")
    await expect(errorMessage).toContainText("Login and/or password are wrong.")
  })
  
  test("Assertions @myTag", async ({page}) => {
    await page.goto("https://example.com/")
    await expect(page).toHaveURL("https://example.com/")
    await expect(page).toHaveTitle("Example Domain")
    
    const element = await page.locator("h1")
    await expect(element).toBeVisible()
    await expect(element).toContainText("Example Domain")
    await expect(element).toHaveCount(1)
    
    const nonExistingElemet = await page.locator("h5")
    await expect(nonExistingElemet).not.toBeVisible()
  })  
})

test.describe.parallel.only("Hooks", () => {
  test.beforeEach(async ({page}) => {
    await page.goto("https://example.com/")
  })
  
  test("Screenshot", async ({page}) => {
    // Step 1. Load website
    // await page.goto("https://example.com/")
  
    // Step 2. Take screenshot of full page
    await page.screenshot({ path: "screenshots/screenshot.png", fullPage: true})
  })
  
  test("Single element screenshot", async ({page}) => {
    // await page.goto("https://example.com/")
    const element = await page.$("h1")
    if(element) {
      await element.screenshot({path: "screenshots/single_element_screenshot.png"})
    }
  })
})

test.only("Custom helper functions",async ({page}) => {
  await loadHomePage(page)
  //await page.pause()
  await asserTitle(page)
})