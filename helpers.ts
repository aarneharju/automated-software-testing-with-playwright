export async function loadHomePage(page) { // remember to pass the page-object
    await page.goto("https://www.example.com")
}

export async function asserTitle(page) {
    await page.waitForSelector("h1")
}