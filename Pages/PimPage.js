
import { expect } from '@playwright/test';

export default class PIMPage {
    constructor(page) {
        this.page = page;

        // Navigation
        this.pimMenu = page.getByRole('link', {name: 'PIM',exact: true});
        this.addEmployeeButton = page.getByRole('link', {name: 'Add Employee',exact: true});
        this.employeeListButton = page.getByRole('link', {name: 'Employee List',exact: true});

        // Add Employee form
        this.firstName = page.getByPlaceholder('First Name');
        this.middleName = page.getByPlaceholder('Middle Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.saveButton = page.getByRole('button', {name: 'Save',exact: true});

        // Employee List filters
        this.employeeNameInput = page.locator('.oxd-form .oxd-autocomplete-text-input input').first();
        this.searchButton = page.getByRole('button', {name: 'Search',exact: true});
        this.resetButton = page.getByRole('button', {name: 'Reset',exact: true});

        // Employee table
        this.employeeRows = page.locator('.oxd-table-body .oxd-table-row');
        this.personalDetailsHeading = page.getByRole('heading', { name: 'Personal Details',exact: true});
    }

    // Navigate to PIM Employee List
    async navigateToPIM() {
        if (!this.page.url().includes('/pim/viewEmployeeList')) {
            await expect(this.pimMenu).toBeVisible({timeout: 15000});
            await this.pimMenu.click();
        }

        await expect(this.page).toHaveURL(/\/pim\/viewEmployeeList/,{ timeout: 15000 });
        await expect(this.searchButton).toBeVisible({timeout: 20000});
    }

    // Open Add Employee form
    async openAddEmployee() {
        await this.addEmployeeButton.click();
        await expect(this.page.getByRole('heading', {name: 'Add Employee',exact: true})).toBeVisible({ timeout: 15000 });
    }

    // Add an employee
    async addEmployee(firstName, middleName, lastName) {
        await this.firstName.fill(firstName);
        await this.middleName.fill(middleName);
        await this.lastName.fill(lastName);
        await this.saveButton.first().click();
    }

    // Verify employee was added
    async verifyEmployeeAdded() {
        await expect(this.page.getByText('Successfully Saved', {exact: false})).toBeVisible({ timeout: 15000 });
    }

    // Search using the Employee Name autocomplete
    async searchEmployee(lastName) {
        await this.navigateToPIM();
        await expect(this.employeeNameInput).toBeVisible({timeout: 15000});
        await this.employeeNameInput.fill(lastName);
        const suggestions = this.page.locator('.oxd-autocomplete-option' );
        // Wait for a suggestion matching the requested name.
        const matchingSuggestion = suggestions.filter({hasText: lastName}).first();
        await expect(matchingSuggestion).toBeVisible({timeout: 10000});
        console.log('Selected employee suggestion:',await matchingSuggestion.innerText());
        await matchingSuggestion.click();
        await this.searchButton.click();
        // Wait for the search results to render.
        await expect(this.page.locator('.oxd-table-body')).toBeVisible({ timeout: 15000 });
        // Log actual employee rows, not the locator count alone.
        const rowCount = await this.employeeRows.count();
        console.log('Search value:', lastName);
        console.log('Employee row count:', rowCount);
        for (let i = 0; i < rowCount; i++) {
            console.log(
                `Row ${i + 1}:`,
                await this.employeeRows.nth(i).innerText()
            );
        }
    }

    // Compatibility with existing step definitions
    async searchEmployeeByLastName(lastName) {
    await this.searchEmployee(lastName);
    }

    // Open an employee from the existing search results.
    // Does not repeat the search.
    async openSearchedEmployeeRecordByLastName(lastName) {
        const matchingRow = this.employeeRows.filter({hasText: lastName});
        await expect(matchingRow).toHaveCount(1, {timeout: 10000});
        await matchingRow.getByRole('button').first().click();
        await this.verifyPersonalDetails();
    }

    // Search and open in one method when needed
    async openEmployeeRecordByLastName(lastName) {
        await this.searchEmployee(lastName);
        await this.openSearchedEmployeeRecordByLastName(lastName);
    }

    // Verify Personal Details page
    async verifyPersonalDetails() {
        await expect(this.personalDetailsHeading).toBeVisible({timeout: 15000});
    }
}
