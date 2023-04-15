import { Locator, Page } from "@playwright/test";

export class loginPage {

    private readonly page:Page;
    private readonly txtUserName:Locator;
    private readonly txtPassWord:Locator;
    private readonly loginButton:Locator;
    

    constructor(page:Page){
        this.page = page;
        this.txtUserName = page.getByPlaceholder('email@example.com');
        this.txtPassWord = page.getByPlaceholder('enter your passsword');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async login(userName:string,passWord:string) {
        await this.txtUserName.fill(userName);
        await this.txtPassWord.fill(passWord);
        await Promise.all([
            this.loginButton.click(),
            this.page.waitForURL("https://rahulshettyacademy.com/client/dashboard/dash",{
                waitUntil:"networkidle"
            })
        ])
}


}