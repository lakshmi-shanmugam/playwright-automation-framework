import {Page,expect} from '@playwright/test';

export class LoginPage{

    constructor(private page:Page){}

async goto(){
    await this.page.goto('/login');
}

async login(email: string, password: string) {
    await this.page.locator('#Email').fill(email);
    await this.page.locator('#Password').fill(password);
    await this.page.locator('.login-button').click();
}

async assertLoggedIn(){

    await expect(this.page.locator('.account')).toBeVisible();
}

}

