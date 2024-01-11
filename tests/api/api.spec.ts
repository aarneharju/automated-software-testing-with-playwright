import { expect, test } from "@playwright/test";

test.describe.parallel("API testing", () => {
    const baseURL = "https://reqres.in/api"

    test("Simple API test - Assert response status", async ({ request }) => {
        const response = await request.get(`${baseURL}/users/2`)
        expect(response.status()).toBe(200)
    })

    test("Simple API test - Assert invalid endpoint",async ({ request }) => {
        const response = await request.get(`${baseURL}/users/invalid-endpoint`)
        expect(response.status()).toBe(404)
    })
})