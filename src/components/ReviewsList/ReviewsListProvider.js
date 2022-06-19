import React, { PureComponent } from "react";
import ReviewsListContext from "./ReviewsListContext";
import { configValues } from "../../utils/config";
import queryString from "query-string";
import { getProductReviews } from "../../services/ProductReviewService/ProductReviewService";
import { isEmpty } from "../../utils/objectUtils";
import { withRouter } from "react-router-dom";
import { createReviewListPayload } from "../../utils/payloadUtils/payloadCreators/createReviewListPayload";
import { getValueFromUrl } from "../../utils/urlUtils/urlValueGetter";
import { setReviewListUrl } from "../../utils/urlUtils/urlValueSetter";

class ReviewsListProvider extends PureComponent {
  state = {
    hasMoreResults: false,
    reviewsToDisplay: [],
    allSkinTypeValues: configValues.skinTypeValues,
    allSkinConcernValues: configValues.skinConcernValues,
    allProductCharacteristicValues: configValues.productCharacteristicValues,
    filterSkinTypeValues: getValueFromUrl({ param: "skinTypes" }),
    filterSkinConcernValues: getValueFromUrl({ param: "skinConcerns" }),
    filterStarRating: getValueFromUrl({ param: "starRating" }),
    filterProductCharacteristicValues: getValueFromUrl({
      param: "productCharacteristics",
    }),
    filterWithImages: getValueFromUrl({ param: "withImages" }),
    filterSortValue: getValueFromUrl({ param: "sort" }),
    pageNumber: getValueFromUrl({ param: "pageNumber" }),
  };

  fetchReviews = async () => {
    //Add new page number to URL
    const currPageNumber = getValueFromUrl({ param: "pageNumber" });
    const validCurrentPageNumber =
      currPageNumber &&
      currPageNumber !== "null" &&
      !isNaN(Number(currPageNumber))
        ? Number(currPageNumber)
        : 1;
    const incrementedPageNumber = validCurrentPageNumber + 1;

    //Fetch new data
    const payload = createReviewListPayload({
      overridePageNum: incrementedPageNumber,
    });
    const productReviewData = await getProductReviews({ payload });
    if (!productReviewData) return;
    const { reviewsToDisplay } = this.state;
    //If data is returned, then increment the page Number in the URL. The request has already been made with the incremented page number
    if (!isEmpty(productReviewData)) {
      let searchParams = new URLSearchParams(window.location.search);
      searchParams.set("pageNumber", incrementedPageNumber);
      this.props.history.push({
        pathname: this.props.match.path,
        search: searchParams.toString(),
      });
    }
    const newReviewsSetToDisplay = [...reviewsToDisplay, ...productReviewData];
    this.setStateValues({
      hasMoreResults: !isEmpty(productReviewData),
      reviewsToDisplay: newReviewsSetToDisplay,
    });
  };

  async componentDidMount() {
    const payload = createReviewListPayload({});
    const productReviewData = await getProductReviews({ payload });
    if (!productReviewData) return;
    this.setStateValues({
      hasMoreResults: !isEmpty(productReviewData),
      reviewsToDisplay: productReviewData,
    });
  }

  async componentDidUpdate(prevProps) {
    const urlHasNewParams =
      this.props.location.search !== prevProps.location.search;
    const { pageNumber: currentPageNumber } = queryString.parse(
      this.props.location.search
    );
    const { pageNumber: previousPageNumber } = queryString.parse(
      prevProps.location.search
    );
    //Upon a new filter/sort search, we update the URL page number to 1 in which case we want to fetch data.
    //However if the user has not selected a filter/sort and just scrolled down, then the page number will not be 1 and will also not be equal to the previous page number, in which case we DO NOT want to fetch data as the fetchData function does this for us
    const urlHasNewPageNumberParam = currentPageNumber === "1";
    const urlHasUpdatedPageNumberParam =
      !urlHasNewPageNumberParam && currentPageNumber !== previousPageNumber;
    if (
      urlHasNewParams &&
      urlHasNewPageNumberParam &&
      !urlHasUpdatedPageNumberParam
    ) {
      const payload = createReviewListPayload({});
      const productReviewData = await getProductReviews({
        payload,
      });
      if (!productReviewData) return;
      this.setStateValues({
        hasMoreResults: !isEmpty(productReviewData),
        reviewsToDisplay: productReviewData,
      });
    }
  }

  setStateValues = ({ hasMoreResults, reviewsToDisplay }) => {
    this.setState({
      hasMoreResults: hasMoreResults,
      reviewsToDisplay: reviewsToDisplay,
      filterSkinTypeValues: getValueFromUrl({ param: "skinTypes" }),
      filterSkinConcernValues: getValueFromUrl({ param: "skinConcerns" }),
      filterProductCharacteristicValues: getValueFromUrl({
        param: "productCharacteristics",
      }),
      filterStarRating: getValueFromUrl({ param: "starRating" }),
      filterWithImages: getValueFromUrl({ param: "withImages" }),
      sortingField: getValueFromUrl({ param: "sort" }),
      pageNumber: getValueFromUrl({ param: "pageNumber" }),
    });
  };

  pushNewParamsToUrl = () => {
    const {
      filterStarRating,
      filterProductCharacteristicValues,
      filterSkinConcernValues,
      filterSkinTypeValues,
      filterWithImages,
      sortingField,
      pageNumber,
    } = this.state;
    const encodedParams = setReviewListUrl({
      filterStarRating,
      filterProductCharacteristicValues,
      filterSkinConcernValues,
      filterSkinTypeValues,
      filterWithImages,
      sortingField,
      pageNumber,
    });
    this.props.history.push({
      pathname: this.props.match.path,
      search: encodedParams,
    });
  };

  sortingOptionClickFn = ({ sortingField }) => {
    this.setState({ sortingField: [sortingField], pageNumber: 1 }, () => {
      this.pushNewParamsToUrl();
    });
  };

  filterOptionClickFn = ({
    filterField,
    optionId,
    isSelected,
    isSelectAll,
    isSelectAllSelected,
    allValuesField,
    isOnlyOption,
  }) => {
    //filterField is the filter criteria e.g. filterSkinTypes. optionId is the option selected within that criteria e.g. Oily
    let updatedOptions;
    if (isSelectAll) {
      const allOptions = this.state[allValuesField];
      updatedOptions = isSelectAllSelected ? allOptions : [];
    } else {
      //For the rating we dont need an array of selected options from which we select/unselect items. Instead there is only 1 value to set and update
      if (filterField === "filterStarRating") {
        updatedOptions = optionId;
      } else if (filterField === "filterWithImages") {
        let option = optionId;
        if (optionId === false) {
          option = null;
        }
        updatedOptions = option;
      } else {
        const currentFilterFieldValues = this.state[filterField];
        if (isOnlyOption) {
          //Deselect all other selected options
          updatedOptions = [optionId];
        } else {
          updatedOptions = isSelected
            ? [...currentFilterFieldValues, optionId]
            : currentFilterFieldValues.filter((option) => option !== optionId);
        }
      }
    }

    this.setState({ [filterField]: updatedOptions, pageNumber: 1 }, () => {
      this.pushNewParamsToUrl();
    });
  };

  render() {
    const {
      hasMoreResults,
      reviewsToDisplay,
      allSkinConcernValues,
      allSkinTypeValues,
      allProductCharacteristicValues,
      filterSkinTypeValues,
      filterSkinConcernValues,
      filterProductCharacteristicValues,
      filterStarRating,
    } = this.state;
    return (
      <ReviewsListContext.Provider
        value={{
          hasMoreResults,
          reviewsToDisplay,
          allSkinTypeValues,
          allSkinConcernValues,
          allProductCharacteristicValues,
          filterSkinTypeValues,
          filterSkinConcernValues,
          filterStarRating,
          filterProductCharacteristicValues,
          filterOptionClickFn: this.filterOptionClickFn,
          sortingOptionClickFn: this.sortingOptionClickFn,
          fetchReviews: this.fetchReviews,
        }}
      >
        {this.props.children}
      </ReviewsListContext.Provider>
    );
  }
}

export default withRouter((props) => <ReviewsListProvider {...props} />);
