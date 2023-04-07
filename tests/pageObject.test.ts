import {test,expect} from "../fixtures/pomFixture";
import * as credentialInfo from "../data/credential.json"


 

test.describe("add to cart function",()=>{
   
    test.beforeEach(async ({page,loginPage,baseURL})=>{
        
        await page.goto(baseURL+"/signin");
        await loginPage.login(credentialInfo.usrName,credentialInfo.passWord);
        
    })


    test('should allow me to display completed items', async ({homePage }) => {
        let selectedItems:string[] = ["iPhone 12","iPhone 11"]
        const totalPriceCheckout = await (await (await homePage.selectListItems(selectedItems)).checkout()).getTotalPrice();
        expect(totalPriceCheckout).toEqual( homePage.totalPrice);
    }
    )

    test('should not allow me to display completed items', async ({homePage }) => {
        let selectedItems:string[] = ["iPhone 13","iPhone 14"]
        const totalPriceCheckout = await (await (await homePage.selectListItems(selectedItems)).checkout()).getTotalPrice();
        expect(totalPriceCheckout).toEqual( homePage.totalPrice);
    }
    )
})