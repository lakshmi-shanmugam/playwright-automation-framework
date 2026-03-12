import {test,expect} from '@playwright/test';
import {LoginPage} from '../../pages/LoginPage';
import { USER } from '../../utils/testData';

test('login with valid credentials', async({page})=>{

const loginPage=new LoginPage(page);

await loginPage.goto();
await loginPage.login(USER.email, USER.password);
await loginPage.assertLoggedIn();
});

test('login fails with wrong password', async({page})=>{
const loginPage = new LoginPage(page);
await loginPage.goto();
  await loginPage.login(USER.email, 'wrongpassword');
await expect(page.locator('.validation-summary-errors')).toBeVisible();

});