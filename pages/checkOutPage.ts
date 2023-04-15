import { Locator, Page } from "@playwright/test";
import { ShippingAddressModel } from "../model/shippingAddressModel";

export class checkOutPage {
    
    private readonly page:Page;
    private readonly selectCountryTxtBox:Locator;
    private readonly placeOrder:Locator;

    constructor (page:Page){
        this.page =page;
        this.selectCountryTxtBox = page.getByPlaceholder('Select Country');
        this.placeOrder = page.getByText('Place Order')
    }
    
    async submit() {
        await this.placeOrder.click();
    }


    async selectCountry(country:string){
        await this.selectCountryTxtBox.type(country,{delay:100})
        await this.page.getByRole('button', { name: country }).click()
        return this;
    }





}