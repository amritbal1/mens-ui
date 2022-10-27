import { config } from "../../../../utils/config.js";
import { FILTER_PILL_NAME } from "../../../../utils/enums.js";

export const getFilterPillsConfig = ({ filterOptionClickFn }) => {
  const { productCategoryOptions: productCategories } = config;

  const productCategoriesPill = {
    label: FILTER_PILL_NAME.PRODUCT_CATEGORIES,
    data: productCategories,
    filterField: "filterProductCategoryValues",
    allValuesField: "productCategoryValues",
    urlParam: "productCategories",
    filterOptionClickFn: filterOptionClickFn,
    isSingleSelect: false,
  };

   const pricePill = {
    label: FILTER_PILL_NAME.PRICE,
    filterField: "filterMinPrice",
    filterOptionClickFn: filterOptionClickFn,
  };

  return [
    productCategoriesPill,
    pricePill
  ];
};
