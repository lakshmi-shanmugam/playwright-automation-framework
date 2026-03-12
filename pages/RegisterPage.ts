import {Page,expect} from '@playwright/test';

export class RegisterPage{

    constructor(private page:Page){
       // this.page=page;
    }

    async goto(){
    await this.page.goto('/register');
}

async registerUser(firstName :string, LastName:string, email:string, password:string){

    await this.page.locator('#FirstName').fill(firstName);
    await this.page.locator('#LastName').fill(LastName);
    await this.page.locator('#Email').fill(email);
    await this.page.locator('#Password').fill(password);
    await this.page.locator('#ConfirmPassword').fill(password);
    await this.page.locator('#register-button').click();

}

async assertRegistrationSuccess(){
    await expect(this.page.locator('.result')).toContainText('Your registration completed');
}

async assertAccountLink(email: string){
    await expect(this.page.getByRole('link', { name: email, exact: true })).toBeVisible();
}

async assetFieldError(field:string, message:string){
    await expect(this.page.locator(`#${field}-error`)).toContainText(message);
}

// //async getValidationErrors()
// Defines an asynchronous method named getValidationErrors
// It is async because Playwright actions take time and must be awaited

// this.page
// Refers to the current Playwright page inside your RegisterPage class

// .locator('.field-validation-error')
// Finds all elements matching the CSS class .field-validation-error

// .allTextContents()
// Gets the text from all matched elements and returns them as an array

// return await ...
// Returns that array back to the test

async getValidationErrors() {
  return await this.page.locator('.field-validation-error').allTextContents();
}
}
