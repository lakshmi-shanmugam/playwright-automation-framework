import {test,expect} from '@playwright/test';
import {RegisterPage} from '../../pages/RegisterPage';
import { REGISTER, USER } from '../../utils/testData';


//help generate unique email on every run

const generateEmail=()=>`testuser_${Date.now()}@gmail.com`;

// ─────────────────────────────────────────
// HAPPY PATH TESTS
// ─────────────────────────────────────────
test.describe('Register -Happy Path',()=>{


test("Should register successfully with valid details", async({page})=>{

const registerPage=new RegisterPage(page);
const uniqueEmail=generateEmail();

await registerPage.goto();
await registerPage.registerUser(
REGISTER.firstName,
REGISTER.lastName,
uniqueEmail,
REGISTER.password
);
await registerPage.assertRegistrationSuccess();
});


test("should redirect to homepage after registration", async({page})=>{

const registerPage=new RegisterPage(page);
const uniqueEmail=generateEmail();

await registerPage.goto();
await registerPage.registerUser(
REGISTER.firstName,
REGISTER.lastName,
uniqueEmail,
REGISTER.password
);

//click continue button after success 
await page.locator('.register-continue-button').click()

//should land on homepage
await expect(page).toHaveURL('/');
});
test("should show account link after registration", async({page})=>{

const registerPage=new RegisterPage(page);
const uniqueEmail=generateEmail();

await registerPage.goto();
await registerPage.registerUser(
REGISTER.firstName,
REGISTER.lastName,
uniqueEmail,
REGISTER.password
);

//click continue button after success 
await page.locator('.register-continue-button').click()
await registerPage.assertAccountLink(uniqueEmail);
});
});
// ─────────────────────────────────────────
// NEGATIVE / VALIDATION TESTS
// ─────────────────────────────────────────


test.describe('Register-validation and negative tests', () => {

  test('should show error when email already exists', async ({ page }) => {
    const registerPage1 = new RegisterPage(page);

    await registerPage1.goto();
    await registerPage1.registerUser(
      REGISTER.firstName,
      REGISTER.lastName,
      'lakshmishanmug2026@gmail.com',
      REGISTER.password
    );

    await expect(page.locator('.validation-summary-errors')).toBeVisible();
  });
});
test('should show error when passwords donot match', async ({ page }) => {

const registerPage=new RegisterPage(page);
await registerPage.goto();

    await page.locator('#FirstName').fill(REGISTER.firstName);
    await page.locator('#LastName').fill(REGISTER.lastName);
    await page.locator('#Email').fill(generateEmail());
    await page.locator('#Password').fill('Test@1234');
    await page.locator('#ConfirmPassword').fill('Different@5678'); // mismatch
    await page.locator('#register-button').click();

    await expect(
      page.locator('#ConfirmPassword')
    ).toBeVisible();
  });

test('should show error when all fields are empty',async({page})=>{

const registerPage=new RegisterPage(page);
await registerPage.goto();
await page.locator('#register-button').click();

const errors = await registerPage.getValidationErrors();
console.log(errors);

//multiple validation error should appear

await expect(page.getByText('First name is required.', { exact: true })).toBeVisible();
await expect(page.getByText('Last name is required.', { exact: true })).toBeVisible();
await expect(page.getByText('Email is required.', { exact: true })).toBeVisible();
await expect(page.getByText('Password is required.', { exact: true })).toHaveCount(2);
});

test('should show error for invalid email format',async({page})=>{

  const registerPage=new RegisterPage(page);

  await registerPage.goto();

  await registerPage.registerUser(
  REGISTER.firstName,
  REGISTER.lastName,
  'test.com',
  REGISTER.password)

await expect(page.locator("span[for='Email']")).toHaveText('Wrong email');

});

test('should show error when password is too short', async({page})=>{


const registerPage=new RegisterPage(page);

  await registerPage.goto();
await page.getByLabel('Female').check();
  await registerPage.registerUser(
  REGISTER.firstName,
  REGISTER.lastName,
 'Test123@gmail.com',
  '12345')
await expect(page.locator("span[for='Password']")).toHaveText('The password should have at least 6 characters.');

})

//npx playwright test tests/auth/register.spec.ts --headed
// /npx playwright test tests/auth/register.spec.ts --reporter=html
//npx playwright show-report