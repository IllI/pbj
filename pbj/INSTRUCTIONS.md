# PB&J Sandwich Shoppe

## What's up?

One of our engineers put together this app for pricing out custom sandwiches from our company sandwich shoppe.
The shoppe has become popular, and our staff is complaining that the app is too hard to use. We need you to add some
 much-requested features.

The app was a bit of a rush job, and we've heard that it could use some refactoring and additional testing.
 Think about future refactoring opportunities as you work on the features.

## Feature request

The app was developed to help us price out custom options for our sandwiches,
but we still have to figure out the total cost on our own by adding the base
price to the custom costs. Since almost all of our sandwiches are custom,
it would be a lot easier if the app did the math for us!
We need you to update the app so default prices are configured at the 'pricingModel' level.

Here's a user story our project manager dropped off:

"As a sandwich maker, I want the app to include the base price of the sandwich in the
total calculation so that I don't have to do any extra math to determine how much a sandwich costs."

You can update the configuration with any prices you like; our sandwich-pricing experts will finalize
once this is ready for production! You will need to add a price for each sandwich
(i.e., the PB Triple Decker, PB&J, and PB Quad Decker will each need a base price).

You can find the configuration data in the `src/customizationData` directory. The README there explains the structure.

## Bug fix

Currently, users can select multiple sizes simultaneously for a sandwich.
 This doesn't really make sense, and we'd like you to prevent a user from being able to chose both options.

## What we are looking for

Your code will be evaluated for:
* Correctness - Does it meet the requirements?  Does it use tests to verify that it meets the requirements?
* Code Clarity - Is the code easy to understand, with appropriately named variables?  Is it documented?
* System Design - Is the code structured appropriately?  Does it reuse functions or components when appropriate?

## Submission

Along with your changes, please include a NOTES.md file that includes answers to the following questions:

1. Is the feature request clear? Did you feel like you needed more information?
2. Is there anything you would have done differently if you had more time or resources?
3. How could the code be structured differently to be easier to work with?
4. Is there anything else you think we should know?
