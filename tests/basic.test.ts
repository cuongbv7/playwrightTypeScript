import {chromium,test,expect, Page} from "@playwright/test";
import { reject, resolve } from "cypress/types/bluebird";


test.describe("test suite ",()=>{

    let page:Page;
    test.beforeAll(async ()=>{
        const browser = await chromium.launch({headless:true});
        const context = await browser.newContext();
        page = await context.newPage();
    })
    test.beforeEach(()=>{
        
    })
   

    test("tc01 ",async ()=>{ 

        await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");
    
       // await page.locator("button:has-text('Click Me')").nth(0).click();
       console.log("num of button: %d",await page.getByRole("button",{name:"Click Me"}).count());
       await page.getByRole("button",{name:"Click Me"}).nth(0).click();
        page.on("dialog",async(alert)=>{
            const text = alert.message();
            console.log("text is "+text);
            await alert.accept();
        }) 
    }),

    test("tc02 ",async ()=>{

        await page.goto("https://www.lambdatest.com/selenium-playground/select-dropdown-demo");
    
       // await page.locator("button:has-text('Click Me')").nth(0).click();
       await page.selectOption("#select-demo",{
            value:"Wednesday"
       })
    }),

    test("tc03 boostrap dropdown ",async ()=>{

        await page.goto("https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo");
    
       // await page.locator("button:has-text('Click Me')").nth(0).click();
       await selectCountry("India")

       async function selectCountry(country:string) {
        await page.click("#country+span");
        await page.locator("#select2-country-results").
            locator("li", {
                hasText :country
            }).click();

       }

    })

    test ("tc 04 iframe", async () => {
        await page.goto("");
        const frame =  page.frame("#iframe");
        await frame?.locator("#username").fill("aaa");
        await frame?.locator("#password").fill("bbb");

    })


    test ("tc 05 windowns", async () => {
        await page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo");
        // [x] is same with x[0]
        
        let [x] = await Promise.all([
            page.waitForEvent("popup"),
            page.locator("a[title='Follow @Lambdatesting on Twitter']").click()
        ]);
        
        console.log(x.url);    
    
           

    })

    test ("tc 06 upload Files", async () => {
        await page.goto("https://blueimp.github.io/jQuery-File-Upload/");
        // [x] is same with x[0]
        
        await page.setInputFiles("input[type='file']",["upload/Lambdainfo.txt"]);
              
    })

    test ("tc 07 download Files", async () => {
        await page.goto("https://www.lambdatest.com/selenium-playground/generate-file-to-download-demo");
        // [x] is same with x[0]
        await page.locator("#textbox").type("abc 13579");
        await page.click("#create");

        const [dowloadFile] = await Promise.all([
            page.waitForEvent("download"),
            page.click("a[id='link-to-download']")
        ]);
        
        const fileName = dowloadFile.suggestedFilename();
        await dowloadFile.saveAs("download/"+fileName);
          
    
    })
     

})





