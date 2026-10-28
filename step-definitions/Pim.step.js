
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import PIMPage from '../Pages/PimPage.js';

Given('I am in the PIM module', async function () {
    this.pimPage = new PIMPage(this.page);
    await this.pimPage.navigateToPIM();
});

When('I navigate to the PIM module', async function () {
    this.pimPage = new PIMPage(this.page);
    await this.pimPage.navigateToPIM();
});

Then('I should see the Employee List page', async function () {
    await expect(this.page).toHaveURL(/pim\/viewEmployeeList/);
    await expect(this.page.getByRole('heading', {name: 'Employee Information'})).toBeVisible();
});

When('I open the Add Employee page', async function () {
    await this.pimPage.openAddEmployee();
});

Then('I should see the Add Employee form', async function () {
    await expect(this.page.getByRole('heading', {name: 'Add Employee'})).toBeVisible();
});

When('I add an employee with first name {string}, middle name {string}, and last name {string}',
    async function (firstName, middleName, lastName) {
        await this.pimPage.addEmployee(
            firstName,
            middleName,
            lastName
        );
    }
);

Then('the employee should be saved successfully', async function () {
    await this.pimPage.verifyEmployeeAdded();
});
