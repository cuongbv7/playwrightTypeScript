import { BrowserContext,Page,Locator } from "playwright";
import { BasePage } from "./basePage";
import { CheckOutPage } from "./checkOutPage";
import { MyCartPage } from "./myCartPage";

export class HomePage extends BasePage {
    
    public  totalPrice:number=0;

    private readonly checkoutBtn:Locator;
    private readonly cartBtn:Locator;
    
    constructor (page:Page,browserContext:BrowserContext){
        super(page,browserContext);
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
        return new MyCartPage(this.page,this.context);
    }

    async checkout(){
        await this.page.waitForLoadState("domcontentloaded")
        await this.checkoutBtn.click();
        return new CheckOutPage(this.page,this.context);
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