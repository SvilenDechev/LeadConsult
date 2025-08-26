
# LeadConsult e2e tests

# Table of Content

- [Project Overview](#Project-overview)
- [Project set-up](#Project-set-up)
  - [NodeJS](#NodeJS)
  - [Dependencies installation](#Dependencies-installation)
- [Test execution](#Test-execution)
- [Test users and Test users state](#Test-users-and-Test-users-state)
- [Test data](#test-data)
- [Cover test cases](#Cover-test-cases)
- [Uncover test cases](#Uncover-test-cases)
- [Reporting](#Reporting)
- [2FA_Provider](#2FA_Provider)

# Project Overview

- For the e2e test purpose is used, Playwright.


# Project set-up

## NodeJS

NodeJS version:
`node v16.15.1 or higher`

Information for downloading and installation of NodeJS: - download: https://nodejs.org/en/download/ - install: https://nodejs.org/en/download/package-manager/#nvm

## Dependencies installation

  1. Clone the repository:
  2. Go to the project via terminal:
      ``` cd way/to/clone the repo```
  3. Execute the following command: ``` npm i ```

# Test execution

  1. Go to the project via terminal:
    - cd way/to/e2e-tests

  2. Execute the following command:
    - select one of the commands listed under scripts in the package.json file
    - for example - ```npm run play tests/ ```
    - to run all tests use ```npm playAllTets```


# Cover test cases
- The cover tests are provide by the task

# Uncover test cases
- 

# Reporting
- For reporting purpose is used Allure report. 
  After the test execution can see the allure report by follow command ``npm run allure-report`` this should be open the report

