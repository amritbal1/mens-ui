import { getValueFromUrl } from "../../urlUtils/urlValueGetter";
import { PAGE_SIZE, SORTING_FIELD, SORTING_FIELD_BOOLEAN } from "../../enums";

export const createReviewListPayload = ({ overridePageNum }) => {
  const [productId] = getValueFromUrl({ param: "productId" });
  const [sortingField] = getValueFromUrl({ param: "sort" });

  return {
    productId,
    pageSize: PAGE_SIZE.REVIEWS_LIST,
    pageNumber: overridePageNum || getValueFromUrl({ param: "pageNumber" }),
    filters: {
      starRating: getValueFromUrl({ param: "starRating" }),
      skinTypes: getValueFromUrl({ param: "skinTypes" }),
      skinConcerns: getValueFromUrl({ param: "skinConcerns" }),
      productCharacteristics: getValueFromUrl({
        param: "productCharacteristics",
      }),
      hasImages: getValueFromUrl({ param: "withImages" }),
      ethnicity: null
    },
    sort: getSortingValues({ sortingField }),
  };
};

const getSortingValues = ({ sortingField }) => {
  let sortingOrder = [];
  if (sortingField === SORTING_FIELD.MOST_RECENT) {
    sortingOrder = {
      [SORTING_FIELD_BOOLEAN.MOST_RECENT]: -1,
      [SORTING_FIELD_BOOLEAN.STAR_RATING]: -1,
    };
  }
  if (sortingField === SORTING_FIELD.HIGHEST_STAR_RATING) {
    sortingOrder = {
      [SORTING_FIELD_BOOLEAN.STAR_RATING]: -1,
      [SORTING_FIELD_BOOLEAN.MOST_RECENT]: 1,
    };
  }
  if (sortingField === SORTING_FIELD.LOWEST_STAR_RATING) {
    sortingOrder = {
      [SORTING_FIELD_BOOLEAN.STAR_RATING]: 1,
      [SORTING_FIELD_BOOLEAN.MOST_RECENT]: -1,
    };
  }
  return sortingOrder;
};
