import { ICustomWorld } from '../support/custom-world';
import { DataTable, Then, When} from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ShippingAddressModel } from '../model/shippingAdressModel';




When('Customer has selected below items in home page and checkout:', async function (this: ICustomWorld,items:DataTable) {
    let selectedItems:Array<string>=[];
    for await (const itemT of items.hashes() ){
        selectedItems.push(itemT.item)
    }
    if (this.pagesObj!=undefined){
        await (await this.pagesObj.homePage.selectListItems(selectedItems)).checkout();

       // totalPriceActual = await (await (await this.pagesObj.homePage.selectListItems(selectedItems)).checkout()).getTotalPrice();
        //totalPriceExpected = this.pagesObj.homePage.totalPrice;
    }
});

When('Shipping address is fulfilled with below informations:', async function (this: ICustomWorld,informations:DataTable) {
    let shipingAdress:ShippingAddressModel;
    let infos = informations.hashes()[0];
    shipingAdress ={
        firstName:infos.firstName,
        lastName:infos.lastName,
        address:infos.address,
        state:infos.state,
        postalCode:infos.postalCode

    }
    await this.pagesObj?.checkoutPage.fillInformation(shipingAdress);

});

Then('Customer should able to click the submit button to place this order', async function (this: ICustomWorld) {
    const [request] = await Promise.all([
        this.page?.waitForRequest(request => request.url() === 'https://bstackdemo.com/api/checkout',{
            timeout:5000
        }),
        this.pagesObj?.checkoutPage.submit(),
    ])
    expect(request?.method()==="POST").toEqual(true);
});


Then('The order should be successfully placed with correct total price', async function (this: ICustomWorld) {
    expect(await this.pagesObj?.checkoutPage.getConfirmMessage()).toEqual("Your Order has been successfully placed.");        
    expect(await this.pagesObj?.checkoutPage.getTotalPrice()).toEqual(this.pagesObj?.homePage.totalPrice);    
});


When('Shipping address is not fulfilled to checkout', async function (this: ICustomWorld) { 
});


Then('Customer unable to click the submit button to place order', async function (this: ICustomWorld) {
    expect(await this.page?.getByRole("button",{name:"Submit"}).isDisabled()).toEqual(true);

});
