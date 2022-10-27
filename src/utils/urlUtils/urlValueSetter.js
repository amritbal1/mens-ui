import { isEmpty } from "../objectUtils";
import { getValueFromUrl } from "./urlValueGetter";

export const setResultsPageUrl = ({
  fieldValuePair
}) => {
  const [field, value] = fieldValuePair;
  let productCategoryValues = "null";
  if (field === "productCategories") {
    productCategoryValues = !isEmpty(value)
      ? value
      : "null";
  }
  return `${productCategoryValues}`;
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
