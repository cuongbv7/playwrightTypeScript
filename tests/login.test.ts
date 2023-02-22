import { chromium,test } from "@playwright/test";


test("login test ", async ()=>{
    const browser = await chromium.launch({headless:true});
    const context = await browser.newContext();
    const page = await context.newPage();

    
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("#").click();
    await context.storageState({path:"loginState.json"})

})

test("state to load", async ()=>{
    const browser = await chromium.launch({headless:true});

    const newContext = await browser.newContext({storageState:"state.json"});
    const page =  await newContext.newPage();
    page.goto("https://rahulshettyacademy.com/client");

}
)