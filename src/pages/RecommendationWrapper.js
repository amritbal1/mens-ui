import React, { Component } from "react";
import { getProductResultsData } from "../services/ProductResultsService/ProductResultsService";
import { isEmpty } from "../utils/objectUtils";
import { createResultsPagePayload } from "../utils/payloadUtils/payloadCreators/createResultsPagePayload";
import Navbar from "../components/Navbar/Navbar";
import RecommendationPage from "./RecommendationPage";
import FilterPanel from "../components/FilterPanel/FilterPanel";
import { getFilterPillsConfig } from "../components/FilterPanel/utils/filterPillUtils/getFilterPillsConfig";
import { getValueFromUrl } from "../utils/urlUtils/urlValueGetter.js";
import { setResultsPageUrl } from "../utils/urlUtils/urlValueSetter.js";
import { configValues } from "../utils/config";
import { withRouter } from "react-router-dom";
import queryString from "query-string";

class RecommendationWrapper extends Component {
  state = {
    results: [],
  };

  async componentDidMount() {
    const payload = createResultsPagePayload({});
    const resultsData = await getProductResultsData({ payload });
    if (isEmpty(resultsData)) return;
    const { results = [] } = resultsData;
    this.setState({ results });
  }

  //Listen to URL changes - as filters are updated, they update the URL params
  async componentDidUpdate(prevProps) {
    if (this.props.location && this.props.location.search) {
      const urlHasNewParams =
        this.props.location.search !== prevProps.location.search;
      if (urlHasNewParams) {
        const payload = createResultsPagePayload({});
        const resultsData = await getProductResultsData({ payload });
        if (!resultsData) return;
        const { results } = resultsData;
        this.setState({ results: results });
      }
    }
  }

  filterOptionClickFn = async ({
    filterField,
    optionId,
    isSelected,
    isSelectAll,
    isSelectAllSelected,
    allValuesField,
    isOnlyOption,
    isSingleSelect = false,
    urlParam,
  }) => {
    //filterField is the filter criteria e.g. filterBrand. optionId is the option selected within that criteria e.g. (Obagi)
    let filterValue;
    if (isSelectAll) {
      const allOptions = configValues[allValuesField];
      filterValue = isSelectAllSelected ? allOptions : [];
    } else {
      if (
        filterField === "filterMinPrice" ||
        filterField === "filterMaxPrice"
      ) {
        filterValue = optionId;
      } else {
        //For single value fields
        const currentFilterFieldValues = getValueFromUrl({ param: urlParam });
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
    const fieldValuePair = [urlParam, filterValue];
    this.pushNewParamsToUrl({ fieldValuePair });
  };

  pushNewParamsToUrl = ({ fieldValuePair }) => {
    const urlParam = fieldValuePair[0];
    const encodedParams = setResultsPageUrl({
      fieldValuePair,
    });
    const searchParams = queryString.parse(window.location.search);
    const newParams = { ...searchParams, [urlParam]: encodedParams };
    const stringified = queryString.stringify(newParams);
    this.props.history.push({
      pathname: this.props.match.path,
      search: stringified,
    });
  };

  render() {
    const { results } = this.state;
    const filterPillsConfig = getFilterPillsConfig({
      filterOptionClickFn: this.filterOptionClickFn,
    });
    return (
      <div
        class="min-h-screen bg-gradient-to-r
    from-lilac-50
    via-lilac-100
    to-lilac-200"
      >
        <Navbar />
        <div class="h-60px"></div>
        <div class="bg-gradient-to-r from-lilac-50 via-lilac-100 to-lilac-200">
          <div class="py-10 px-5 sm:px-10 text-slate-gray text-xl font-light tracking-tight text-center font-montserrat">
            Analysis of thousands of reviews shows these products are the
            <b> perfect matches</b> for you!
          </div>
          <div class="pl-4 mb-2">
            <FilterPanel filterPillsConfig={filterPillsConfig} />
          </div>
          <div>
            <RecommendationPage results={results} />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RecommendationWrapper);
