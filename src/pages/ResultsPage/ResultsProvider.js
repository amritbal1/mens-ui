import React, { PureComponent } from "react";
import ResultsContext from "./ResultsContext";
import { configValues } from "../../utils/config";
import { getProductResultsData } from "../../services/ProductResultsService/ProductResultsService";
import { withRouter } from "react-router-dom";
import { createResultsPagePayload } from "../../utils/payloadUtils/payloadCreators/createResultsPagePayload";
import { getValueFromUrl } from "../../utils/urlUtils/urlValueGetter";
import { setResultsPageUrl } from "../../utils/urlUtils/urlValueSetter";
import { isEmpty } from "../../utils/objectUtils";
import queryString from "query-string";

class ResultsProvider extends PureComponent {
  state = {
    hasMoreResults: true,
    productResults: null, // after filtering
    allBrandValues: configValues.brandValues,
    allSkinTypeValues: configValues.skinTypeValues,
    allSkinConcernValues: configValues.skinConcernValues,
    allProductCharacteristicValues: configValues.productCharacteristicValues,
    allProductCategoryValues: configValues.productCategoryValues,
    filterBrandValues: getValueFromUrl({ param: "brands" }), //values selected from the filters by user
    filterSkinTypeValues: getValueFromUrl({ param: "skinTypes" }),
    filterSkinConcernValues: getValueFromUrl({ param: "skinConcerns" }),
    filterProductCharacteristicValues: getValueFromUrl({
      param: "productCharacteristics",
    }),
    filterProductCategoryValues: getValueFromUrl({
      param: "productCategories",
    }),
    filterStarRating: getValueFromUrl({ param: "starRating" }),
    filterMinPrice: getValueFromUrl({ param: "minPrice" }),
    filterMaxPrice: getValueFromUrl({ param: "maxPrice" }),
    sortingField: getValueFromUrl({ param: "sort" }),
    pageNumber: getValueFromUrl({ param: "pageNumber" }),
  };

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
    //However if the user has not selected a filter/sort and just scrolled down, then the page number will not be 1 and will also not be equal to the previous page number, in which case we DO NOT want to fetch data as the fetchData function in ResultsPage does this for us (that function concatenates the results too)
    const urlHasNewPageNumberParam = currentPageNumber === "1";
    const urlHasUpdatedPageNumberParam =
      !urlHasNewPageNumberParam && currentPageNumber !== previousPageNumber;
    if (
      urlHasNewParams &&
      urlHasNewPageNumberParam &&
      !urlHasUpdatedPageNumberParam
    ) {
      const payload = createResultsPagePayload({});
      const resultsData = await getProductResultsData({ payload });
      if (!resultsData) return;
      const { results } = resultsData;
      this.setState({
        productResults: results,
        hasMoreResults: !isEmpty(results),
        filterBrandValues: getValueFromUrl({ param: "brands" }),
        filterSkinTypeValues: getValueFromUrl({ param: "skinTypes" }),
        filterSkinConcernValues: getValueFromUrl({ param: "skinConcerns" }),
        filterProductCharacteristicValues: getValueFromUrl({
          param: "productCharacteristics",
        }),
        filterCategoryValue: getValueFromUrl({ param: "categories" }),
        filterStarRating: getValueFromUrl({ param: "starRating" }),
        sortingField: getValueFromUrl({ param: "sort" }),
        filterMinPrice: getValueFromUrl({ param: "minPrice" }),
        filterMaxPrice: getValueFromUrl({ param: "maxPrice" }),
        filterProductCategoryValues: getValueFromUrl({
          param: "productCategories",
        }),
      });
    }
  }

  setProductResults = async ({ productResults, hasMoreResults }) => {
    this.setState({ productResults, hasMoreResults });
  };

  pushNewParamsToUrl = () => {
    const {
      filterBrandValues,
      filterStarRating,
      filterProductCharacteristicValues,
      filterSkinConcernValues,
      filterSkinTypeValues,
      filterMinPrice,
      filterMaxPrice,
      filterProductCategoryValues,
      sortingField,
      allBrandValues,
      pageNumber,
    } = this.state;
    const encodedParams = setResultsPageUrl({
      filterBrandValues,
      filterStarRating,
      filterProductCharacteristicValues,
      filterSkinConcernValues,
      filterSkinTypeValues,
      filterProductCategoryValues,
      allBrandValues,
      sortingField,
      filterMinPrice,
      filterMaxPrice,
      pageNumber,
    });
    this.props.history.push({
      pathname: this.props.match.path,
      search: encodedParams,
    });
  };

  sortingOptionClickFn = async ({ sortingField }) => {
    this.setState({ sortingField, pageNumber: 1 }, () => {
      this.pushNewParamsToUrl();
    });
  };

  filterOptionClickFn = async ({
    filterField,
    optionId,
    isSelected,
    isSelectAll,
    isSelectAllSelected,
    allValuesField,
    isOnlyOption,
    isSingleSelect = false,
  }) => {
    //filterField is the filter criteria e.g. filterBrand. optionId is the option selected within that criteria e.g. (Obagi)
    let filterValue;
    if (isSelectAll) {
      const allOptions = this.state[allValuesField];
      filterValue = isSelectAllSelected ? allOptions : [];
    } else {
      //For single value fields
      if (
        filterField === "filterStarRating" ||
        filterField === "filterMinPrice" ||
        filterField === "filterMaxPrice"
      ) {
        filterValue = optionId;
      } else {
        const currentFilterFieldValues = this.state[filterField];
        if (isSingleSelect) {
          filterValue = isSelected ? [optionId] : [];
        } else if (isOnlyOption) {
          //Deselect all other selected options
          filterValue = [optionId];
        } else {
          filterValue = isSelected
            ? [...currentFilterFieldValues, optionId]
            : currentFilterFieldValues.filter((option) => option !== optionId);
        }
      }
    }
    this.setState({ [filterField]: filterValue, pageNumber: 1 }, () =>
      this.pushNewParamsToUrl()
    );
  };

  render() {
    const {
      hasMoreResults,
      productResults,
      allBrandValues,
      allSkinTypeValues,
      allSkinConcernValues,
      allProductCharacteristicValues,
      allProductCategoryValues,
      filterBrandValues,
      filterSkinTypeValues,
      filterSkinConcernValues,
      filterStarRating,
      filterProductCharacteristicValues,
      filterProductCategoryValues,
      filterMinPrice,
      filterMaxPrice,
    } = this.state;

    return (
      <ResultsContext.Provider
        value={{
          hasMoreResults,
          productResults,
          allBrandValues,
          allSkinTypeValues,
          allSkinConcernValues,
          allProductCharacteristicValues,
          allProductCategoryValues,
          filterBrandValues,
          filterSkinTypeValues,
          filterSkinConcernValues,
          filterStarRating,
          filterProductCharacteristicValues,
          filterProductCategoryValues,
          filterMinPrice,
          filterMaxPrice,
          filterOptionClickFn: this.filterOptionClickFn,
          sortingOptionClickFn: this.sortingOptionClickFn,
          setProductResults: this.setProductResults,
        }}
      >
        {this.props.children}
      </ResultsContext.Provider>
    );
  }
}

export default withRouter((props) => <ResultsProvider {...props} />);
