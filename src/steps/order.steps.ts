import { ICustomWorld } from '../support/custom-world';
import { DataTable, Then, When} from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import config from '../../config';


let  selectedItems:Array<string>=[];


When('Customer has selected below items in home page and checkout:', async function (this: ICustomWorld,items:DataTable) {
    selectedItems=[];
    for await (const itemT of items.hashes() ){
        selectedItems.push(itemT.item)
    }

    if (this.pagesObj!=undefined){
        await (await (await this.pagesObj.homePage.selectListItems(selectedItems)).gotoCart()).checkout();

       // totalPriceActual = await (await (await this.pagesObj.homePage.selectListItems(selectedItems)).checkout()).getTotalPrice();
        //totalPriceExpected = this.pagesObj.homePage.totalPrice;
    }
});

When('Shipping address is fulfilled with this information:', async function (this: ICustomWorld,informations:DataTable) {
    let infos = informations.hashes()[0];
    await this.pagesObj?.checkoutPage.selectCountry(infos.country);

});

Then('Customer should able to place this order successfully', async function (this: ICustomWorld) {
    const [response] =  await Promise.all([
        this.page?.waitForResponse(response => response.url()===config.baseUrl+'/api/ecom/order/create-order'&& response.ok(),{timeout:5000}),
        this.page?.waitForRequest(request => request.url()===config.baseUrl+'/api/ecom/order/create-order'
        && request.method()==='POST'),
        this.pagesObj?.checkoutPage.submit(),
    ])
    let body ;
    if(response!=undefined){
        body = await response.json();
    }
    expect (body.message).toEqual("Order Placed Successfully");
    expect(await this.page?.getByText(/Thankyou for the order./).isVisible()).toEqual(true);


});



When('Shipping address is not fulfilled to checkout', async function (this: ICustomWorld) { 
});


Then('A error message {string} should be displayed when user click to place order', async function (this: ICustomWorld,errMsg:string) {
    await this.pagesObj?.checkoutPage.submit();
    expect(await this.page?.getByText(errMsg).isVisible()).toEqual(true);
});
