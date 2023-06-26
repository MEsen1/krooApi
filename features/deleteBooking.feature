@deleteBooking
Feature: Delete Booking

    Scenario: Delete a booking
        Given I have a booking with given ID
        When I send a DELETE request to "/booking/{bookingid}"
        Then the booking should be deleted successfully
