import { CATEGORIES } from "../../enums";

//Categories
//import * as exfoliator from "../../config/images/categories/exfoliator.png";
import * as moisturiser from "../../config/images/categories/moisturiser.png";
import * as cleanser from "../../config/images/categories/cleanser.png";
//Skin Types
import * as combination from "../../config/images/skinTypes/combination.png";
import * as sensitive from "../../config/images/skinTypes/sensitive.png";
import * as oily from "../../config/images/skinTypes/oily.png";
import * as dry from "../../config/images/skinConcerns/dryness.png";
//Skin Concerns
import * as shine from "../../config/images/skinConcerns/shine.png";
import * as aging from "../../config/images/skinConcerns/aging.png";
import * as pigmentation from "../../config/images/skinConcerns/pigmentation.png";
import * as dryness from "../../config/images/skinConcerns/dryness.png";
import * as breakout from "../../config/images/skinConcerns/breakout.png";

export const skincareConfig = {
  name: CATEGORIES.SKINCARE,
  subcategories: [
    {
      displayValue: "Moisturiser",
      value: "Moisturiser",
      imageUrl: moisturiser.default,
    },
    {
      displayValue: "Cleanser",
      value: "Cleanser",
      imageUrl: cleanser.default,
    },
  ],
  reviews: [
    {
      criteria: "skinType",
      options: [
        { displayValue: "Oily", value: "Oily", imageUrl: oily.default },
        { displayValue: "Dry", value: "Dry", imageUrl: dry.default },
        {
          displayValue: "Combination",
          value: "Combination",
          imageUrl: combination.default,
        },
        {
          displayValue: "Sensitive",
          value: "Sensitive",
          imageUrl: sensitive.default,
        },
      ],
    },
    {
      criteria: "skinConcern",
      options: [
        {
          displayValue: "Aging",
          value: "Aging",
          imageUrl: aging.default,
        },
        {
          displayValue: "Pigmentation",
          value: "Pigmentation",
          imageUrl: pigmentation.default,
        },
        {
          displayValue: "Oiliness",
          value: "Oiliness",
          imageUrl: shine.default,
        },
        {
          displayValue: "Breakouts",
          value: "Breakout",
          imageUrl: breakout.default,
        },
        {
          displayValue: "Dryness",
          value: "Dryness",
          imageUrl: dryness.default,
        },
      ],
    },
  ],
};
