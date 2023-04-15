import { BrowserContext, Page, Locator } from "playwright";
import { BasePage } from "./basePage";
import { CheckOutPage } from "./checkOutPage";

export class MyCartPage extends BasePage {
    
    public  totalPrice:number=0;

    private readonly checkoutBtn:Locator;

    constructor(page: Page, broserContext: BrowserContext) {
        super(page, broserContext);
        this.checkoutBtn =  page.getByRole("button",{name:"Checkout"});
    }



    async checkout(){
        await this.page.waitForLoadState("domcontentloaded")
        await this.checkoutBtn.click();
        return new CheckOutPage(this.page,this.context);
    }




}