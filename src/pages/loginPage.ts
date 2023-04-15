import { BrowserContext, Page, Locator } from "playwright";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {

    private readonly txtUserName:Locator;
    private readonly txtPassWord:Locator;
    private readonly loginButton:Locator;

constructor(page: Page, broserContext: BrowserContext) {
    super(page, broserContext);
    this.txtUserName = page.getByPlaceholder('email@example.com');
    this.txtPassWord = page.getByPlaceholder('enter your passsword');
    this.loginButton = page.getByRole('button', { name: 'Login' });
}

async login(userName:string,passWord:string) {
    await this.txtUserName.fill(userName);
    await this.txtPassWord.fill(passWord);
    await Promise.all([
        this.loginButton.click(),
        this.page.waitForURL("**\/client/dashboard/dash",{
            waitUntil:"networkidle"
        })
    ])
}

}
