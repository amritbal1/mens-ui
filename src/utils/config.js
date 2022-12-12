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
  { value: "Malin + Goetz", displayValue: "Malin + Goetz" },
  { value: "Anthony", displayValue: "Anthony" },
  { value: "Kiehl's", displayValue: "Kiehl's" },
  { value: "Aesop", displayValue: "Aesop" },
  { value: "Vichy", displayValue: "Vichy" },
  { value: "La Roche Posay", displayValue: "La Roche Posay" },
  { value: "Medik8", displayValue: "Medik8" },
  { value: "de Mamiel", displayValue: "de Mamiel" },
  { value: "Grown Alchemist", displayValue: "Grown Alchemist" },
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
    imageUrl: "https://s3.eu-west-1.amazonaws.com/nova-s3-media/products/grown_alchemist_age_repair_cream/image_1.png",
  },
  {
    name: "Cleansers",
    key: "productCategories",
    value: "Cleanser",
    imageUrl: "https://s3.eu-west-1.amazonaws.com/nova-s3-media/products/grown_alchemist_gel_cleanser/image_1.png",
  },
  {
    name: "Serums",
    key: "productCategories",
    value: "Serum",
    imageUrl: "https://s3.eu-west-1.amazonaws.com/nova-s3-media/products/aesop_parsley_serum/image_1.png",
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
