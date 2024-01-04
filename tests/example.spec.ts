import {test, expect} from '@playwright/test'

test('Simple basic test', async ({page}) => {
  await page.goto('https://www.example.com');
  const pageTitle = await page.locator('h1')
  await expect(pageTitle).toContainText('Example Domain')
})

test("Clicking on Elements", async ({page}) => {
  await page.goto("http://zero.webappsecurity.com/index.html")
  // await page.click()
})