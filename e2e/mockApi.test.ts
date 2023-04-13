import ApiUtils from "../utils/apiUtils";
import {test,expect,request} from "../fixtures/pomFixture";
import * as fakePayloadOrders from "../data/fakeDataPayload.json"
import * as credentialInfor from "../data/credentialInfor.json"
import * as fakePayloadCount from "../data/fakePayloadCount.json"





test.describe("mock api testing ", () => {

    let token: string;

    test.beforeAll(async () => {
        const apicontext = await request.newContext();
        const apiRequest = new ApiUtils(apicontext);
        token = await apiRequest.getToken(credentialInfor);
    })



    test("api intercept ", async ({ page }) => {
        await page.addInitScript((value) => {
            window.localStorage.setItem("token", value);
        }, token)

        await page.goto("https://rahulshettyacademy.com/client", {
            waitUntil: "networkidle"
        })

        await page.route("**/api/ecom/user/get-cart-count/*",
            async (route) => {
                //fetch orifinal response
                let response = await page.request.fetch(route.request(),
                    {
                        timeout:120000
                    }
                );
                let body = Buffer.from(JSON.stringify(fakePayloadCount));
                route.fulfill({
                    //pass all fields from the response
                    response,
                    //override response body
                    body

                })
            }
        )

        await page.route("**/api/ecom/user/get-cart-products/*",
        async (route) => {
            //fetch orifinal response
            let response = await page.request.fetch(route.request(),
                {
                    timeout:120000
                }
            );
            let body = Buffer.from(JSON.stringify(fakePayloadOrders));
            route.fulfill({
                //pass all fields from the response
                response,
                //override response body
                body

            })
        }
    )

        await page.locator("button[routerlink*='/dashboard/cart']").click();
        await page.waitForLoadState("networkidle");
        await expect (page.getByText("#6262e95ae26b7e1a10e89bf0",{exact:true})).toBeVisible();
    
    }
    )

    
    test.afterAll(async ({page}) => {
        page.close();
    })

})
