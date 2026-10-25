
import { expect } from '@playwright/test';

export default class RecruitmentPage {
    constructor(page) {
        this.page = page;
        // Recruitment navigation
        this.recruitmentMenu = page.getByText('Recruitment',{ exact: true }
        );

        // Candidates page heading
        this.candidatesHeading = page.getByRole('heading',{name: 'Candidates',exact: true}
        );

        // Add Candidate button
        this.addButton = page.locator('button.oxd-button--secondary').filter({ hasText: 'Add' });
        // Candidate form fields
        this.firstName = page.getByPlaceholder('First Name');
        this.middleName = page.getByPlaceholder('Middle Name');
        this.lastName = page.getByPlaceholder('Last Name');

        // Email field: locate the input within the Email field group
        this.email = page.locator('.oxd-input-group').filter({has: page.getByText('Email', {exact: true})}).getByPlaceholder('Type here');

        // Save button
        this.saveButton = page.getByRole('button',{name: 'Save',exact: true});
        // Success message
        this.successMessage = page.getByText('Successfully Saved',{ exact: false }
        );

        // Candidate name search 
        this.candidateNameSearch = page.getByPlaceholder('Type for hints...');
        // Search button
        this.searchButton = page.getByRole('button',{name: 'Search',exact: true});
        // Candidate result rows
        this.candidateRows = page.locator('.oxd-table-body .oxd-table-row');
    }

    // Navigate to Recruitment
    async openRecruitment() {await this.recruitmentMenu.click();
    await expect(this.candidatesHeading).toBeVisible();
    }

    // Open Add Candidate form
    async clickAddCandidate() {await expect(this.candidatesHeading ).toBeVisible();
    await expect(this.addButton).toBeVisible();
    await this.addButton.click();}

    // Enter candidate details
    async addCandidate(candidateData) {
        if (candidateData.firstName) {
            await this.firstName.fill(
                candidateData.firstName
            );
        }

        if (candidateData.middleName !== undefined) {
            await this.middleName.fill(
                candidateData.middleName || ''
            );
        }

        if (candidateData.lastName) {
            await this.lastName.fill(
                candidateData.lastName
            );
        }

        if (candidateData.email) {
            await this.email.fill(
                candidateData.email
            );
        }
    }

    // Save candidate
    async saveCandidate() {
        await this.saveButton.click();
        await expect(this.successMessage).toBeVisible();
    }

  // Search for a candidate
   async searchCandidate(candidateName) {
    // Return to the Candidates list page
    await this.page.goto(
        'https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates');

    // Wait for the Candidates heading
    await expect(this.candidatesHeading).toBeVisible();
    // Enter candidate name in the search field
    await this.candidateNameSearch.fill(candidateName);
    // Select the matching suggestion if visible
    const suggestion = this.page.getByText(candidateName,{ exact: true });

    if (await suggestion.isVisible().catch(() => false)) {
        await suggestion.click();}

    // Click Search
    await this.searchButton.click();
}
    // Verify candidate exists
    async verifyCandidateExists(firstName, lastName) {
        const candidateRow = this.candidateRows
            .filter({ hasText: firstName })
            .filter({ hasText: lastName });

        await expect(candidateRow).toBeVisible();
    }
}
