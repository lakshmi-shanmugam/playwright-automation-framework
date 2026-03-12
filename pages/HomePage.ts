import {Page, expect} from '@playwright/test';

export class HomePage{

constructor(private page:Page){}

//Navigation

async goto(){
    await this.page.goto('/');
}

async assertPageLoaded(){

    await expect(this.page).toHaveURL('/');
    await expect(this.page.locator('.header-logo')).toBeVisible();
}

//Search

async searchProduct(keyword:string){

    await this.page.locator('#small-searchterms').fill(keyword);
await this.page.getByRole('button', {name:'Search'}).click();
}

async assertSearchResults(){

    await expect(this.page.locator('.search-results')).toBeVisible();
}

async assertNoSearchResults(){

    await expect(this.page.locator('.result')).toBeVisible();
}

//Category Navigation
async clickCategory(categoryName:string){

await this.page.getByRole('link', {name:categoryName}).first().click();

}

 async assertCategoryPageLoaded(categoryName: string) {
    await expect(
      this.page.locator('.page-title h1')
    ).toContainText(categoryName);
  }
async getCategoryTitle(): Promise<string | null> {
  return await this.page.locator('.page-title h1').textContent();
}


//Top Navigation links

async clickLoginLink(){
    await this.page.locator('ico-login').click;
    }
async clickRegisterLink(){
    await this.page.locator('ico-register').click;
    }
async clickCartLink(){
    await this.page.locator('#topcartlink').click;
    }

async clickWhislistLink(){
    await this.page.locator('ico-wishlist').click;
    }

async clickLogout(){
    await this.page.locator('ico-logout').click;
    }
//Cart mini summary
 async getCartCount(): Promise<string> {
    return await this.page
      .locator('#topcartlink .cart-qty')
      .innerText();
  }

  async assertCartCount(expected: string) {
    await expect(
      this.page.locator('#topcartlink .cart-qty')
    ).toContainText(expected);
  }

//Featured Products(homepage)
async assertFeaturedProductsVisible() {
    await expect(
      this.page.locator('.product-grid')
    ).toBeVisible();
  }

  async clickFirstFeaturedProduct() {
    await this.page
      .locator('.product-item h2 a')
      .first()
      .click();
  }

  async clickProductByName(productName: string) {
    await this.page
      .getByRole('link', { name: productName })
      .click();
  }

  async getTextContent(){

    return await this.page.locator('.search-results').textContent();
  }

  async getSearchResultTitles(): Promise<string[]> {
    return (await this.page.locator('.product-item h2 a').allTextContents())
      .map((title) => title.trim())
      .filter(Boolean);
  }

  async getSearchResultCount(): Promise<number> {
    return await this.page.locator('.product-item').count();
  }
}
