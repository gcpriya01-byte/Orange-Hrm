
import { expect } from '@playwright/test';

export default class LoginPage {
    constructor(page) {
        this.page = page;

        // Login page locators
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');

        this.loginButton = page.getByRole('button', {name: 'Login',exact: true});
        this.errorMessage = page.getByText('Invalid credentials', {exact: true});
        this.logo = page.locator('.orangehrm-login-branding img');

        // Dashboard locator
        this.dashboardHeading = page.getByRole('heading', {name: 'Dashboard',exact: true});}

        // Open the OrangeHRM login page
         async openApplication() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
            {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            }
        );

        console.log('Current URL:', this.page.url());
        console.log('Page title:', await this.page.title());
        await expect(this.username).toBeVisible({timeout: 15000});}

    // Enter credentials and submit the login form
        async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();}

    // Verify successful login
        async verifyDashboard() {
        await expect(this.dashboardHeading).toBeVisible({timeout: 15000});
    }
    // Verify unsuccessful login
       async verifyInvalidLogin() {
        await expect(this.errorMessage).toBeVisible({timeout: 10000});
    }

    // Verify the login page logo
    async verifyLogo() {await expect(this.logo).toBeVisible({
            timeout: 10000
        });
    }
}
