import { FILTER_PILL_NAME, MAX_PRICE_FILTER } from "../../../../utils/enums";
import { configValues } from "../../../../utils/config";
import { getValueFromUrl } from "../../../../utils/urlUtils/urlValueGetter";
import { isEmpty } from "../../../../utils/objectUtils";

const calculatePillLabel = ({
  selectedValues,
  allValuesLength,
  filterPillName,
}) => {
  const isIngredientsPill =
    filterPillName === FILTER_PILL_NAME.WITH_INGREDIENTS ||
    filterPillName === FILTER_PILL_NAME.WITHOUT_INGREDIENTS;
  if (selectedValues.length === 0) return filterPillName;
  if (selectedValues.length === 1)
    return isIngredientsPill
      ? configValues.ingredientsEnum[selectedValues[0]]
      : selectedValues[0];
  if (selectedValues.length > 1) {
    if (allValuesLength === selectedValues.length) return filterPillName;
    const additionalValuesLength = selectedValues.length - 1;
    if (isIngredientsPill) {
      return `${
        configValues.ingredientsEnum[selectedValues[0]]
      } + ${additionalValuesLength}`;
    } else {
      return `${selectedValues[0]} + ${additionalValuesLength}`;
    }
  }
};

export const getPillName = ({ label }) => {
  if (label === FILTER_PILL_NAME.PRODUCT_CATEGORIES) {
    return calculatePillLabel({
      selectedValues: getValueFromUrl({ param: "productCategories" }),
      allValuesLength: configValues.productCharacteristicValues.length,
      filterPillName: FILTER_PILL_NAME.PRODUCT_CATEGORIES,
    });
  }
  if (label === FILTER_PILL_NAME.WITH_INGREDIENTS) {
    return calculatePillLabel({
      selectedValues: getValueFromUrl({ param: "withIngredients" }),
      allValuesLength: configValues.withIngredientsValues.length,
      filterPillName: FILTER_PILL_NAME.WITH_INGREDIENTS,
    });
  }
  if (label === FILTER_PILL_NAME.WITHOUT_INGREDIENTS) {
    return calculatePillLabel({
      selectedValues: getValueFromUrl({ param: "withoutIngredients" }),
      allValuesLength: configValues.withoutIngredientsValues.length,
      filterPillName: FILTER_PILL_NAME.WITHOUT_INGREDIENTS,
    });
  }
  if (label === FILTER_PILL_NAME.PRICE) {
    const maxPrice = getValueFromUrl({ param: "maxPrice" });
    const minPrice = getValueFromUrl({ param: "minPrice" });
    const showPlusIcon = maxPrice === MAX_PRICE_FILTER;
    if (isEmpty(minPrice) && isEmpty(maxPrice)) return "Price";
    if (isEmpty(minPrice))
      return `up to £${maxPrice}${showPlusIcon ? "+" : ""}`;
    if (!isEmpty(minPrice) && !isEmpty(maxPrice))
      return `£${minPrice} to £${maxPrice}${showPlusIcon ? "+" : ""}`;
  }
};
