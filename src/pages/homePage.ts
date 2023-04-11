import { BrowserContext,Page,Locator } from "playwright";
import { BasePage } from "./basePage";
import { CheckOutPage } from "./checkOutPage";

export class HomePage extends BasePage {
    
    public static  totalPrice:number=0;

    private  checkoutBtn:Locator;
    
    constructor (page:Page,browserContext:BrowserContext){
        super(page,browserContext);
        this.checkoutBtn =  page.getByText('Checkout');

    }


    async selectListItems (itemList:string[]){
        for await (const item of itemList){
            const price =  await this.selectItem(item);
            HomePage.totalPrice+=  price;
        }
        return this;
    }

    async checkout(){
        await this.page.waitForLoadState("domcontentloaded")
        await this.checkoutBtn.click();
        return new CheckOutPage(this.page,this.context);
    }


    private selectItem = async(item:string) => {
        let itemName:string = "//img[@alt='"+item+"']/parent::div/following-sibling::div[text()='Add to cart']";
        let price =  await this.page.locator("//img[@alt='"+item+ "']/parent::div/following-sibling::div[@class='shelf-item__price']/div[@class='val']/b").textContent();
        await this.page.locator(itemName).click();
        return Number(price);
    
    } 

}