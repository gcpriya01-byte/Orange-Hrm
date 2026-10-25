
import { expect } from '@playwright/test';

export default class LogoutPage {
    constructor(page) {
        this.page = page;

        // Locators
        this.profileMenu = page.locator('.oxd-userdropdown-tab');
        this.logoutButton = page.getByText('Logout', { exact: true });
        this.loginHeading = page.getByRole('heading', { name: 'Login' });
    }

    // Click the profile menu
    async clickProfileMenu() {
    await this.profileMenu.click();
    }

    // Click Logout
    async clickLogout() {
    await this.logoutButton.click();
    }

    // Verify successful logout
    async verifyLogout() {
    await expect(this.page).toHaveURL(/\/auth\/login/);
    await expect(this.loginHeading).toBeVisible();
    }

    // Complete logout process
    async logout() {
    await this.clickProfileMenu();
    await this.clickLogout();
    await this.verifyLogout();
    }
}
