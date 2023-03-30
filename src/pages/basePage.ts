import config from '../../config';
import { Page, BrowserContext } from 'playwright';
import { join } from 'path';


export class BasePage {
  page: Page;
  context: BrowserContext;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
  }
  

  public async goto(optionalUrl?: string) {
    const pageToGoTo :string = optionalUrl ? (config.baseUrl+optionalUrl) : config.baseUrl;
    return await this.page.goto(pageToGoTo);
  }


  public async screenshot(name: string){
    await console.log("name is: "+name)
    return await this.page.screenshot({ path: join('screenshots', `${name}.png`) });
  }


}