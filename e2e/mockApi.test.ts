import { test, expect, request } from "@playwright/test";
import ApiUtils from "../utils/apiUtils";



const credentialInfor = {
    userEmail: "cuongbv7@gmail.com",
    userPassword: "Linhdan@2018"
}

const fakePayloadOrders = { data: [], message: "No Orders" };

const fakePayloadProductEmpty ={"message":"No Product in Cart"};

const fakePayloadCount = {"count":1,"message":"Cart Data Found"};


const fakePayloadOrder =  {"products":[{"_id":"6262e95ae26b7e1a10e89bf0","productName":"zara coat 3","productCategory":"fashion","productSubCategory":"shirts",
"productPrice":31500,"productDescription":"zara coat 3","productImage":"https://rahulshettyacademy.com/api/ecom/uploads/productImage_1650649434146.jpeg","productRating":"0","productTotalOrders":"0"
,"productStatus":true,"productFor":"women","productAddedBy":"admin@gmail.com","__v":0}]
,"count":1,"message":"Cart Data Found"}


test.describe("mock api testing ", () => {
    test.describe.configure({mode:'parallel'})

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
            let body = Buffer.from(JSON.stringify(fakePayloadOrder));
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
})
