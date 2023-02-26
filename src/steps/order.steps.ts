import { ICustomWorld } from '../support/custom-world';
import { DataTable, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

let totalPriceActual:number;
let toalPriceExpected:number;


When('She order below items in home page:', async function (this: ICustomWorld,items:DataTable) {
    let selectedItems:Array<string>=[];
    for await (const itemT of items.hashes() ){
        selectedItems.push(itemT.item)
    }
    if (this.pagesObj!=undefined){
        totalPriceActual = await (await (await this.pagesObj.homePage.selectListItems(selectedItems)).checkout()).getTotalPrice();
        toalPriceExpected = this.pagesObj.homePage.totalPrice;

    }
});

Then('Order page should be displayed with total price correctly', async function (this: ICustomWorld) {
    expect(totalPriceActual).toEqual( toalPriceExpected);
    
});