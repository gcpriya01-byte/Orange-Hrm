
import { expect } from '@playwright/test';

export default class LoginPage {
    constructor(page) {
        this.page = page;

        // Locators
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');

        this.loginButton = page.getByRole('button', {
            name: 'Login',
            exact: true
        });

        this.errorMessage = page.getByText('Invalid credentials', {
            exact: true
        });

        this.logo = page.locator('.orangehrm-login-branding img');
    }

    // Open OrangeHRM login page
    async openApplication() {
        await this.page.goto(
            'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
            {
                waitUntil: 'domcontentloaded',
                timeout: 60000
            }
        );
    }

    // Enter username and password, then click Login
    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    // Verify invalid login error
    async verifyInvalidLogin() {
        await expect(this.errorMessage).toBeVisible();
    }

    // Verify OrangeHRM logo
    async verifyLogo() {
        await expect(this.logo).toBeVisible();
    }
}
