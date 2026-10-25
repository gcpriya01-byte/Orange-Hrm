import { expect } from '@playwright/test';

class Utils {

    constructor(page) {
        this.page = page;
    }

    // Fill text field
    async fill(locator, value) {await locator.fill(value);}
    // Click element
    async click(locator) {await locator.click();}
    // Select option by label/value/index
    async selectOption(locator, option) {await locator.selectOption(option);}
    // Check checkbox/radio button
    async check(locator) {await locator.check();}
    // Wait for specified time
    async wait(milliseconds) {await this.page.waitForTimeout(milliseconds); }
   // Verify element is visible
    async verifyVisible(locator) {await expect(locator).toBeVisible();
    }
    // Verify element is not visible
    async verifyNotVisible(locator) {await expect(locator).toBeHidden();
    }
    // Verify input field is empty
    async verifyEmpty(locator) {await expect(locator).toHaveValue('');
    }
    // Verify error message
    async verifyErrorMessage(locator, message) {await expect(locator).toContainText(message);
    }
}
export default Utils;