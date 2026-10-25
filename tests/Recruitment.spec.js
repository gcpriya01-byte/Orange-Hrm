import { test, expect } from '@playwright/test';
import LoginPage from '../Pages/LoginPage.js';
import RecruitmentPage from '../Pages/RecruitmentPage.js';
import testData from '../TestData/testdata.js';

test('E2E - Login, add candidate and verify candidate is saved', async ({ page }) => {

    //  Login to OrangeHRM
    const loginPage = new LoginPage(page);

    await loginPage.openApplication();

    await loginPage.login(
        testData.login.username,
        testData.login.password
    );

    //  Verify successful login
    await expect(page).toHaveURL(/dashboard/);

    //  Navigate to Recruitment
    const recruitmentPage = new RecruitmentPage(page);
    await recruitmentPage.openRecruitment();

    //  Open Add Candidate form
    await recruitmentPage.clickAddCandidate();

    //  Enter candidate details
    const candidateData = {
        firstName: 'Priya',
        middleName: 'GCP',
        lastName: 'Automation',
        email: 'priya.e2e@example.com'
    };

    await recruitmentPage.addCandidate(candidateData);
    //  Save candidate
    await recruitmentPage.saveCandidate();

    //  Verify successful save message
    await expect(
        recruitmentPage.successMessage
    ).toBeVisible();

    //  Search for the newly created candidate
    await recruitmentPage.searchCandidate(
        `${candidateData.firstName} ${candidateData.lastName}`
    );

    //  Verify candidate appears in the results
    await recruitmentPage.verifyCandidateExists(
        candidateData.firstName,
        candidateData.lastName
    );
});