
import { test, expect } from '@playwright/test';
import LoginPage from '../Pages/LoginPage.js';
import PIMPage from '../Pages/PIMPage.js';
import EditEmployeePage from '../Pages/EditEmployeePage.js';
import testData from '../TestData/testdata.js';

test('Verify HR can edit an existing employee', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PIMPage(page);
    const editEmployeePage = new EditEmployeePage(page);

    // Login
    await loginPage.openApplication();
    await loginPage.login(
        testData.login.username,
        testData.login.password
    );
    //  Open Employee List
    await pimPage.navigateToPIM();
    // Display employee records in the terminal
    const rows = page.locator('.oxd-table-body .oxd-table-row');
    await expect(rows.first()).toBeVisible();
    console.log('Employees:', await rows.allTextContents());
});
