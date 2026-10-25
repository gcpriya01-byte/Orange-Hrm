import { test, expect } from '@playwright/test';
import LoginPage from '../Pages/LoginPage.js';
import testData from '../TestData/testdata.js';
// Test 1: Verify OrangeHRM login page
test('Verify OrangeHRM login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openApplication();
    // Verify URL
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Verify logo
    await loginPage.verifyLogo();
    // Verify username and password fields
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
});
//  Verify valid login
test('Verify valid login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openApplication();
    await loginPage.login(testData.login.username,
                          testData.login.password
    );

  });
// Verify invalid login
test('Verify invalid login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openApplication();
    await loginPage.login(testData.InvalidLogin.invalidUsername,
                           testData.InvalidLogin.invalidPassword
    );
    // Verify error message
    await loginPage.verifyInvalidLogin();
});
