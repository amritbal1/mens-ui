const getOptionValues = ({ options }) => {
  return options.map((option) => option.value);
};

///////SKIN CONCERNS/////////

export const skinConcernOptions = [
  { displayValue: "Acne", value: "acne" },
  { displayValue: "Anti-Aging", value: "anti-aging" },
  { displayValue: "Dry Skin", value: "dry-skin" },
  { displayValue: "Sensitive Skin", value: "sensitive-skin" },
  { displayValue: "Oily Skin", value: "oily-skin" },
];

export const SKIN_CONCERN_ENUM = {
  acne: "Acne",
  "anti-aging": "Anti-Aging",
  "dry-skin": "Dry Skin",
  "sensitive-skin": "Sensitive Skin",
  "oily-skin": "Oily Skin",
};

const skinConcernValues = getOptionValues({ options: skinConcernOptions });

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
  skinConcernValues,
  productCategoryValues,
  withIngredientsValues,
  withoutIngredientsValues,
  ingredientsEnum,
};

export const config = {
  brandOptions,
  skinConcernOptions,
  productCategoryOptions,
  withIngredientsOptions,
  withoutIngredientsOptions,
};
