
import { test, expect } from '@playwright/test';
import LoginPage from '../Pages/LoginPage.js';
import LogoutPage from '../Pages/LogoutPage.js';
import testData from '../TestData/testdata.js';

test('Verify successful logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const logoutPage = new LogoutPage(page);

    //Open the application
    await loginPage.openApplication();
    //  Log in with valid credentials
   await loginPage.login(
    testData.login.username,
    testData.login.password
);
    // Verify login was successful
    await expect(page).toHaveURL(/\/dashboard/);
    // Perform logout and verify
    await logoutPage.logout();
});
