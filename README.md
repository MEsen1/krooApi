### Installation

`Node.JS:` Install from the site - https://nodejs.org/en/ take the LTS version based on your Operating system. Please make sure you install NodeJS globally.

### Run Tests

To execute the entire test suite in local development, use:

`npm run test`.

To run test in docker container, create docker image:

`docker build -t <your-image-name> .`

Run the command within the container:

`docker run -it <your-image-name> npm run test`

### Logs

Complete set of execution `logs` will be generated during the run time and can be found in the parent folder location /logs.

### Reporters

##### Allure

To generate and view an allure report locally, run `npm run createReport`. A typical Allure report will look like this

![ScreenShot](https://github.com/allure-framework/allure2/blob/master/.github/allure-report-gif.gif)

### The Cucumber.js Framework

Cucumber.js is a JavaScript implementation of Cucumber, a tool for behavior-driven development (BDD). It allows you to write executable specifications in a human-readable format that can be understood by both technical and non-technical stakeholders. Cucumber.js combines the Gherkin language for writing feature files and the step definitions written in JavaScript to execute the tests.

Cucumber.js follows the Given-When-Then syntax, the step definitions provide the actual implementation of each step, allowing you to interact with the system and make assertions.

`Example Feature File (.feature)`

```
Feature: Login
  As a user
  I want to log in to my account
  So that I can access the protected resources

  Scenario: Successful login
    Given I am on the login page
    When I enter my username and password
    Then I should be redirected to the home page
```

`Example Step Definition File (.spec)`

```
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

Given('I am on the login page', function () {
  // Add code to navigate to the login page
});

When('I enter my username and password', function () {
  // Add code to enter username and password
});

Then('I should be redirected to the home page', function () {
  // Add code to assert the redirection to the home page
});
```
