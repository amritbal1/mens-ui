import React, { PureComponent } from "react";
import { getScreenToRender } from "./utils/screenRenderer";
import { skincareConfig } from "./config/productConfigs/skincareConfig";
import { withRouter } from "react-router-dom";
import { SORTING_FIELD } from "../../utils/enums";

class ProductFinder extends PureComponent {
  state = {
    subCategoryAnswer: [], // Skincare subcategory selected
    reviewAnswerSkinTypes: [],
    reviewAnswerSkinConcerns: [],
    screenNumberToRender: 1,
  };

  handleOptionClick = ({ value, stateVariable }) => {
    this.setState({ [stateVariable]: value });
  };

  handlePreviousButtonClick = () => {
    const { screenNumberToRender } = this.state;
    this.setState({
      screenNumberToRender: screenNumberToRender - 1,
    });
  };

  handleNextButtonClick = () => {
    const { screenNumberToRender } = this.state;
    this.setState({
      screenNumberToRender: screenNumberToRender + 1,
    });
  };

  handleSubmitButtonClick = () => {
    const { history } = this.props;
    const {
      subCategoryAnswer,
      reviewAnswerSkinTypes,
      reviewAnswerSkinConcerns,
    } = this.state;
    const concernsList = reviewAnswerSkinConcerns.join();
    const skinTypesList = reviewAnswerSkinTypes.join();
    const categoriesList = subCategoryAnswer.join();
    const urlParams = `?skinConcerns=${concernsList}&skinTypes=${skinTypesList}&productCategories=${categoriesList}&sort=${SORTING_FIELD.RECOMMENDED}&starRating=null&productCharacteristics=null&brands=null&minPrice=null&maxPrice=null&pageNumber=1`;
    const encodedParams = encodeURI(urlParams);
    history.push(`/finder-results${encodedParams}`);
  };

  render() {
    const {
      screenNumberToRender,
      subCategoryAnswer,
      reviewAnswerSkinConcerns,
      reviewAnswerSkinTypes,
    } = this.state;
    const screenToRender = getScreenToRender({
      screenNumberToRender,
      handleOptionClick: this.handleOptionClick,
      skincareConfig,
      subCategoryAnswer: subCategoryAnswer,
      reviewAnswerSkinConcerns: reviewAnswerSkinConcerns,
      reviewAnswerSkinTypes: reviewAnswerSkinTypes,
      handlePreviousButtonClick: this.handlePreviousButtonClick,
      handleNextButtonClick: this.handleNextButtonClick,
      handleSubmitButtonClick: this.handleSubmitButtonClick,
    });
    return (
      <div class="relative w-full block overflow-auto shadow-2xl rounded-lg ring-1 ring-lilac-100 ring-opacity-5">
        {screenToRender}
      </div>
    );
  }
}

export default withRouter(ProductFinder);
