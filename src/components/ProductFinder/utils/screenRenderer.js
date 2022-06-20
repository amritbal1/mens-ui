import Screen from "../screens/Screen";
import { isEmpty } from "../../../utils/objectUtils";

export const getScreenToRender = ({
  screenNumberToRender,
  handleOptionClick,
  skincareConfig,
  subCategoryAnswer,
  reviewAnswerSkinConcerns,
  reviewAnswerSkinTypes,
  handlePreviousButtonClick,
  handleNextButtonClick,
  handleSubmitButtonClick,
}) => {
  const commonProps = {
    reviewAnswerSkinConcerns,
    reviewAnswerSkinTypes,
    subCategoryAnswer,
    screenNumberToRender,
    handlePreviousButtonClick,
    handleNextButtonClick,
    handleSubmitButtonClick,
  };

  const screen1 = () => (
    <Screen
      key={"1"}
      index={"1"}
      title={"What is your skin type?"}
      config={skincareConfig.reviews[0].options}
      parentAnswerStateVariable={"reviewAnswerSkinTypes"}
      previousAnswers={reviewAnswerSkinTypes}
      handleOptionClick={handleOptionClick}
      isMultiSelect={false}
      {...commonProps}
    />
  );
  const screen2 = () => (
    <Screen
      key={"2"}
      index={"2"}
      title={"What is the main skin concern you would like to address?"}
      config={skincareConfig.reviews[1].options}
      parentAnswerStateVariable={"reviewAnswerSkinConcerns"}
      previousAnswers={reviewAnswerSkinConcerns}
      handleOptionClick={handleOptionClick}
      isMultiSelect={false}
      {...commonProps}
    />
  );
  const screen3 = () => (
    <Screen
      key={"3"}
      index={"3"}
      title={"Which type of product are you looking for?"}
      config={skincareConfig.subcategories}
      parentAnswerStateVariable={"subCategoryAnswer"}
      previousAnswers={subCategoryAnswer}
      handleOptionClick={handleOptionClick}
      isMultiSelect={false}
      {...commonProps}
    />
  );
  switch (screenNumberToRender) {
    case 1: {
      return screen1();
    }
    case 2: {
      return screen2();
    }
    case 3: {
      return screen3();
    }
    default: {
      return screen1;
    }
  }
};

export const getPreviouslySelectedAnswers = ({ previousAnswers }) => {
  if (isEmpty(previousAnswers)) return [];
  return previousAnswers;
};
