import { Locator, Page } from "@playwright/test";

export class checkOutPage {
    
    private readonly page:Page;
    private readonly submitBtn:Locator;
    private readonly totalPrice:Locator;

    constructor (page:Page){
        this.page =page;
        this.submitBtn = page.locator("#checkout-shipping-continue");
        this.totalPrice = page.locator(".cart-priceItem-value span");
    }
     
    async submit() {
        await this.submitBtn.click();
    }

    getTotalPrice = async() => {
        let price = await this.totalPrice.textContent();
        if(price!=null){
            return Number(price.replace("$",""));
        }else{
            return -1;
        }
   }

}