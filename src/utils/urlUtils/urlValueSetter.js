import { isEmpty } from "../objectUtils";
import { getValueFromUrl } from "./urlValueGetter";

export const setResultsPageUrl = ({ fieldValuePair }) => {
  const [field, value] = fieldValuePair;
  if (field === "productCategories") {
    return !isEmpty(value) ? value : "null";
  }
  if (field === "minPrice" || field === "maxPrice") {
    return value && !isEmpty(value) && !isNaN(value) ? Number(value) : "null";
  }
};

export const setReviewListUrl = ({
  filterStarRating,
  filterProductCharacteristicValues,
  filterSkinConcernValues,
  filterSkinTypeValues,
  filterWithImages,
  sortingField,
  pageNumber,
}) => {
  const [productId] = getValueFromUrl({ param: "productId" });
  const selectedSkinTypes = !isEmpty(filterSkinTypeValues)
    ? filterSkinTypeValues
    : "null";
  const selectedSkinConcerns = !isEmpty(filterSkinConcernValues)
    ? filterSkinConcernValues
    : "null";
  const starRating = filterStarRating ? Number(filterStarRating) : "null";
  const productCharacteristics = !isEmpty(filterProductCharacteristicValues)
    ? filterProductCharacteristicValues
    : "null";
  let withImages;
  if (filterWithImages === null) withImages = "null";
  if (filterWithImages === true) withImages = "true";
  if (filterWithImages === false) withImages = "false";
  const [sort] = sortingField;
  const urlParams = `?productId=${productId}&skinTypes=${selectedSkinTypes}&skinConcerns=${selectedSkinConcerns}&productCharacteristics=${productCharacteristics}&starRating=${starRating}&withImages=${withImages}&sort=${sort}&pageNumber=${pageNumber}`;
  return encodeURI(urlParams);
};
