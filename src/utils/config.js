const getOptionValues = ({ options }) => {
  return options.map((option) => option.value);
};

///////SKIN TYPES/////////

export const skinTypeOptions = [
  { displayValue: "Normal", value: "Normal" },
  { displayValue: "Oily", value: "Oily" },
  { displayValue: "Dry", value: "Dry" },
  { displayValue: "Combination", value: "Combination" },
  { displayValue: "Sensitive", value: "Sensitive" },
];

const skinTypeValues = getOptionValues({ options: skinTypeOptions });

///////SKIN CONCERNS/////////

export const skinConcernOptions = [
  { displayValue: "Breakouts", value: "Breakout" },
  { displayValue: "Aging", value: "Aging" },
  { displayValue: "Dryness", value: "Dryness" },
  { displayValue: "Pigmentation", value: "Pigmentation" },
  { displayValue: "Redness", value: "Redness" },
  { displayValue: "Pores", value: "Pores" },
  { displayValue: "Shine & Oiliness", value: "Oiliness" },
  { displayValue: "Eczema", value: "Eczema" },
  { displayValue: "Rosacea", value: "Rosacea" },
];

const skinConcernValues = getOptionValues({ options: skinConcernOptions });

///////PRODUCT CHARACTERISTICS/////////

//These are to display in filter pills - the displayValue has slightly different wording to the review form options below
export const productCharacteristicsOptions = [
  { displayValue: "Absorbs well", value: "doesAbsorb" },
  { displayValue: "Gentle", value: "isGentle" },
  { displayValue: "Hydrating", value: "isHydrating" },
  { displayValue: "Lightweight", value: "isLightweight" },
];

//These are for the review form
export const productCharacteristics = [
  { displayValue: "Does it absorb well?", value: "doesAbsorb" },
  { displayValue: "Is it irritating?", value: "isGentle" },
  { displayValue: "Is it hydrating?", value: "isHydrating" },
  { displayValue: "Is it lightweight?", value: "isLightweight" },
];

const productCharacteristicValues = getOptionValues({
  options: productCharacteristics,
});

export const PRODUCT_CHARACTERISTICS_MAP = {
  doesAbsorb: "Absorbs well",
  isGentle: "Gentle",
  isHydrating: "Hydrating",
  isLightweight: "Lightweight",
};

export const PRODUCT_CHARACTERISTICS_MAP_REVIEW_PAGE = {
  doesAbsorb: "Absorbs well",
  isGentle: "Gentle on skin",
  isHydrating: "Hydrating",
  isLightweight: "Lightweight",
};

///////BRANDS/////////

const brandOptions = [
  { value: "Elemis", displayValue: "Elemis" },
  { value: "La Roche Posay", displayValue: "La Roche Posay" },
  { value: "First Aid", displayValue: "First Aid" },
  { value: "Kora Organics", displayValue: "Kora Organics" },
];

const brandValues = getOptionValues({ options: brandOptions });

////////////// PRODUCT CATEGORIES //////////////
const productCategoryOptions = [
  { displayValue: "Moisturiser", value: "Moisturiser" },
  { displayValue: "Cleanser", value: "Cleanser" },
  { displayValue: "Serum", value: "Serum" },
];

const productCategoryValues = getOptionValues({
  options: productCategoryOptions,
});

////////////// WITH INGREDIENTS //////////////
const ingredientsEnum = {
  "Sodium Hyaluronate": "Hyaluronic Acid",
  Retinol: "Retinol",
  "Salicylic Acid": "BHA",
  "Lactic Acid": "AHA",
  "Ascorbic Acid": "Vitamin C",
  Niacinamide: "Niacinamide",
  Squalane: "Squalane",
  Urea: "Urea",
  "Diazolidinyl Urea": "Diazolidinyl Urea",
  "Alpha-Arbutin": "Arbutin",
};
const withIngredientsOptions = [
  { displayValue: "Hyaluronic Acid", value: "Sodium Hyaluronate" },
  { displayValue: "Retinol", value: "Retinol" },
  { displayValue: "BHA", value: "Salicylic Acid" },
  { displayValue: "AHA", value: "Lactic Acid" }, //add glycolic acid
  { displayValue: "Vitamin C", value: "Ascorbic Acid" },
  { displayValue: "Niacinamide", value: "Niacinamide" },
  { displayValue: "Squalane", value: "Squalane" },
  { displayValue: "Urea", value: "Urea" },
  { displayValue: "Diazolidinyl Urea", value: "Diazolidinyl Urea" },
  { displayValue: "Arbutin", value: "Alpha-Arbutin" },
];

const withIngredientsValues = getOptionValues({
  options: withIngredientsOptions,
});

////////////// WITHOUT INGREDIENTS //////////////
const withoutIngredientsOptions = [
  { displayValue: "Hyaluronic Acid", value: "Sodium Hyaluronate" },
  { displayValue: "Retinol", value: "Retinol" },
  { displayValue: "BHA", value: "Salicylic Acid" },
  { displayValue: "AHA", value: "Lactic Acid" }, //add glycolic acid
  { displayValue: "Vit C", value: "Ascorbic Acid" },
  { displayValue: "Niacinamide", value: "Niacinamide" },
  { displayValue: "Squalane", value: "Squalane" },
  { displayValue: "Urea", value: "Urea" },
  { displayValue: "Diazolidinyl Urea", value: "Diazolidinyl Urea" },
  { displayValue: "Arbutin", value: "Alpha-Arbutin" },
];

const withoutIngredientsValues = getOptionValues({
  options: withoutIngredientsOptions,
});

export const configValues = {
  brandValues,
  skinTypeValues,
  skinConcernValues,
  productCharacteristicValues,
  productCategoryValues,
  withIngredientsValues,
  withoutIngredientsValues,
  ingredientsEnum
};

export const config = {
  brandOptions,
  skinConcernOptions,
  skinTypeOptions,
  productCharacteristicsOptions,
  productCategoryOptions,
  withIngredientsOptions,
  withoutIngredientsOptions,
};
