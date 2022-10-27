const getOptionValues = ({ options }) => {
  return options.map((option) => option.value);
};

///////SKIN TYPES/////////

export const skinTypeOptions = [
  { displayValue: "Normal", value: "Normal" },
  { displayValue: "Oily", value: "Oily" },
  { displayValue: "Dry", value: "Dry" },
  { displayValue: "Combination", value: "Combination" },
  { displayValue: "Sensitive", value: "Sensitive" }
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
  { value: "Antipodes", displayValue: "Antipodes" },
  { value: "Biossance", displayValue: "Biossance" },
  { value: "Evolve Organic Beauty", displayValue: "Evolve Organic Beauty" },
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

export const configValues = {
  brandValues,
  skinTypeValues,
  skinConcernValues,
  productCharacteristicValues,
  productCategoryValues,
};

export const config = {
  brandOptions,
  skinConcernOptions,
  skinTypeOptions,
  productCharacteristicsOptions,
  productCategoryOptions,
};
