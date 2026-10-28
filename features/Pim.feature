
Feature: OrangeHRM PIM Employee Management

  Background:
    Given I open the OrangeHRM login page
    When I log in with username "Admin" and password "admin123"
    Then I should see the OrangeHRM dashboard
  
  Scenario: Navigate to the PIM employee list
    When I navigate to the PIM module
    Then I should see the Employee List page

  
  Scenario: Open the Add Employee page
    Given I am in the PIM module
    When I open the Add Employee page
    Then I should see the Add Employee form


  Scenario: Add a new employee
    Given I am in the PIM module
    When I open the Add Employee page
    And I add an employee with first name "PriyaBDD", middle name "Test", and last name "Employee"
    Then the employee should be saved successfully
