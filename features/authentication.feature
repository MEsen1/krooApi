@authentication
Feature: Authentication

    Scenario: Generate a Token
        Given I authenticate with username "admin" and password "password123"
        Then The response should have status code 200
        Then The token should be generated