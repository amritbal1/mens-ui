import { CATEGORIES } from "../../enums";

//Categories
//import * as exfoliator from "../../config/images/categories/exfoliator.png";
import * as moisturiser from "../../config/images/categories/moisturiser.png";
import * as cleanser from "../../config/images/categories/cleanser.png";
//Skin Types
import * as combination from "../../config/images/skinTypes/combination.png";
import * as mature from "../../config/images/skinTypes/mature.png";
import * as sensitive from "../../config/images/skinTypes/sensitive.png";
import * as oily from "../../config/images/skinTypes/oily.png";
import * as dry from "../../config/images/skinTypes/dry.png";
import * as normal from "../../config/images/skinTypes/normal.png";
//Skin Concerns
import * as shine from "../../config/images/skinConcerns/shine.png";
import * as aging from "../../config/images/skinConcerns/aging.png";
import * as redness from "../../config/images/skinConcerns/redness.png";
import * as darkcircles from "../../config/images/skinConcerns/darkcircles.png";
import * as pigmentation from "../../config/images/skinConcerns/pigmentation.png";
import * as dullness from "../../config/images/skinConcerns/dullness.png";
import * as acne from "../../config/images/skinConcerns/acne.png";

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
    // {
    //   displayValue: "Eye Care",
    //   value: "Eye Care",
    //   imageUrl: exfoliator.default,
    // },
    // {
    //   displayValue: "Serum",
    //   value: "Serum",
    //   imageUrl: exfoliator.default,
    // },
  ],
  reviews: [
    {
      criteria: "skinType",
      options: [
        { displayValue: "Normal", value: "Normal", imageUrl: normal.default },
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
        { displayValue: "Mature", value: "Mature", imageUrl: mature.default },
      ],
    },
    {
      criteria: "skinConcern",
      options: [
        { displayValue: "Acne", value: "Acne", imageUrl: acne.default },
        {
          displayValue: "Aging",
          value: "Aging",
          imageUrl: aging.default,
        },
        {
          displayValue: "Dark Circles",
          value: "Dark Circles",
          imageUrl: darkcircles.default,
        },
        {
          displayValue: "Dullness",
          value: "Dullness",
          imageUrl: dullness.default,
        },
        {
          displayValue: "Pigmentation",
          value: "Pigmentation",
          imageUrl: pigmentation.default,
        },
        {
          displayValue: "Redness",
          value: "Redness",
          imageUrl: redness.default,
        },
        {
          displayValue: "Pores & Blackheads",
          value: "Pores",
          imageUrl: acne.default,
        },
        {
          displayValue: "Shine & Oiliness",
          value: "Oiliness",
          imageUrl: shine.default,
        },
      ],
    },
  ],
};
