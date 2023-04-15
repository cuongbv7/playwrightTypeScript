import { Locator, Page } from "@playwright/test";
import { checkOutPage } from "./checkOutPage";

export class myCartPage {
    
    public  totalPrice:number=0;

    private readonly page:Page;
    private readonly checkoutBtn:Locator;

    constructor (page:Page){
        this.page = page;
        this.checkoutBtn =  page.getByRole("button",{name:"Checkout"});
    }



    async checkout(){
        await this.page.waitForLoadState("domcontentloaded")
        await this.checkoutBtn.click();
        return new checkOutPage(this.page);
    }




}