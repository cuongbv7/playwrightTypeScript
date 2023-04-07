import { Locator, Page ,BrowserContext} from "playwright";
import { ShippingAddressModel } from "../model/shippingAdressModel";
import { BasePage } from "./basePage";

export class CheckOutPage extends BasePage {
    
    private readonly submitBtn:Locator;
    private readonly totalPrice:Locator;
    private readonly firstName:Locator;
    private readonly lastName:Locator;
    private readonly address:Locator;
    private readonly state:Locator;
    private readonly postalCode:Locator;
    private readonly confirmMessage:Locator;

    
    constructor (page:Page,context:BrowserContext){
        super(page,context);
        this.submitBtn = page.getByRole("button",{name:"Submit"});
        this.totalPrice = page.locator(".cart-priceItem-value span");
        this.firstName = page.locator("#firstNameInput");
        this.lastName = page.locator("#lastNameInput");
        this.address = page.locator("#addressLine1Input");
        this.state = page.locator("#provinceInput");
        this.postalCode = page.locator("#postCodeInput")
        this.confirmMessage = page.locator("#confirmation-message")
    }


    async submit() {
        await this.submitBtn.click();
    }


    async fillInformation(shipingAdress:ShippingAddressModel){
        await this.firstName.fill(shipingAdress.firstName),
        await this.lastName.fill(shipingAdress.lastName),
        await this.address.fill(shipingAdress.address),
        await this.state.fill(shipingAdress.state),
        await this.postalCode.fill(shipingAdress.postalCode)
        return this;
    }


    getTotalPrice = async() => {
        let price = await this.totalPrice.textContent();
        if(price!=null){
            return Number(price.replace("$",""));
        }else{
            return -1;
        }
    }

    getConfirmMessage =async() => {
        let msg =  await this.confirmMessage.textContent();
        return msg;

    }

}