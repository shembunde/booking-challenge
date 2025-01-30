# e2e/features/login.feature
Feature: Invalid Login

  Scenario: Error message on invalid credentials
    Given I navigate to the login page
    When I enter "invalid_user" as username and "wrong_password" as password
    And I click the login button
    Then I see an error message "Invalid credentials"