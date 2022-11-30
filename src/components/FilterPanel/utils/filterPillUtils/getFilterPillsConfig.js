import { config } from "../../../../utils/config.js";
import { FILTER_PILL_NAME } from "../../../../utils/enums.js";

export const getFilterPillsConfig = ({ filterOptionClickFn }) => {
  const { productCategoryOptions: productCategories, brandOptions, skinConcernOptions } = config;

  const productCategoriesPill = {
    label: FILTER_PILL_NAME.PRODUCT_CATEGORIES,
    data: productCategories,
    filterField: "filterProductCategoryValues",
    allValuesField: "productCategoryValues",
    urlParam: "productCategories",
    filterOptionClickFn: filterOptionClickFn,
    isSingleSelect: false,
  };

  const brandsPill = {
    label: FILTER_PILL_NAME.BRANDS,
    data: brandOptions,
    filterField: "filterBrandValues",
    allValuesField: "brandValues",
    urlParam: "brands",
    filterOptionClickFn: filterOptionClickFn,
    isSingleSelect: false,
  };

  const skinConcernsPill = {
    label: FILTER_PILL_NAME.SKIN_CONCERNS,
    data: skinConcernOptions,
    filterField: "filterSkinConcernValues",
    allValuesField: "skinConcernValues",
    urlParam: "skinConcerns",
    filterOptionClickFn: filterOptionClickFn,
    isSingleSelect: false,
  };

  const pricePill = {
    label: FILTER_PILL_NAME.PRICE,
    filterField: "filterMinPrice",
    filterOptionClickFn: filterOptionClickFn,
  };

  return [productCategoriesPill, brandsPill, skinConcernsPill, pricePill];
};
