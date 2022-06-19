import { isEmpty } from "../objectUtils";
import { getValueFromUrl } from "./urlValueGetter";

export const setResultsPageUrl = ({
  filterBrandValues,
  filterStarRating,
  filterProductCharacteristicValues,
  filterSkinConcernValues,
  filterSkinTypeValues,
  filterMinPrice,
  filterMaxPrice,
  filterProductCategoryValues,
  allBrandValues,
  sortingField,
  pageNumber,
}) => {
  const selectedSkinTypes = !isEmpty(filterSkinTypeValues)
    ? filterSkinTypeValues
    : "null";
  const selectedSkinConcerns = !isEmpty(filterSkinConcernValues)
    ? filterSkinConcernValues
    : "null";
  //On the product finder results page we want to leave the categories, skin concerns and skin types in the URL untouched to preserve the user's selection on the previous Product Finder screen
  const skinTypeConcernURI = `skinTypes=${selectedSkinTypes}&skinConcerns=${selectedSkinConcerns}`;
  const allBrandsSelected =
    Array.isArray(filterBrandValues) &&
    filterBrandValues.length === allBrandValues.length;
  const noBrandsSelected = filterBrandValues.length === 0;

  const productCategoryValues = !isEmpty(filterProductCategoryValues)
    ? filterProductCategoryValues
    : "null";

  const starRating = filterStarRating ? Number(filterStarRating) : "null";
  const minPrice =
    filterMinPrice && !isEmpty(filterMinPrice) && !isNaN(filterMinPrice)
      ? Number(filterMinPrice)
      : "null";
  const maxPrice =
    filterMaxPrice && !isEmpty(filterMaxPrice) && !isNaN(filterMaxPrice)
      ? Number(filterMaxPrice)
      : "null";
  const otherFiltersURI = `starRating=${starRating}&productCharacteristics=${
    !isEmpty(filterProductCharacteristicValues)
      ? filterProductCharacteristicValues
      : "null"
  }&brands=${
    allBrandsSelected ? "all" : noBrandsSelected ? "null" : filterBrandValues
  }&productCategories=${productCategoryValues}&sort=${sortingField}&minPrice=${minPrice}&maxPrice=${maxPrice}`;

  const urlParams = pageNumber
    ? `?${skinTypeConcernURI}&${otherFiltersURI}&pageNumber=${pageNumber}`
    : `?${skinTypeConcernURI}&${otherFiltersURI}`;
  return encodeURI(urlParams);
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
