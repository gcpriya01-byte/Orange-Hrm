
Feature: OrangeHRM Recruitment Module

  Background:
    Given I open the OrangeHRM login page
    When I log in with username "Admin" and password "admin123"
    Then I should see the OrangeHRM dashboard

  Scenario: Open the Recruitment module
    When I open the Recruitment module
    Then I should see the Candidates tab

  Scenario: Open the Vacancies page
    Given I am in the Recruitment module
    When I open the Vacancies tab
    Then I should see the Vacancies page
