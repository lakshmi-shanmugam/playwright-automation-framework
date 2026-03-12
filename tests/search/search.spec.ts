import {test,expect} from '@playwright/test';
import {HomePage} from '../../pages/HomePage';
import {SEARCH,CATEGORIES} from '../../utils/testData';

//Happy Path

test.describe('Search - Happy path',()=>{

test('should load homepage successfully', async({page})=>{

    const homePage=new HomePage(page);

    await homePage.goto();
    await homePage.assertPageLoaded();
});

test('Should return results for the valid keyword', async({page})=>{

const homePage=new HomePage(page);
    await homePage.goto();
    await homePage.searchProduct(SEARCH.validKeyword);
    
    //assert results appeard
await homePage.assertSearchResults();

//assert at least one product item is visible
const count = await homePage.getSearchResultCount();
expect(count).toBeGreaterThan(0);
console.log(`Total number of results: ${count}`);

await expect(page.locator('.product-item').first()).toBeVisible();
 const total= await homePage.getTextContent();
console.log('Total:', String(total).replace(/\s+/g, ' ').trim());

});

test('should return results for partial keyword',async({page})=>{

const homePage=new HomePage(page);

await homePage.goto();
await homePage.searchProduct(SEARCH.partialKeyword);

 //assert results appeard
await homePage.assertSearchResults();


await expect(page.locator('.product-item').first()).toBeVisible();
 const total= await homePage.getTextContent();
console.log('Total:', String(total).replace(/\s+/g, ' ').trim());

const resultTitles = await homePage.getSearchResultTitles();
console.log('Search results:');
resultTitles.forEach((title, index) => {
    console.log(`${index+1 }. ${title}`);
});

const count = await homePage.getSearchResultCount();
expect(count).toBeGreaterThan(0);
console.log(`Total number of results: ${count}`);

});

test('should show correct search term in results page', async({page})=>{

const homePage=new HomePage(page);
    await homePage.goto();
    await homePage.searchProduct(SEARCH.partialKeyword);
await expect(page.locator('.product-item').first()).toBeVisible();

//clikc the first product in the results
const productLinks = page.locator('.product-item h2 a');

const firstProductTitle = await productLinks.first().textContent();
const lastProductTitle = await productLinks.last().textContent();

console.log('First Product:', firstProductTitle);
console.log('Last Product:', lastProductTitle);

await productLinks.first().click();
await expect(page.locator('.product-name h1'))
  .toContainText(String(firstProductTitle).trim());

await page.goBack();
await expect(productLinks.first()).toBeVisible();

await productLinks.last().click();
await expect(page.locator('.product-name h1'))
  .toContainText(String(lastProductTitle).trim());

});
});
//Negatove/validation test

test.describe('Search-Negative Tests',()=>{

test('should show no results for invalid keyword', async({page})=>{
    
const homePage=new HomePage(page);
await homePage.goto();
await homePage.searchProduct(SEARCH.invalidKeyword);

await homePage.assertNoSearchResults();

});


test('should show message when search box is empty', async ({ page }) => {
  const homePage = new HomePage(page);

  page.once('dialog', async (dialog) => {
    console.log('Browser message:', dialog.message());
    expect(dialog.message()).toBe('Please enter some search keyword');
    await dialog.accept();
  });

  await homePage.goto();
  await page.getByRole('button', { name: 'Search' }).click();
});

  test('should show no results for special characters', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.goto();
    await homePage.searchProduct('!@#$%^&*');

    await homePage.assertNoSearchResults();
  });
});
//Categaory navigation tests
test.describe('Category Navigation', () => {

test('should navigate to Books category',async({page})=>{

const homePage=new HomePage(page);
await homePage.goto();
await homePage.clickCategory(CATEGORIES.books);
await homePage.assertCategoryPageLoaded(CATEGORIES.books);
const categoryTitle = await homePage.getCategoryTitle();
console.log('Category title:', categoryTitle);
})

});    

test('should navigate to Computers category',async({page})=>{

const homePage=new HomePage(page);
await homePage.goto();
await homePage.clickCategory(CATEGORIES.computers);
await homePage.assertCategoryPageLoaded(CATEGORIES.computers);
const categoryTitle = await homePage.getCategoryTitle();
console.log('Category title:', categoryTitle);
});

test('should navigate to Electronics category',async({page})=>{

const homePage=new HomePage(page);
await homePage.goto();
await homePage.clickCategory(CATEGORIES.electronics);
await homePage.assertCategoryPageLoaded(CATEGORIES.electronics);
const categoryTitle = await homePage.getCategoryTitle();
console.log('Category title:', categoryTitle);
});


test('should display products inside a category', async({page})=>{

const homePage=new HomePage(page);
await homePage.goto();
await homePage.clickCategory(CATEGORIES.books);
  // Products should be visible inside category
    await expect(
      page.locator('.product-item')
    ).toHaveCount(6);
await expect(page.locator('.product-item').first()).toBeVisible();

});
//Home page content tests
test.describe('Homepage Content',()=>{
test('should display featured products on homepage', async({page})=>{

    const homePage=new HomePage(page);
    await homePage.goto();
    await homePage.assertFeaturedProductsVisible();
    });
test('should navigate to product detail from homepage', async({page})=>{
   const homePage=new HomePage(page);
    await homePage.goto();

await homePage.clickFirstFeaturedProduct();
await expect(page.locator('product-name')).toBeVisible;

await expect(page.locator('.add-to-cart-button')).toBeVisible();
})

test('should show login and register links when not logged in', async({page})=>{

const homePage=new HomePage(page);
await homePage.goto();
await homePage.clickLogout();

await expect(
      page.locator('.ico-login')
    ).toBeVisible();

    await expect(
      page.locator('.ico-register')
    ).toBeVisible();
  });



});

