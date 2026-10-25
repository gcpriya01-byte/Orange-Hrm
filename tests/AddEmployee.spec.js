
import { test } from '@playwright/test';
import LoginPage from '../Pages/LoginPage.js';
import PIMPage from '../Pages/PIMPage.js';
import testData from '../TestData/testdata.js';

test('Verify HR can add a new employee', async ({ page }) => {
    // Create page objects
    const loginPage = new LoginPage(page);
    const pimPage = new PIMPage(page);
    //  Open OrangeHRM
    await loginPage.openApplication();
    //  Login
    await loginPage.login(testData.login.username,
                       testData.login.password);
    // Navigate to PIM
    await pimPage.navigateToPIM();
    
    // Open Add Employee
    await pimPage.openAddEmployee();
    // Enter employee details and save
    await pimPage.addEmployee(testData.employee.firstName,
                              testData.employee.middleName,
                               testData.employee.lastName);
    // Verify employee was added
    await pimPage.verifyEmployeeAdded();
});
