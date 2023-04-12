import { Locator, Page } from "@playwright/test";
import { checkOutPage } from "./checkOutPage";

export class homePage {
    
    public  totalPrice:number=0;

    private readonly page:Page;
    private readonly checkoutBtn:Locator;
 
    constructor (page:Page){
        this.page = page;
        this.checkoutBtn =  page.getByText('Checkout');
    }


    async selectListItems (itemList:string[]){
        for await (const item of itemList){
            const price =  await this.selectItem(item);
            this.totalPrice+=  price;
        }
        return this;
    }

    async checkout(){
        await this.page.waitForLoadState("domcontentloaded")
        await this.checkoutBtn.click();
        return new checkOutPage(this.page);
    }


    private selectItem = async(item:string) => {
        let itemName:string = "//img[@alt='"+item+"']/parent::div/following-sibling::div[text()='Add to cart']";
        let price =  await this.page.locator("//img[@alt='"+item+ "']/parent::div/following-sibling::div[@class='shelf-item__price']/div[@class='val']/b").textContent();
        await this.page.locator(itemName).click();
        return Number(price);
    
} 

}