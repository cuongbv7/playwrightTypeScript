import { Locator, Page ,BrowserContext} from "playwright";
import { BasePage } from "./basePage";

export class CheckOutPage extends BasePage {
    
    private readonly submitBtn:Locator;
    private readonly totalPrice:Locator;

    
    constructor (page:Page,context:BrowserContext){
        super(page,context);
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