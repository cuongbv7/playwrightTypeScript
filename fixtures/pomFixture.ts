import { test as baseTest } from "./fixture";
import { request as apiRequest } from "./fixture";


import { checkOutPage } from "../pages/checkOutPage";
import { homePage } from "../pages/homePage";
import { loginPage } from "../pages/loginPage";

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
export const request = apiRequest;