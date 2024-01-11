import { expect, test } from "@playwright/test";

test.describe.parallel("API testing", () => {
    const baseURL = "https://reqres.in/api"

    test("Simple API test - Assert response status", async ({ request }) => {
        const response = await request.get(`${baseURL}/users/2`)
        expect(response.status()).toBe(200)

        const responseBody = await response.json()
        // console.log(responseBody);
    })

    test("Simple API test - Assert invalid endpoint",async ({ request }) => {
        const response = await request.get(`${baseURL}/users/invalid-endpoint`)
        expect(response.status()).toBe(404)
    })

    test("GET request - Get user detail",async ({ request }) => {
        const response = await request.get(`${baseURL}/users/3`)
        const responseBody = await response.json()

        expect(response.ok()).toBeTruthy()
        expect(responseBody.data.id).toBe(3)
        expect(responseBody.data.first_name).toContain("Emma")
        expect(responseBody.data.email).toBeTruthy()
        console.log(await response.json());
        
    })
})