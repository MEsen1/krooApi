@updateBooking
Feature: Booking Update

    Scenario: Update booking
        Given I have a booking with given ID
        When I send a PUT request to "/booking/{bookingid}" with updated details
        Then The booking should be updated successfully

    Scenario: Partially update booking
        Given I have a booking with given ID
        When I send a PATCH request to "/booking/{bookingid}" with partial updates
        Then The booking should be partially updated successfully
