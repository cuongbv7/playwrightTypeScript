import { ICustomWorld } from '../support/custom-world';
import { DataTable, Then, When} from '@cucumber/cucumber';
import { expect } from '@playwright/test';




When('Customer has selected below items in home page and checkout:', async function (this: ICustomWorld,items:DataTable) {
    let selectedItems:Array<string>=[];
    for await (const itemT of items.hashes() ){
        selectedItems.push(itemT.item)
    }

    if (this.pagesObj!=undefined){
        await (await (await (await this.pagesObj.homePage.selectListItems(selectedItems)).gotoCart()).checkout());

       // totalPriceActual = await (await (await this.pagesObj.homePage.selectListItems(selectedItems)).checkout()).getTotalPrice();
        //totalPriceExpected = this.pagesObj.homePage.totalPrice;
    }
});

When('Shipping address is fulfilled with this information:', async function (this: ICustomWorld,informations:DataTable) {
    let infos = informations.hashes()[0];
    await this.pagesObj?.checkoutPage.selectCountry(infos.country);

});

Then('Customer should able to place this order successfully', async function (this: ICustomWorld) {
    const [request,response] = await Promise.all([
        this.page?.waitForRequest(request => request.url() === 'https://bstackdemo.com/api/checkout',{
            timeout:5000
        }),
        this.page?.waitForResponse(response => response.url() === 'https://bstackdemo.com/api/checkout',{
            timeout:5000
        }),
        this.pagesObj?.checkoutPage.submit(),
    ])

    expect(request?.method()==='POST').toEqual(true);
    expect(response?.status()===200).toEqual(true);


});



When('Shipping address is not fulfilled to checkout', async function (this: ICustomWorld) { 
});


Then('Customer unable to click the submit button to place order', async function (this: ICustomWorld) {
    expect(await this.page?.getByRole("button",{name:"Submit"}).isDisabled()).toEqual(true);

});
