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
        // console.log(await response.json());
        
    })

    test("POST request - Create new user",  async ({ request }) => {
        const response = await request.post(`${baseURL}/users`, {
            data: {
                first_name: "Pekka",
                last_name: "Puupää"
            }
        })

        const responseBody = await response.json()
        // console.log(responseBody);

        expect(response.ok()).toBeTruthy()
        expect(responseBody.first_name).toContain("Pekka")
        expect(responseBody.id).toBeTruthy()
        expect(responseBody.createdAt).toBeTruthy()
    })

    test("POST request - Login successful", async ({ request }) => {
        const response = await request.post(`${baseURL}/login`, {
            data: {
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
        })

        // console.log(await response.json());

        const responseBody = await response.json()

        expect(response.ok()).toBeTruthy()
        expect(responseBody.token).toBeTruthy()
    })

    test("POST request - Login failed",async ({ request }) => {
        const response = await request.post(`${baseURL}/login`,{
            data: {
                "email": "jabba@dabba.doo",
                "password": "dabba"
            }
        })

        // console.log(await response.json());
        
        const responseBody = await response.json()
        expect(responseBody.token).not.toBeTruthy()
    })
})