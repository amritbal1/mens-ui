import {
  PRODUCT_CHARACTERISTICS_MAP,
} from "../../../../utils/config";
import { FILTER_PILL_NAME, MAX_PRICE_FILTER } from "../../../../utils/enums";
import { isEmpty } from "../../../../utils/objectUtils";

const calculatePillLabel = ({
  selectedValues,
  allValuesLength,
  filterPillName,
}) => {
  if (selectedValues.length === 0) return filterPillName;
  if (selectedValues.length === 1) return selectedValues[0];
  if (selectedValues.length > 1) {
    if (allValuesLength === selectedValues.length) return filterPillName;
    const additionalValuesLength = selectedValues.length - 1;
    return `${selectedValues[0]} + ${additionalValuesLength}`;
  }
};

export const getPillName = ({ context, label }) => {
  if (label === FILTER_PILL_NAME.SKIN_CONCERNS) {
    const selectedValues = context.filterSkinConcernValues;
    const allValuesLength = context.allSkinConcernValues.length;
    return calculatePillLabel({
      selectedValues,
      allValuesLength,
      filterPillName: FILTER_PILL_NAME.SKIN_CONCERNS,
    });
  }
  if (label === FILTER_PILL_NAME.SKIN_TYPES) {
    const selectedValues = context.filterSkinTypeValues;
    const allValuesLength = context.allSkinTypeValues.length;
    return calculatePillLabel({
      selectedValues,
      allValuesLength,
      filterPillName: FILTER_PILL_NAME.SKIN_TYPES,
    });
  }
  if (label === FILTER_PILL_NAME.PRODUCT_CATEGORIES) {
    return calculatePillLabel({
      selectedValues: context.filterProductCategoryValues,
      allValuesLength: context.allProductCategoryValues.length,
      filterPillName: FILTER_PILL_NAME.PRODUCT_CATEGORIES,
    });
  }
  if (label === FILTER_PILL_NAME.BRANDS) {
    const selectedValues = context.filterBrandValues;
    const allValuesLength = context.allBrandValues.length;
    return calculatePillLabel({
      selectedValues,
      allValuesLength,
      filterPillName: FILTER_PILL_NAME.BRANDS,
    });
  }
  if (label === FILTER_PILL_NAME.RATING) {
    const starRating = context.filterStarRating;
    return !isEmpty(starRating) && starRating !== 0
      ? `${starRating} \u2605`
      : "Rating";
  }
  if (label === FILTER_PILL_NAME.PRODUCT_CHARACTERISTICS) {
    const selectedValues = context.filterProductCharacteristicValues;
    const allValuesLength = context.allProductCharacteristicValues.length;
    const mappedSelectedValues = selectedValues.map(
      (selectedCharacteristic) => {
        return PRODUCT_CHARACTERISTICS_MAP[selectedCharacteristic];
      }
    );
    return calculatePillLabel({
      selectedValues: mappedSelectedValues,
      allValuesLength,
      filterPillName: FILTER_PILL_NAME.PRODUCT_CHARACTERISTICS,
    });
  }

  if (label === FILTER_PILL_NAME.PRICE) {
    const maxPrice = context.filterMaxPrice;
    const minPrice = context.filterMinPrice;
    const showPlusIcon = maxPrice === MAX_PRICE_FILTER;
    if (isEmpty(minPrice) && isEmpty(maxPrice)) return "Price";
    if (isEmpty(minPrice))
      return `up to £${maxPrice}${showPlusIcon ? "+" : ""}`;
    if (!isEmpty(minPrice) && !isEmpty(maxPrice))
      return `£${minPrice} to £${maxPrice}${showPlusIcon ? "+" : ""}`;
  }
};
