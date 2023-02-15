import { chromium,test } from "@playwright/test";

test("login test", async ()=>{
    const browser = await chromium.launch({headless:true});
    const context = await browser.newContext();
    const page = await context.newPage();

    
    await page.goto("https://ecommerce-playground.lambdatest.io/")
    await page.locator("#btn").click();

})

