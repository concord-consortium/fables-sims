# FABLES simulations

This repository contains two simple Konva React projects.

## Development

    npm install
    npm update
    npm start

    ```
    Then, verify the project works by visiting [localhost:8080](http://localhost:8080)


    Verify that the test suite still passes:
    ```
    npm run test:full
    ```
    If the updates are functional, please commit any changes to `package.json` or `package-lock.json` back to the
    Starter Projects repository for future use.

### Building

If you want to build a local version run `npm build`, it will create the files in the `dist` folder.
You *do not* need to build to deploy the code, that is automatic.  See more info in the Deployment section below.

## Deployment

This project is deployed using github actions. If the tests pass, `npm build` is run and
code is deployed to an S3 website. For more details of the Github deployment process see
the file `.github/workflows/ci.yml` and `s3_deploy.sh`.


All branches are deployed to: https://fables-sims.concord.org/branch/<branchname>/

The production branch will be deployed to the root: https://fables-sims.concord.org/

The production version of the cart simulation is available at https://fables-sims.concord.org/branch/main/cart-index.html
The production version of the boat simulation is available at https://fables-sims.concord.org/branch/main/tugboat-index.html

### Notes

1. Make sure if you are using Visual Studio Code that you use the workspace version of TypeScript.
   To ensure that you are open a TypeScript file in VSC and then click on the version number next to
   `TypeScript React` in the status bar and select 'Use Workspace Version' in the popup menu.

## Deployment

Follow the instructions in this
[Guide](https://docs.google.com/document/d/1EacCSUhaHXaL8ll8xjcd4svyguEO-ipf5aF980-_q8E)
to setup an S3 & Cloudfront distribution that can be used with Github actions.
See also `s3_deploy.sh`, and `./github/ci.yml`.

Production releases to S3 are based on the contents of the /dist folder and are built automatically by GitHub Actions
for each branch pushed to GitHub and each merge into production.

Merges into production are deployed to http://starter-projects.concord.org.

Other branches are deployed to http://starter-projects.concord.org/branch/<name>.

To deploy a production release:

1. Increment version number in package.json
2. Create new entry in CHANGELOG.md
3. Run `git log --pretty=oneline --reverse <last release tag>...HEAD | grep '#' | grep -v Merge` and add contents (after edits if needed to CHANGELOG.md)
4. Run `npm run build`
5. Copy asset size markdown table from previous release and change sizes to match new sizes in `dist`
6. Create `release-<version>` branch and commit changes, push to GitHub, create PR and merge
7. Checkout master and pull
8. Checkout production
9. Run `git merge master --no-ff`
10. Push production to GitHub
11. Use https://github.com/concord-consortium/starter-projects/releases to create a new release tag

### Testing

Run `npm test` to run jest tests. Run `npm run test:full` to run jest and Cypress tests.

##### Cypress Run Options

Inside of your `package.json` file:
1. `--browser browser-name`: define browser for running tests
2. `--group group-name`: assign a group name for tests running
3. `--spec`: define the spec files to run
4. `--headed`: show cypress test runner GUI while running test (will exit by default when done)
5. `--no-exit`: keep cypress test runner GUI open when done running
6. `--record`: decide whether or not tests will have video recordings
7. `--key`: specify your secret record key
8. `--reporter`: specify a mocha reporter

##### Cypress Run Examples

1. `cypress run --browser chrome` will run cypress in a chrome browser
2. `cypress run --headed --no-exit` will open cypress test runner when tests begin to run, and it will remain open when tests are finished running.
3. `cypress run --spec 'cypress/integration/examples/smoke-test.js'` will point to a smoke-test file rather than running all of the test files for a project.

## License

Starter Projects are Copyright 2018 (c) by the Concord Consortium and is distributed under the [MIT license](http://www.opensource.org/licenses/MIT).

See license.md for the complete license text.
