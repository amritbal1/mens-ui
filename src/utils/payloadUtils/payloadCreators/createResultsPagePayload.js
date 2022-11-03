import { getConvertedCurrency } from "../../../services/ExchangeRateService";
import { configValues } from "../../config";
import {
  MAX_PRICE_FILTER,
  PAGE_SIZE,
  SORTING_FIELD,
  SORTING_FIELD_BOOLEAN,
} from "../../enums";
import { getValueFromUrl } from "../../urlUtils/urlValueGetter";

const USER_COUNTRY = localStorage.getItem("ipCountry");

export const createResultsPagePayload = async ({ overridePageNum }) => {
  const starRating = getValueFromUrl({ param: "starRating" });
  const maxPrice = getValueFromUrl({ param: "maxPrice" });
  const maxPriceValue = maxPrice === MAX_PRICE_FILTER ? null : maxPrice;
  const maxPriceAmount =
    USER_COUNTRY !== "GB" && maxPriceValue !== null
      ? await getConvertedCurrency({ amount: maxPriceValue })
      : maxPriceValue;
  const minPriceValue = getValueFromUrl({ param: "minPrice" });
  const minPriceAmount =
    USER_COUNTRY !== "GB" && minPriceValue !== null
      ? await getConvertedCurrency({ amount: minPriceValue })
      : minPriceValue;
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
      min: minPriceAmount,
      max: maxPriceAmount,
    },
    ethnicity: null,
    //Currently get all categories
    productCategories: getValueFromUrl({ param: "productCategories" }),
    skinConcerns: getValueFromUrl({ param: "skinConcerns" }),
    skinTypes: getValueFromUrl({ param: "skinTypes" }),
    productCharacteristics: getValueFromUrl({
      param: "productCharacteristics",
    }),
    brands: brandsPayloadValue,
    starRating: starRating,
    withIngredients: getValueFromUrl({ param: "withIngredients" }),
    withoutIngredients: getValueFromUrl({ param: "withoutIngredients" }),
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
