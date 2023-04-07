import {test,expect} from "@playwright/test";

test("visueal UI test", async ({page})=>{

    await page.goto("https://www.google.com/");
    
    await expect(page).toHaveScreenshot({animations:"disabled"})

    //expect(await page.screenshot()).toMatchSnapshot();

})