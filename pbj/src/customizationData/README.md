# Customization Data

## options.json

This is the top-level configuration file for the application. It
specifies the various potential customizations for sandwiches.

Example:

```
{
  "watermelon": { // The customization tag
    "label": "Watermelon", // The label that shows up in the UI
    "type": "subtotal"
  }
}
```

There are three types of customizations:

### Subtotal

Type: `type`

Subtotals are specified in quantities that are added to the total.

### Toggle

Type: `toggle`

Toggles are either on or off, and the cost gets added to the total.

### Multiplier

Type: `multiplier`

Multipliers can be toggled on and off and will be multiplied against the
total.

## prices.json

This file specifies the menu that will be presented to the user. It is a
nested structure of categories, items, and delivery methods.

```
{
  "Sandwich": { // A category that will show up in the UI
    "PB&J": { // An item that will show up in the UI
      "In Store": { // A delivery method that will show up in the UI
        "banana": 1.5 // An attribute and associated cost
      }
    }
  }
}
```

