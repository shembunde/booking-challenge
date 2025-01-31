Feature: User Authentication

  Scenario: Invalid login attempt
    Given I navigate to the login page
    When I enter "wrong@email.com" as email and "wrong_password" as password
    And I click the login button
    Then I should see an error message "These credentials do not match our records"