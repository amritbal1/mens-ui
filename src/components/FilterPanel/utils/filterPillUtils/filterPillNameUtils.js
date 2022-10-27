import { FILTER_PILL_NAME } from "../../../../utils/enums";
import { configValues } from "../../../../utils/config";
import { getValueFromUrl } from "../../../../utils/urlUtils/urlValueGetter";

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

export const getPillName = ({ label }) => {
  if (label === FILTER_PILL_NAME.PRODUCT_CATEGORIES) {
    return calculatePillLabel({
      selectedValues: getValueFromUrl({ param: "productCategories" }),
      allValuesLength: configValues.productCharacteristicValues.length,
      filterPillName: FILTER_PILL_NAME.PRODUCT_CATEGORIES,
    });
  }
};
