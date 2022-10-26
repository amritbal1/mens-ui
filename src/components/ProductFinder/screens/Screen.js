import React, { Component } from "react";
import { isEmpty } from "../../../utils/objectUtils";
import { getSelectableOptions } from "../utils/optionsCreator";
import { FinderHeading } from "../../shared/headings";
import { getPreviouslySelectedAnswers } from "../utils/screenRenderer";
import { getButtons } from "../utils/buttonDisabledRenderer";

const SCREEN_VALUE = {
  1: "skinType",
  2: "skinConcerns"
}
class Screen extends Component {
  state = {
    selectedOptions: getPreviouslySelectedAnswers({
      previousAnswers: this.props.previousAnswers,
    }),
  };

  handleClick = (selectedValue) => {
    const { selectedOptions } = this.state;
    const { handleOptionClick, parentAnswerStateVariable, isMultiSelect } =
      this.props;
    const optionIsSelected = selectedOptions.find(
      (item) => item === selectedValue
    );
    let updatedSelectedOptions;
    if (isMultiSelect) {
      updatedSelectedOptions = optionIsSelected
        ? selectedOptions.filter((item) => item !== selectedValue)
        : [...selectedOptions, selectedValue];
    } else {
      updatedSelectedOptions = optionIsSelected
        ? selectedOptions.filter((item) => item !== selectedValue)
        : [selectedValue];
    }
    this.setState({ selectedOptions: updatedSelectedOptions });
    handleOptionClick({
      value: updatedSelectedOptions,
      stateVariable: parentAnswerStateVariable,
    });
  };

  render() {
    const { selectedOptions } = this.state;
    const {
      index,
      config,
      title,
      screenNumberToRender,
      subCategoryAnswer,
      reviewAnswerSkinConcerns,
      reviewAnswerSkinTypes,
      handlePreviousButtonClick,
      handleNextButtonClick,
      handleSubmitButtonClick,
    } = this.props;
    const displayOptions =
      !isEmpty(config) &&
      getSelectableOptions({
        options: config,
        selectedOptions: selectedOptions,
        clickHandlerFn: this.handleClick,
        screenValue: SCREEN_VALUE[screenNumberToRender]
      });
    const buttons = getButtons({
      index,
      screenNumberToRender,
      handlePreviousButtonClick,
      handleNextButtonClick,
      handleSubmitButtonClick,
      subCategoryAnswer,
      reviewAnswerSkinConcerns,
      reviewAnswerSkinTypes,
    });
    const buttonFlexStyle =
      buttons.length === 1 ? "justify-end" : "justify-between";
    const buttonStyle = `${buttonFlexStyle} flex px-4 mb-4 sm:mb-8`;
    return (
      <div class="h-full" key={index}>
        <div class="flex h-full flex-row flex-wrap p-2">
          <FinderHeading text={title} />
          <div class="flex justify-center items-center w-full">
            <div class="w-full flex flex-wrap justify-center">
              {displayOptions}
            </div>
          </div>
        </div>
        <div class={buttonStyle}>{[...buttons]}</div>
      </div>
    );
  }
}

export default Screen;
