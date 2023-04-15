import { CheckOutPage } from './checkOutPage';
import { HomePage } from './homePage';
import {LoginPage} from './loginPage';

import { Page, BrowserContext } from 'playwright';
import { BasePage } from './basePage';
import { MyCartPage } from './myCartPage';

export class AllPagesObject {
  homePage: HomePage;
  loginPage: LoginPage;
  checkoutPage: CheckOutPage;
  basePage: BasePage;
  mycartPage:MyCartPage

  constructor(public page: Page, public context: BrowserContext) {
    this.homePage = new HomePage(page, context);
    this.loginPage = new LoginPage(page,context);
    this.checkoutPage = new CheckOutPage(page,context);
    this.basePage = new BasePage(page,context);
    this.mycartPage = new MyCartPage(page,context)
  }
}
