import { configValues } from "../../config";
import {
  MAX_PRICE_FILTER,
  PAGE_SIZE,
  SORTING_FIELD,
  SORTING_FIELD_BOOLEAN,
} from "../../enums";
import { getValueFromUrl } from "../../urlUtils/urlValueGetter";

export const createResultsPagePayload = ({ overridePageNum }) => {
  const starRating = getValueFromUrl({ param: "starRating" });
  const maxPrice = getValueFromUrl({ param: "maxPrice" });
  const maxPriceValue = maxPrice === MAX_PRICE_FILTER ? null : maxPrice;
  const [sortingField] = getValueFromUrl({ param: "sort" });
  const sortArray = getSortingValues({
    sortingField,
    starRating,
  });
  const brandsUrlValue = getValueFromUrl({ param: "brands" });
  const brandsPayloadValue =
    brandsUrlValue.length === configValues.brandValues.length
      ? []
      : brandsUrlValue;
  const filters = {
    price: {
      min: getValueFromUrl({ param: "minPrice" }),
      max: maxPriceValue,
    },
    ethnicity: null,
    //Currently get all categories
    productCategories: [],
    skinConcerns: getValueFromUrl({ param: "skinConcerns" }),
    skinTypes: getValueFromUrl({ param: "skinTypes" }),
    productCharacteristics: getValueFromUrl({
      param: "productCharacteristics",
    }),
    brands: brandsPayloadValue,
    starRating: starRating,
  };
  return {
    pageSize: PAGE_SIZE.PRODUCT_RESULTS,
    pageNumber: overridePageNum || getValueFromUrl({ param: "pageNumber" }),
    filters,
    sort: sortArray,
  };
};

const getSortingValues = ({ sortingField, starRating }) => {
  let sortingOrder = [];
  if (sortingField === SORTING_FIELD.RECOMMENDED) {
    sortingOrder = {
      [SORTING_FIELD_BOOLEAN.RECOMMENDED]: -1,
      [SORTING_FIELD_BOOLEAN.STAR_RATING]: -1,
    };
  }
  if (sortingField === SORTING_FIELD.HIGHEST_STAR_RATING) {
    sortingOrder = {
      [SORTING_FIELD_BOOLEAN.STAR_RATING]: -1,
      [SORTING_FIELD_BOOLEAN.RECOMMENDED]: -1,
    };
  }
  if (sortingField === SORTING_FIELD.HIGHEST_PRICE) {
    sortingOrder = {
      [SORTING_FIELD_BOOLEAN.PRICE]: -1,
      [SORTING_FIELD_BOOLEAN.STAR_RATING]: -1,
      [SORTING_FIELD_BOOLEAN.RECOMMENDED]: -1,
    };
  }
  if (sortingField === SORTING_FIELD.LOWEST_PRICE) {
    sortingOrder = {
      [SORTING_FIELD_BOOLEAN.PRICE]: 1,
      [SORTING_FIELD_BOOLEAN.STAR_RATING]: -1,
      [SORTING_FIELD_BOOLEAN.RECOMMENDED]: -1,
    };
  }
  return sortingOrder;
};
