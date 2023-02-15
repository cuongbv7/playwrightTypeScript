import { test as baseTest } from "./fixture";

import { checkOutPage } from "../page/checkOutPage";
import { homePage } from "../page/homePage";
import { loginPage } from "../page/loginPage";

type pages = {
    homePage: homePage;
    loginPage:loginPage;
    checkOutPage:checkOutPage
}

const pageManager = baseTest.extend<pages>({
    homePage: async ({page},use)=>{
        await use(new homePage(page));
    },
    loginPage: async ({page},use)=>{
        await use(new loginPage(page));
    },
    checkOutPage: async ({page},use)=>{
        await use(new checkOutPage(page));
    }

})

export const test = pageManager;
export const expect = pageManager.expect;
