import { SORTING_FIELD } from "../../../utils/enums";

export const sortingPillConfig = [
  {
    label: SORTING_FIELD.RECOMMENDED,
    sortingField: SORTING_FIELD.RECOMMENDED,
  },
  {
    label: SORTING_FIELD.HIGHEST_STAR_RATING,
    sortingField: SORTING_FIELD.HIGHEST_STAR_RATING,
  },
  //TODO: Add price sorting pills when we add affiliate data
  // {
  //   label: SORTING_FIELD.HIGHEST_PRICE,
  //   sortingField: SORTING_FIELD.HIGHEST_PRICE,
  // },
  // {
  //   label: SORTING_FIELD.LOWEST_PRICE,
  //   sortingField: SORTING_FIELD.LOWEST_PRICE,
  // },
];
