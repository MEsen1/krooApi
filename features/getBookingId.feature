@getBookingId
Feature: Booking Information Retrieval

    Scenario: Retrieve booking ID by surname and lastname
        Given I send a GET request to "/booking" with firstname and lastname queries
        When I receive a booking ID
        Then Booking ID filter by name should match with created user's ID

    Scenario: Retrieve booking ID by check-in and check-out dates
        Given I send a GET request to "/booking" with checkin and checkout queries
        When I receive a booking ID
        Then Booking ID filter by checkin/checkout date should match with created user's ID
