import { Locator, Page ,BrowserContext} from "playwright";
import { BasePage } from "./basePage";

export class CheckOutPage extends BasePage {
    
    private readonly selectCountryTxtBox:Locator;
    private readonly placeOrder:Locator;
    
    constructor (page:Page,context:BrowserContext){
        super(page,context);
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