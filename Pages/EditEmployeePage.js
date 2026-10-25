
import { expect } from '@playwright/test';
export default class EditEmployeePage {
    constructor(page) {
        this.page = page;

        // Personal Details fields
        this.firstName = page.locator('input[name="firstName"]');
        this.middleName = page.locator('input[name="middleName"]');
        this.lastName = page.locator('input[name="lastName"]');

        // Save button
        this.saveButton = page.getByRole('button', {name: 'Save' }).first();
        // Personal Details heading
        this.personalDetailsHeading = page.getByRole('heading', {name: 'Personal Details'});
    }

    // Verify Personal Details page is open
    async verifyPersonalDetailsPage() {
    await expect(this.personalDetailsHeading).toBeVisible();
    }
    // Update employee details
    async updateEmployeeDetails(firstName, middleName, lastName) {
        await this.verifyPersonalDetailsPage();
        await this.firstName.fill(firstName);
        await this.middleName.fill(middleName);
        await this.lastName.fill(lastName);
        await this.saveButton.click();
    }
    // Verify employee details were updated
    async verifyEmployeeUpdated() {
        await expect( this.page.getByText('Successfully Updated')).toBeVisible();
    }
}
