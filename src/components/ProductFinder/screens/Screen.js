import React, { Component } from "react";
import { isEmpty } from "../../../utils/objectUtils";
import { getSelectableOptions } from "../utils/optionsCreator";
import { FinderHeading } from "../../shared/headings";
import { getPreviouslySelectedAnswers } from "../utils/screenRenderer";
import { getButtons } from "../utils/buttonDisabledRenderer";

const SCREEN_VALUE = {
  1: "skinType",
  2: "skinConcerns",
};
class Screen extends Component {
  state = {
    showTooltipDiv: false,
    selectedOptions: getPreviouslySelectedAnswers({
      previousAnswers: this.props.previousAnswers,
    }),
  };

  handleTooltipClick = () => {
    const { showTooltipDiv } = this.state;
    this.setState({ showTooltipDiv: !showTooltipDiv });
  };

  handleTooltipClose = () => {
    this.setState({ showTooltipDiv: false });
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
      handleSubmitButtonClick
    } = this.props;
    const displayOptions =
      !isEmpty(config) &&
      getSelectableOptions({
        options: config,
        selectedOptions: selectedOptions,
        clickHandlerFn: this.handleClick,
        screenValue: SCREEN_VALUE[screenNumberToRender],
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
    const buttonStyle = `${buttonFlexStyle} w-full flex px-4 mb-4 sm:mb-8`;
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
        <div class="flex justify-between w-full items-center">
          {/* {includeTooltip && (
            <div class="flex">
              <div class="pl-4 sm:pl-12">
                <div class="relative flex items-center justify-center">
                  <InformationCircleIcon
                    onClick={this.handleTooltipClick}
                    class="inline h-5 w-5 text-gray-400 mr-1 cursor-pointer"
                  />

                  <div class="absolute bottom-0 left-2 flex flex-col items-center mb-6 group-hover:flex">
                    {showTooltipDiv && (
                      <span class="z-10 text-xs leading-none text-slate-gray bg-white shadow-xl border rounded-lg h-22rem w-20rem xs:w-26rem xs:h-14rem overflow-x-scroll scrollbar px-4 pt-2 sm:pt-4">
                        <span
                          class="text-slate-gray flex items-center cursor-pointer hover:bg-gray-200 w-16 rounded-md pr-2 py-1"
                          onClick={this.handleTooltipClose}
                        >
                          <XMarkIcon class="h-4 w-4 mr-1 inline" />
                          <span>Close</span>
                        </span>
                        <div class="mt-2">
                          {SKIN_TYPE_DESCRIPTION.map((skinType) => {
                            return (
                              <div class="pb-4 leading-4">
                                <span class="font-semibold">
                                  {skinType.skinType}:{" "}
                                </span>
                                <span>{skinType.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <span
                class="text-sm text-gray-400 flex-shrink-0 cursor-pointer"
                onClick={this.handleTooltipClick}
              >
                What is my skin type?
              </span>
            </div>
          )} */}
          <div class={buttonStyle}>{[...buttons]}</div>
        </div>
      </div>
    );
  }
}

export default Screen;
