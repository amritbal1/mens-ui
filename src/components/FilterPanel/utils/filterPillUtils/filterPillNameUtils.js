import { FILTER_PILL_NAME, MAX_PRICE_FILTER } from "../../../../utils/enums";
import { configValues, SKIN_CONCERN_ENUM } from "../../../../utils/config";
import { getValueFromUrl } from "../../../../utils/urlUtils/urlValueGetter";
import { isEmpty } from "../../../../utils/objectUtils";

const calculatePillLabel = ({ selectedValues, filterPillName = "" }) => {
  if (selectedValues.length === 0) return "All";
  if (selectedValues.length === 1)
    return filterPillName === FILTER_PILL_NAME.SKIN_CONCERNS
      ? SKIN_CONCERN_ENUM[selectedValues[0]]
      : selectedValues[0];
  if (selectedValues.length > 1) {
    return `${selectedValues.length} selected`;
  }
};

export const getPillName = ({ label }) => {
  const localCurrency = localStorage.getItem("localCurrency") || "£";
  if (label === FILTER_PILL_NAME.PRODUCT_CATEGORIES) {
    return calculatePillLabel({
      selectedValues: getValueFromUrl({ param: "productCategories" }),
      allValuesLength: configValues.productCategoryValues.length,
      filterPillName: FILTER_PILL_NAME.PRODUCT_CATEGORIES,
    });
  }
  if (label === FILTER_PILL_NAME.BRANDS) {
    return calculatePillLabel({
      selectedValues: getValueFromUrl({ param: "brands" }),
      allValuesLength: configValues.brandValues.length,
      filterPillName: FILTER_PILL_NAME.BRANDS,
    });
  }
  if (label === FILTER_PILL_NAME.SKIN_CONCERNS) {
    return calculatePillLabel({
      selectedValues: getValueFromUrl({ param: "skinConcerns" }),
      allValuesLength: configValues.skinConcernValues.length,
      filterPillName: FILTER_PILL_NAME.SKIN_CONCERNS,
    });
  }
  if (label === FILTER_PILL_NAME.PRICE) {
    const maxPrice = getValueFromUrl({ param: "maxPrice" });
    const minPrice = getValueFromUrl({ param: "minPrice" });
    const showPlusIcon = maxPrice === MAX_PRICE_FILTER;
    if (isEmpty(minPrice) && isEmpty(maxPrice)) return "";
    if (isEmpty(minPrice))
      return `up to ${localCurrency}${maxPrice}${showPlusIcon ? "+" : ""}`;
    if (!isEmpty(minPrice) && !isEmpty(maxPrice))
      return `${localCurrency}${minPrice} to ${localCurrency}${maxPrice}${
        showPlusIcon ? "+" : ""
      }`;
  }
};
