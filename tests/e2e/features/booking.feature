# e2e/features/admin_guest.feature
Feature: Admin and Guest Actions

  Scenario: Book Tour as Guest
    Given I am on the home page
    When I select the first tour and book as guest
    Then a booking confirmation is displayed

  Scenario: Admin Creates a Tour
    Given I login as admin with username "admin" and password "admin123"
    When I create a new tour with name "Safari Adventure", slots "10", price "$500", and description "Explore the wild"
    Then the tour "Safari Adventure" appears in the tours list

  Scenario: View All Bookings and Tickets
    Given I login as admin with username "admin" and password "admin123"
    When I navigate to the bookings page
    Then I see a list of all bookings
    When I navigate to the tickets page
    Then I see all generated tickets
