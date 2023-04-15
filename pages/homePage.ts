import { Locator, Page } from "@playwright/test";
import { checkOutPage } from "./checkOutPage";
import { myCartPage } from "./myCartPage";

export class homePage {
    
    public  totalPrice:number=0;

    private readonly page:Page;
    private readonly checkoutBtn:Locator;
    private readonly cartBtn:Locator;
 
    constructor (page:Page){
        this.page = page;
        this.checkoutBtn =  page.getByText('Checkout');
        this.cartBtn = page.getByRole("button",{
            name:/.Cart./
        })
    }


    async selectListItems (itemList:string[]){
        for await (const item of itemList){
            const price =  await this.selectItem(item);
            this.totalPrice+=  price;
        }
        return this;
    }

    async gotoCart(){
        await this.cartBtn.click();
        return new myCartPage(this.page);
    }

    async checkout(){
        await this.page.waitForLoadState("domcontentloaded")
        await this.checkoutBtn.click();
        return new checkOutPage(this.page);
    }


    private selectItem = async(item:string) => {
        //b[text()='zara coat 3']/parent::h5/following-sibling::button[text()=' Add To Cart']
        ////b[text()='zara coat 3']/parent::h5/following-sibling::div/div
        let itemName:string = "//b[text()='"+item+"']/parent::h5/following-sibling::button[text()=' Add To Cart']";
        let price =  await this.page.locator("//b[text()='"+item+ "']/parent::h5/following-sibling::div/div").textContent();
        await this.page.locator(itemName).click();
        return Number(price?.replace("$ ",""));
    
} 

}