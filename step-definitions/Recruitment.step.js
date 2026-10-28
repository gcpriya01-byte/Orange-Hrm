
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import RecruitmentPage from '../Pages/RecruitmentPage.js';

Given('I am in the Recruitment module', async function () {
    this.recruitmentPage = new RecruitmentPage(this.page);
    await this.recruitmentPage.openRecruitment();
});

When('I open the Recruitment module', async function () {
    this.recruitmentPage = new RecruitmentPage(this.page);
    await this.recruitmentPage.openRecruitment();
});

Then('I should see the Candidates tab', async function () {
    await expect(this.recruitmentPage.candidatesHeading).toBeVisible();
});

When('I open the Vacancies tab', async function () {
    await this.page.getByRole('link', {name: 'Vacancies',exact: true}).click();
});

Then('I should see the Vacancies page', async function () {
    await expect(this.page.getByRole('heading', {name: 'Vacancies',exact: true})).toBeVisible();
});

When('I open the Add Candidate form', async function () {
    await this.recruitmentPage.clickAddCandidate();
});

When(
    'I add a candidate with first name {string}, middle name {string}, last name {string}, and email {string}',
    async function (firstName, middleName, lastName, email) {
        await this.recruitmentPage.addCandidate({firstName,middleName,lastName,email});
    }
);

When('I save the candidate', async function () {
    await this.recruitmentPage.saveCandidate();
});

Then('the candidate should be saved successfully', async function () {
    await expect(this.recruitmentPage.successMessage).toBeVisible();
});

When('I search for candidate {string}', async function (candidateName) {
    await this.recruitmentPage.searchCandidate(candidateName);
});

Then('I should find candidate with first name {string} and last name {string}',
    async function (firstName, lastName) {
        await this.recruitmentPage.verifyCandidateExists(firstName,lastName);
    }
);
