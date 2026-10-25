
import { expect } from '@playwright/test';

export default class PIMPage {
    constructor(page) {
        this.page = page;

        // PIM navigation
        this.pimMenu = page.getByRole('link', {name: 'PIM'});
        // Add Employee
        this.addEmployeeButton = page.getByRole('link', {name: 'Add Employee'});
        this.firstName = page.getByPlaceholder('First Name');
        this.middleName = page.getByPlaceholder('Middle Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.saveButton = page.getByRole('button', {name: 'Save'});

        // Employee List
        this.employeeList = page.getByRole('link', {name: 'Employee List'});
       this.employeeNameSearch = this.page.locator('.oxd-input-group').filter({
        has: this.page.getByText('Employee Name', { exact: true })
        }).locator('input');
        this.searchButton = page.getByRole('button', {name: 'Search'});
        this.employeeRows = page.locator('.oxd-table-body .oxd-table-row' );
        // Personal Details
        this.personalDetailsHeading = page.getByRole('heading', {name: 'Personal Details'});
    }
    // Navigate to PIM
    async navigateToPIM() {
    await this.pimMenu.click();
    await expect(this.page).toHaveURL(/pim\/viewEmployeeList/);
    }

    // Open Add Employee page
    async openAddEmployee() {
    await this.addEmployeeButton.click();
    await expect(this.page.getByRole('heading', {name: 'Add Employee'})).toBeVisible();
    }

    // Add a new employee
    async addEmployee(firstName, middleName, lastName) {
        await this.firstName.fill(firstName);
        await this.middleName.fill(middleName);
        await this.lastName.fill(lastName);
        await this.saveButton.first().click();
    }

    // Verify employee was added
    async verifyEmployeeAdded() {
    await expect(this.page.getByText('Successfully Saved')).toBeVisible();
    }

    // Search for an employee
    async searchEmployee(firstName) {
    await expect(this.employeeNameSearch).toBeVisible();
    await this.employeeNameSearch.fill(firstName);

    // Wait for the employee suggestion
    const suggestion = this.page.locator('.oxd-autocomplete-option');
    await expect(suggestion.first()).toBeVisible({timeout: 10000});
    await suggestion.first().click();
    // Click Search
    await this.searchButton.click();
    // Wait for search results
    await expect(this.employeeRows.first()).toBeVisible({timeout: 10000});
}
   
async openEmployeeRecord(employeeId) {
const rows = this.page.locator('.oxd-table-body .oxd-table-row');
    // Print employee records in the terminal
    console.log(await rows.allTextContents());
    // Find the employee by ID
    const employeeRow = rows.filter({hasText: employeeId});
    await expect(employeeRow).toHaveCount(1);
    await employeeRow.click();
    // Check Personal Details page
    await this.verifyPersonalDetails();
}
    // Verify Personal Details page
    async verifyPersonalDetails() {
    await expect(this.personalDetailsHeading).toBeVisible();
    }
}
