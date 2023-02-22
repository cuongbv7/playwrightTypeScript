import { Locator, Page } from "@playwright/test";

export class loginPage {

    private readonly page:Page;
    private readonly txtUserName:Locator;
    private readonly txtPassWord:Locator;
    private readonly loginButton:Locator;
    

    constructor(page:Page){
        this.page = page;
        this.txtUserName = page.locator("#username input");
        this.txtPassWord = page.locator("#password input");
        this.loginButton = page.locator("#login-btn");
    }

    async login(userName:string,passWord:string) {
        await this.txtUserName.type(userName).then(async()=> await this.page.keyboard.press("Enter"));
        await this.txtPassWord.type(passWord).then(async()=> await this.page.keyboard.press("Enter"));
        await Promise.all([
             this.loginButton.click(),
             this.page.waitForURL("https://bstackdemo.com/?signin=true",{
                waitUntil:"networkidle"
             })
        ])
   }

    async getUserInfo(locat: Locator){
        return await locat.textContent();
    }

     

}