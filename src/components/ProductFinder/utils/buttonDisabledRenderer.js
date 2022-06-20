import { isEmpty } from "../../../utils/objectUtils";
import { FinderButton } from "../../shared/button";
import { TOTAL_NUMBER_OF_SCREENS } from "../constants";

export const getButtons = ({
  index,
  screenNumberToRender,
  handlePreviousButtonClick,
  handleNextButtonClick,
  handleSubmitButtonClick,
  subCategoryAnswer,
  reviewAnswerSkinTypes,
  reviewAnswerSkinConcerns,
}) => {
  const isNextButtonDisabled = getNextButtonDisabledState({
    screenNumberToRender,
    subCategoryAnswer,
    reviewAnswerSkinTypes,
    reviewAnswerSkinConcerns,
  });
  const isSubmitButtonDisabled = isEmpty(subCategoryAnswer); //Last screen options
  const previousButton = (
    <FinderButton
      key={`${index}-previous`}
      text={"Previous"}
      onClick={handlePreviousButtonClick}
    />
  );
  const nextButton = (
    <FinderButton
      key={`${index}-next`}
      text={"Next"}
      onClick={handleNextButtonClick}
      disabled={isNextButtonDisabled}
    />
  );
  const submitButton = (
    <FinderButton
      styles="ml-4"
      key={`${index}-submit`}
      text={"Find my products!"}
      disabled={isSubmitButtonDisabled}
      onClick={handleSubmitButtonClick}
    />
  );

  if (screenNumberToRender === 1) {
    return [nextButton];
  } else if (screenNumberToRender === TOTAL_NUMBER_OF_SCREENS) {
    return [previousButton, submitButton];
  } else {
    return [previousButton, nextButton];
  }
};

export const getNextButtonDisabledState = ({
  screenNumberToRender,
  subCategoryAnswer,
  reviewAnswerSkinTypes,
  reviewAnswerSkinConcerns,
}) => {
  switch (screenNumberToRender) {
    case 1:
      return isEmpty(reviewAnswerSkinTypes);
    case 2:
      return isEmpty(reviewAnswerSkinConcerns);
    case 3:
      return isEmpty(subCategoryAnswer);
    default:
      return false;
  }
};
