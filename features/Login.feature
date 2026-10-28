
Feature: OrangeHRM Login

  Background:
    Given I open the OrangeHRM login page

  Scenario: Login with valid credentials
    When I log in with username "Admin" and password "admin123"
    Then I should see the OrangeHRM dashboard

  Scenario: Login with invalid credentials
    When I log in with username "Admin" and password "wrong123"
    Then I should see the invalid credentials message
