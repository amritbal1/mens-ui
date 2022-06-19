import { isEmpty } from "../../../utils/objectUtils";

export const getSubmitButtonEnabledState = ({ state }) => {
  const {
    starRating,
    brand,
    productName,
    wouldRepurchase,
    skinConcerns,
    skinTypes,
    productCharacteristics,
    reviewTextDetails,
  } = state;
  const { summary, pros, cons } = reviewTextDetails;
  const validPros =
    !isEmpty(pros) && !isEmpty(pros.filter((pro) => !isEmpty(pro)));
  const validCons =
    !isEmpty(cons) && !isEmpty(cons.filter((con) => !isEmpty(con)));
  return (
    !isEmpty(starRating) &&
    !isEmpty(brand) &&
    !isEmpty(productName) &&
    wouldRepurchase !== null &&
    !isEmpty(skinConcerns) &&
    !isEmpty(skinTypes) &&
    !isEmpty(productCharacteristics) &&
    !isEmpty(summary) &&
    validPros &&
    validCons
  );
};
