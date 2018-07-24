# Peanut Butter & Jellyvision Sandwich Shoppe

PB&J Sandwich Shoppe is a small app for calculating custom sandwich costs. You can find instructions for your tasks [here](INSTRUCTIONS.md).

## Getting Started

`npm i` in this directory will install all the libraries.

`npm start` in this directory will start the app in a browser.  Changes to it should auto-reload.

## Testing

Unit tests for the app use:

- Mocha (for running tests)
- Chai (for "expect" assertions)
- Enzyme (for working with React components)
- Mocha-Webpack (for helping Mocha and Webpack work together)

To run the unit tests for the app, run:
`npm run test`

## Linting

You can lint with `npm run lint`.

This repo uses ESLint. The ESLint configurations we use make some good suggestions, but they're not gospel.

If a particular Lint violation seems to you like not a violation, it's reasonable to use `eslint-disable-line`, `eslint-disable`, or edit the `.eslintrc`, provided you can give an explanation for your choice.
