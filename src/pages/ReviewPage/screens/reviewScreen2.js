import React, { Component } from "react";
import { Questionnaire } from "../../../components/Questionnaire/Questionnaire";
import { ReviewFormTitle } from "../../../components/ReviewFormTitle/ReviewFormTitle";
import SkinConcernPills from "../../../components/SkinConcernPills/SkinConcernPills";
import { skinConcernOptions } from "../../../utils/config";
import { isEmpty } from "../../../utils/objectUtils";
import { getButtonStyle } from "../../../utils/styles";
import { getSkinTypeOptions } from "../utils/getReviewFormOptions";

class ReviewScreen2 extends Component {
  skinTypeOptions = getSkinTypeOptions();
  render() {
    const {
      skinTypes,
      skinConcerns,
      handleSkinTypes,
      handleSkinConcerns,
      handleScreenButtonClick,
    } = this.props;
    const isNextButtonDisabled = isEmpty(skinTypes) || isEmpty(skinConcerns);
    return (
      <div class="flex flex-col items-center">
        <div class="space-y-8 lg:space-y-0 w-full px-0 sm:px-10">
          <div class="flex flex-col lg:flex-row flex-wrap justify-center">
            {!isEmpty(this.skinTypeOptions) && (
              <div class="mb-10 sm:mb-0 px-0 sm:px-3">
                <div class="sm:mb-6">
                  <ReviewFormTitle
                    title="Did the product work well for your skin type(s)?"
                    styles={"mb-1"}
                  />
                  <Questionnaire
                    options={this.skinTypeOptions}
                    handleClickFn={handleSkinTypes}
                    selectedOptions={skinTypes}
                  />
                </div>
              </div>
            )}
            <div>
              <div class="sm:mb-6 px-0 sm:px-3">
                <ReviewFormTitle
                  title="Select which skin concerns apply"
                  styles={"mb-1"}
                />
                <SkinConcernPills
                  options={skinConcernOptions}
                  selectedOptions={skinConcerns}
                  handleClickFn={handleSkinConcerns}
                />
              </div>
            </div>
          </div>
          <div class="flex justify-between">
            <button
              class={getButtonStyle({})}
              onClick={() =>
                handleScreenButtonClick({ screenNumberToRender: 1 })
              }
            >
              Previous
            </button>
            <button
              class={getButtonStyle({ disabled: isNextButtonDisabled })}
              onClick={() =>
                handleScreenButtonClick({ screenNumberToRender: 3 })
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewScreen2;
