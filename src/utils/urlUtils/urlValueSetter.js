import { isEmpty } from "../objectUtils";

export const setResultsPageUrl = ({ fieldValuePair }) => {
  const [field, value] = fieldValuePair;
  if (field === "productCategories") {
    return !isEmpty(value) ? value : "null";
  }
  if (field === "minPrice" || field === "maxPrice") {
    return value && !isEmpty(value) && !isNaN(value) ? Number(value) : "null";
  }
};
