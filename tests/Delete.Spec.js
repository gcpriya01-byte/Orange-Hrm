
import { test } from '@playwright/test';
import LoginPage from '../Pages/LoginPage.js';
import PIMPage from '../Pages/PIMPage.js';
import DeleteEmployeePage from '../Pages/DeleteEmployeePage.js';
import testData from '../TestData/testdata.js';

test('Verify HR can delete an employee by last name', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const pimPage = new PIMPage(page);
    const deleteEmployeePage = new DeleteEmployeePage(page);
   // Log in
    await loginPage.openApplication();
    await loginPage.login(
        testData.login.username,
        testData.login.password
    );
    //  Open Employee List
    await pimPage.navigateToPIM();
    // Search for the employee
    await pimPage.searchEmployee('Priya');
    // Delete using last name
    await deleteEmployeePage.deleteEmployeeByLastName('Automation');
    // verify deletion
    await deleteEmployeePage.verifyEmployeeDeletedByLastName('Automation');
});
