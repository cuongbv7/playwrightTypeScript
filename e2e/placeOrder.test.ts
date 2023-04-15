import {test,expect} from "../fixtures/pomFixture";
import * as credentialInfo from "../data/credentialInfor.json"



test.describe("place order function",()=>{

    test.beforeEach(async ({page,loginPage,baseURL})=>{
        
        await page.goto(baseURL+"/client");
        await loginPage.login(credentialInfo.userEmail,credentialInfo.userPassword);
        
    })

    test('check out success', async ({page,homePage,checkOutPage,baseURL }) => {

        let selectedItems:string[] = ["zara coat 3","adidas original"]
        await (await (await (await homePage.selectListItems(selectedItems)).gotoCart()).checkout()).selectCountry("vietnam");
        const [response] =  await Promise.all([
            page.waitForResponse(response => response.url()===baseURL+'/api/ecom/order/create-order'&& response.ok(),{timeout:5000}),
            page.waitForRequest(request => request.url()===baseURL+'/api/ecom/order/create-order'
            && request.method()==='POST'),
            checkOutPage.submit(),
        ])
        const body = await response.json();
        expect (body.message).toEqual("Order Placed Successfully");
        await expect(page.getByText(/Thankyou for the order./)).toBeVisible();
        await expect(page.getByText(/adidas original/)).toBeVisible();
        await expect(page.getByText(/zara coat 3/)).toBeVisible();


    }
    )


    test('check out without filling shipping address', async ({page,homePage,checkOutPage }) => {
        let selectedItems:string[] = ["zara coat 3","adidas original"]
        await (await (await homePage.selectListItems(selectedItems)).gotoCart()).checkout();
        await checkOutPage.submit();
        await expect(page.getByText(/Please enter Full Shipping Information/)).toBeVisible();
    

    }
    )

    test.afterAll(async ({page})=>{
        page.close();
        
    })

})