import { config } from "../config";
import { FILTER_PILL_NAME } from "../enums";

export const getFilterPillsConfig = ({
  withImages = false,
  showBrandsPill = true,
  showPricePill = false,
  showProductCategories = false,
}) => {
  const {
    brandOptions: brands,
    productCharacteristicsOptions: productCharacteristics,
    skinConcernOptions: skinConcerns,
    skinTypeOptions: skinTypes,
    productCategoryOptions: productCategories,
  } = config;
  let baseOptions = [];

  //OPTIONAL PILLS
  const brandsPill = {
    label: FILTER_PILL_NAME.BRANDS,
    data: brands,
    filterField: "filterBrandValues",
    allValuesField: "allBrandValues",
  };
  const productCategoriesPill = {
    label: FILTER_PILL_NAME.PRODUCT_CATEGORIES,
    data: productCategories,
    filterField: "filterProductCategoryValues",
    allValuesField: "allProductCategoryValues",
  };
  const imagesPill = {
    label: FILTER_PILL_NAME.WITH_IMAGES,
    filterField: "filterWithImages",
    isChoicePill: true, //choice pill only have a true/false value, no dropdown
  };
  //TODO: Add the commented out code below when we add affiliate links and need price filter pills
  // const pricePill = {
  //   label: FILTER_PILL_NAME.PRICE,
  //   filterField: "filterMinPrice",
  // };

  if (showProductCategories) {
    baseOptions = [...baseOptions, productCategoriesPill];
  }
  if (showBrandsPill) {
    baseOptions = [...baseOptions, brandsPill];
  }
  if (withImages) {
    baseOptions = [...baseOptions, imagesPill];
  }

  //NON-OPTIONAL PILLS
  baseOptions = [
    ...baseOptions,
    {
      label: FILTER_PILL_NAME.RATING,
      filterField: "filterStarRating",
    },
    {
      label: FILTER_PILL_NAME.SKIN_TYPES,
      data: skinTypes,
      filterField: "filterSkinTypeValues",
      allValuesField: "allSkinTypeValues",
    },
    {
      label: FILTER_PILL_NAME.SKIN_CONCERNS,
      data: skinConcerns,
      filterField: "filterSkinConcernValues",
      allValuesField: "allSkinConcernValues",
    },
    {
      label: FILTER_PILL_NAME.PRODUCT_CHARACTERISTICS,
      data: productCharacteristics,
      filterField: "filterProductCharacteristicValues",
      allValuesField: "allProductCharacteristicValues",
    },
  ];

  return baseOptions;
};
