import { ICustomWorld } from '../support/custom-world';
import { Given } from '@cucumber/cucumber';
import * as credential from '../../data/credential.json'


Given('Customer has logged on to the application', async function (this: ICustomWorld) {
    await this.pagesObj?.loginPage.goto("signin")
    await this.pagesObj?.loginPage.login(credential.usrName,credential.passWord);
});







