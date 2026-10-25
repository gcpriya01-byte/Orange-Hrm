
import { expect } from '@playwright/test';
export default class DeleteEmployeePage {
    constructor(page) {
        this.page = page;
        this.employeeRows = page.locator('.oxd-table-body .oxd-table-row');
        this.confirmDeleteButton = page.getByRole('button', { name: 'Yes, Delete'});
        this.successMessage = page.getByText('Successfully Deleted',{ exact: false });
    }

    async deleteEmployeeByLastName(lastName) {
        // Find the employee by last name
        const employeeRow = this.employeeRows.filter({hasText: lastName});
        // Make sure only one employee matches
        await expect(employeeRow).toHaveCount(1);
        // Click the Delete button 
        await employeeRow.getByRole('button').nth(1).click();
        // Confirm deletion
        await expect(this.confirmDeleteButton).toBeVisible();
        await this.confirmDeleteButton.click();
        // Verify success message
        await expect(this.successMessage).toBeVisible();
    }
    async verifyEmployeeDeletedByLastName(lastName) {
        const employeeRow = this.employeeRows.filter({hasText: lastName});
        // Confirm the employee is no longer displayed
        await expect(employeeRow).toHaveCount(0);
    }
}
