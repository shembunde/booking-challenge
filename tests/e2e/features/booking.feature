Feature: Tour Booking Management

  Background:
    Given the following tours exist:
      | name          | price | slots | destination       |
      | Safari Adventure | 500  | 10    | Maasai Mara       |
      | Beach Getaway | 300   | 15    | Mombasa Coast     |

  Scenario: Book tour as guest
    When I visit the home page
    And I select the "Safari Adventure" tour
    And I book as guest with:
      | name  | email              |
      | John  | john@example.com   |
    Then I should see booking confirmation

  Scenario: Admin creates new tour
    Given I am logged in as admin
    When I create a new tour with:
      | name           |  Coast Vacation |
      | price          | 600            |
      | slots          | 15             |
      | description    | chilling at the beach |
      | destination    | Kilifi Beach     |
    Then I should see "coast Vacation" in tours list

  Scenario: View bookings and tickets
    Given I am logged in as admin
    When I view all bookings
    Then I should see at least 1 booking
    When I view all tickets
    Then I should see at least 1 ticket