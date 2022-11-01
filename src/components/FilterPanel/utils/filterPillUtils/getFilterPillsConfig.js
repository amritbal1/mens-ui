import { config } from "../../../../utils/config.js";
import { FILTER_PILL_NAME } from "../../../../utils/enums.js";

export const getFilterPillsConfig = ({ filterOptionClickFn }) => {
  const {
    productCategoryOptions: productCategories,
    withIngredientsOptions,
    withoutIngredientsOptions,
  } = config;

  const productCategoriesPill = {
    label: FILTER_PILL_NAME.PRODUCT_CATEGORIES,
    data: productCategories,
    filterField: "filterProductCategoryValues",
    allValuesField: "productCategoryValues",
    urlParam: "productCategories",
    filterOptionClickFn: filterOptionClickFn,
    isSingleSelect: false,
  };

  const withIngredientsPill = {
    label: FILTER_PILL_NAME.WITH_INGREDIENTS,
    data: withIngredientsOptions,
    filterField: "filterWithIngredientsValues",
    allValuesField: "withIngredientsValues",
    urlParam: "withIngredients",
    filterOptionClickFn: filterOptionClickFn,
    isSingleSelect: false,
  };

  const withoutIngredientsPill = {
    label: FILTER_PILL_NAME.WITHOUT_INGREDIENTS,
    data: withoutIngredientsOptions,
    filterField: "filterWithoutIngredientsValues",
    allValuesField: "withoutIngredientsValues",
    urlParam: "withoutIngredients",
    filterOptionClickFn: filterOptionClickFn,
    isSingleSelect: false,
  };

  const pricePill = {
    label: FILTER_PILL_NAME.PRICE,
    filterField: "filterMinPrice",
    filterOptionClickFn: filterOptionClickFn,
  };

  return [
    pricePill,
    productCategoriesPill,
    withIngredientsPill,
    withoutIngredientsPill,
  ];
};
