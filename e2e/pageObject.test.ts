import {test,expect} from "../fixtures/pomFixture";
import * as credentialInfo from "../data/credential.json"
import { ShippingAddressModel } from "../model/shippingAddressModel";

let shipAddress: ShippingAddressModel;


test.describe("place order function",()=>{

    test.beforeEach(async ({page,loginPage,baseURL})=>{
        
        await page.goto(baseURL+"/signin");
        await loginPage.login(credentialInfo.usrName,credentialInfo.passWord);
        
    })

    test('check out success', async ({page,homePage,checkOutPage }) => {
        shipAddress = {
            firstName: 'John',
            lastName: 'Doe',
            address:'Ha Dong',
            state:'Ha Noi',
            postalCode:'10000'
        }
        
        let selectedItems:string[] = ["iPhone 12","iPhone 11"]
        await (await homePage.selectListItems(selectedItems)).checkout();
        await checkOutPage.fillInformation(shipAddress);
        const [request] = await Promise.all([
            page.waitForRequest(request => request.url() === 'https://bstackdemo.com/api/checkout',{
                timeout:5000
            }),
            checkOutPage.submit(),
        ])
        expect(request.method()==="POST").toEqual(true);
        expect(await checkOutPage.getConfirmMessage()).toEqual("Your Order has been successfully placed.");        
        expect(await checkOutPage.getTotalPrice()).toEqual(homePage.totalPrice);
        
    }
    )

    test('check out without filling shipping address', async ({page,homePage }) => {
        let selectedItems:string[] = ["iPhone 12","iPhone 11"]
        await (await homePage.selectListItems(selectedItems)).checkout();
        await expect(page.getByRole("button",{name:"Submit"})).toBeDisabled();

    }
    )

})