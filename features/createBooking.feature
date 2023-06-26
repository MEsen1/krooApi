@createBooking
Feature: Create Booking

    Scenario: Create a new booking
        When I send a POST request to "/booking" with a valid body:
        Then The response should have status code 200
        * The response should have a bookingid

    Scenario: Verify created booking details
        Given I have a valid bookingid obtained from the create booking request
        When I send a GET request to "/booking/{bookingid}"
        Then The response should have the body properties that has been sent
