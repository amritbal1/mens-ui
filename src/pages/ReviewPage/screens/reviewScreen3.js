import React, { Component } from "react";
import PreviewMediaUpload from "../../../components/MediaUpload/PreviewMediaUpload";
import { ReviewFormTitle } from "../../../components/ReviewFormTitle/ReviewFormTitle";
import TextArea from "../../../components/TextArea/TextArea";
import TextAreaBulleted from "../../../components/TextAreaBulleted/TextAreaBulleted";
import { getButtonStyle } from "../../../utils/styles";

class ReviewScreen3 extends Component {
  render() {
    const {
      textPros,
      textCons,
      reviewTitle,
      isSubmitButtonEnabled,
      handleTextDetailsChange,
      handleImageFiles,
      handleBeforeImageFiles,
      handleAfterImageFiles,
      handleSubmitButton,
      handleScreenButtonClick,
    } = this.props;
    return (
      <div class="flex flex-col items-center">
        <div class="w-full sm:w-3/4 px-0 sm:px-10 space-y-8">
          <div class="py-3 space-y-8">
            <div>
              <ReviewFormTitle title="Review Title" />
              <TextArea
                rows="1"
                value={reviewTitle}
                handleTextChange={handleTextDetailsChange}
                fieldToChange={"summary"}
              />
            </div>
            <div>
              <div class="flex flex-wrap">
                <ReviewFormTitle
                  title="What did you like about the product?"
                  styles={"mr-2"}
                />
                <span class="text-gray-400 text-xs italic self-end">
                  {"eg effectiveness, texture, scent, value for money"}
                </span>
              </div>
              <TextAreaBulleted
                bulletChar={"•"}
                values={textPros}
                onChange={handleTextDetailsChange}
                fieldToChange={"pros"}
              />
            </div>
            <div>
              <div class="flex flex-wrap">
                <ReviewFormTitle
                  title="What did you not like about the product?"
                  styles={"mr-2"}
                />
                <span class="text-gray-400 text-xs italic self-end">
                  {"eg effectiveness, texture, scent, value for money"}
                </span>
              </div>
              <TextAreaBulleted
                bulletChar={"•"}
                values={textCons}
                onChange={handleTextDetailsChange}
                fieldToChange={"cons"}
              />
            </div>
          </div>
          <div>
            <div class="flex flex-wrap mb-1">
              <ReviewFormTitle
                title="Attach photos of the product:"
                isRequired={false}
                styles={"mr-2"}
              />
              <span class="text-gray-400 text-xs italic self-end">
                {"eg product container, product texture"}
              </span>
            </div>
            <PreviewMediaUpload
              handleFiles={handleImageFiles}
              additionalBaseStyle={{
                border: "1px solid #D1D5DB",
                borderRadius: "0.375rem",
                padding: "10px",
              }}
            />
          </div>
          <div class="flex flex-col sm:flex-row sm:space-x-12">
            <div class="w-full mb-4 sm:mb-0 sm:w-1/2">
              <ReviewFormTitle
                title="Photo of skin before using the product:"
                isRequired={false}
                styles={"mb-1"}
              />
              <PreviewMediaUpload
                handleFiles={handleBeforeImageFiles}
                additionalBaseStyle={{
                  border: "1px solid #D1D5DB",
                  borderRadius: "0.375rem",
                  padding: "10px",
                }}
              />
            </div>
            <div class="w-full sm:w-1/2">
              <ReviewFormTitle
                title="Photo of skin after using the product:"
                isRequired={false}
                styles={"mb-1"}
              />
              <PreviewMediaUpload
                handleFiles={handleAfterImageFiles}
                additionalBaseStyle={{
                  border: "1px solid #D1D5DB",
                  borderRadius: "0.375rem",
                  padding: "10px",
                }}
              />
            </div>
          </div>
          <div class="flex justify-between">
            <div>
              <button
                class={getButtonStyle({})}
                onClick={() =>
                  handleScreenButtonClick({ screenNumberToRender: 2 })
                }
              >
                Previous
              </button>
            </div>
            <button
              class={getButtonStyle({ disabled: !isSubmitButtonEnabled })}
              onClick={handleSubmitButton}
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewScreen3;
