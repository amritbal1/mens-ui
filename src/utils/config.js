// Product Categories Images
import * as moisturiser from "../images/moisturiser.jpg";
import * as cleanser from "../images/cleanser.jpeg";
import * as serum from "../images/serum.jpg";
import * as exfoliator from "../images/exfoliator.jpeg";
// Skin Concern Images
import * as drySkin from "../images/dry_skin.jpg";
import * as sensitiveSkin from "../images/sensitive_skin.jpg";
import * as oilySkin from "../images/oily_skin.jpg";
import * as antiAging from "../images/anti_aging.jpeg";
import * as acne from "../images/acne.jpg";

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
  { value: "The Ordinary", displayValue: "The Ordinary" },
  { value: "Dermalogica", displayValue: "Dermalogica" },
  { value: "Cosrx", displayValue: "Cosrx" },
  { value: "REN", displayValue: "REN" },
  { value: "CeraVe", displayValue: "CeraVe" },
  { value: "Sukin", displayValue: "Sukin" },
  { value: "Vichy", displayValue: "Vichy" },
  { value: "First Aid", displayValue: "First Aid" },
  { value: "La Roche Posay", displayValue: "La Roche Posay" },
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

//////////////////// CONFIG FOR NAVBAR DROPDOWNS /////////////
export const categoryConfig = [
  {
    name: "Moisturisers",
    key: "productCategories",
    value: "Moisturiser",
    imageUrl: moisturiser.default,
  },
  {
    name: "Cleansers",
    key: "productCategories",
    value: "Cleanser",
    imageUrl: cleanser.default,
  },
  {
    name: "Serums",
    key: "productCategories",
    value: "Serum",
    imageUrl: serum.default,
  },
  {
    name: "Exfoliators",
    key: "productCategories",
    value: "Exfoliator",
    imageUrl: exfoliator.default,
  },
];

export const skinConcernConfig = [
  {
    name: "Oily Skin",
    key: "skinConcerns",
    value: "oily-skin",
    imageUrl: oilySkin.default,
  },
  {
    name: "Dry Skin",
    key: "skinConcerns",
    value: "dry-skin",
    imageUrl: drySkin.default,
  },
  {
    name: "Sensitive Skin",
    key: "skinConcerns",
    value: "sensitive-skin",
    imageUrl: sensitiveSkin.default,
  },
  {
    name: "Anti Aging",
    key: "skinConcerns",
    value: "anti-aging",
    imageUrl: antiAging.default,
  },
  { name: "Acne", key: "skinConcerns", value: "acne", imageUrl: acne.default },
];
