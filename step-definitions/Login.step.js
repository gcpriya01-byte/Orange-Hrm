
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import LoginPage from '../Pages/LoginPage.js';

// Open the OrangeHRM login page
Given('I open the OrangeHRM login page', async function () {
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.openApplication();
});

// Enter username and password and click Login
When('I log in with username {string} and password {string}',
    async function (username, password) {
    await this.loginPage.login(username, password);
    }
);

// Verify successful login
Then('I should see the OrangeHRM dashboard', async function () {
    await expect(this.page).toHaveURL(/dashboard/);
    await expect(this.page.getByRole('heading', {name: 'Dashboard',exact: true})).toBeVisible();
});

// Verify unsuccessful login
Then('I should see the invalid credentials message',
    async function () {await this.loginPage.verifyInvalidLogin();}
);
