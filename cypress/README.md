# PMT test instructions

## Unit testing

```
yarn test all
yarn test
yarn test:unit
```

<p align="center">
  <img alt="VS Code in action" src="https://j.gifs.com/79Vjlj.gif">
</p>

## Cypress.io end-to-end tests 🚀

[Cypress.io](https://www.cypress.io) is an open source, MIT licensed end-to-end test runner

## Folder structure

These folders hold the end-to-end tests and supporting files for the [Cypress Test Runner](https://github.com/cypress-io/cypress).

- [fixtures](fixtures) folder holds optional JSON data for mocking, [read more](https://on.cypress.io/fixture)
- [integration](integration) holds the actual test files, [read more](https://on.cypress.io/writing-and-organizing-tests)
- [plugins](plugins) allow you to customize how tests are loaded, [read more](https://on.cypress.io/plugins)
- [support](support) file runs before all tests and is a great place to write or load additional custom commands, [read more](https://on.cypress.io/writing-and-organizing-tests#Support-file)
  - [login](support/commands.js) test file for user login, run this test file before running tests
- [videos](videos)test evidence files
- [e2e](e2e) main test files, [read more](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test)
  - [components](e2e/components/) test files for important system components, [read more](https://docs.cypress.io/guides/component-testing/overview)
  - [pages](e2e/pages/) test files for system all pages, [read more](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test)
  - [UAT](e2e/UAT/) User acceptance test files for system users (admin, HR, employee), [read more](https://docs.cypress.io/guides/end-to-end-testing/writing-your-first-end-to-end-test)

## `cypress.json` file

You can configure project options in the [../cypress.json](../cypress.json) file, see [Cypress configuration doc](https://on.cypress.io/configuration).

## Scripts

1. Run test using UI cypress (e2e) and Start project

```sh
yarn dev
```

2. Run test using UI cypress (e2e)

```sh
yarn cy:open
```

3. Run test using CLI (e2e)

```sh
yarn cy:run
```

or

```sh
yarn test:headless
```

4. Get code coverage

```sh
yarn nyc report --reporter=text-summary
```

## Installed packages for testing

- "@testing-library/cypress"
- "@testing-library/jest-dom"
- "@testing-library/react"
- "@testing-library/user-event"
- "@cypress/code-coverage"
- "cypress"
- "eslint-plugin-cypress"

## More information

- [https://github.com/cypress.io/cypress](https://github.com/cypress.io/cypress)
- [https://docs.cypress.io/](https://docs.cypress.io/)
- [Writing your first Cypress test](https://on.cypress.io/intro)

## Code coverage

- [Code coverage](../coverage/lcov-report/src/index.html) is a measurement used to express which lines of code were executed by a test suite.
<p align="left">
  <img alt="Code coverage summary" src="https://i.ibb.co/3dDJKQZ/264522354-261ab52e-55a0-4f98-b3f7-abe7829c8333.png">
</p>

## Test case documentation

- [Test case documentation](https://docs.google.com/spreadsheets/d/1Mzpvc_XTZSpQiK-OjSR-Ca2DU-v9di0K/edit#gid=85863979) Before writing the test code, it is necessary to write the test case