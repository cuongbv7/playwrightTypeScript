import { test, expect, request } from "@playwright/test";
import ApiUtils from "./utils/apiUtils";



const credentialInfor = {
    userEmail: "cuongbv7@gmail.com",
    userPassword: "Linhdan@2018"
}

const fakePayloadOrders = { data: [], message: "No Orders" };

test.describe("api testing ", () => {
    let token: string;

    test.beforeAll(async () => {
        const apicontext = await request.newContext();
        const apiRequest = new ApiUtils(apicontext);
        token = await apiRequest.getToken(credentialInfor);
    })

    test("by pass login step ", async ({ page }) => {
        await page.addInitScript((value) => {

            window.localStorage.setItem("token", value);
        }, token)

        await page.goto("https://rahulshettyacademy.com/client", {
            waitUntil: "networkidle"
        })
        const listItems = await page.locator(".card-body h5 b").allTextContents();
        for await (const item of listItems) {
            console.log(item)
        }

    }
    )


    test("api intercept ", async ({ page }) => {
        await page.addInitScript((value) => {
            window.localStorage.setItem("token", value);
        }, token)

        await page.goto("https://rahulshettyacademy.com/client", {
            waitUntil: "networkidle"
        })

        await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/63f1cbd4568c3e9fb11a40ef",
            async (route) => {
                //fetch orifinal response
                let response = await page.request.fetch(route.request(),
                    {
                        timeout: 120000
                    }
                );
                // console.log("method is "+await request.method())
                let body = Buffer.from(JSON.stringify(fakePayloadOrders));
                route.fulfill({
                    //pass all fields from the response
                    response,
                    //override response body
                    body

                })
            }
        )
        await page.locator("button[routerlink*='myorders']").click();
        await page.waitForLoadState("networkidle");
        console.log(await page.locator(".mt-4").textContent())
        //  await page.locator("tbody").waitFor();

        //  const rows = await page.locator("tbody tr").all();





    }
    )
})
