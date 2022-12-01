import React, { Component } from "react";
import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { getProductResultsData } from "../services/ProductResultsService/ProductResultsService";
import { isEmpty } from "../utils/objectUtils";
import { createResultsPagePayload } from "../utils/payloadUtils/payloadCreators/createResultsPagePayload";
import RecommendationPage from "./RecommendationPage";
import { getFilterPillsConfig } from "../components/FilterPanel/utils/filterPillUtils/getFilterPillsConfig";
import {
  getValueFromUrl,
  splitArray,
} from "../utils/urlUtils/urlValueGetter.js";
import { setResultsPageUrl } from "../utils/urlUtils/urlValueSetter.js";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import FiltersBar from "../components/FiltersBar/FiltersBar";
import SlidingPane from "react-sliding-pane";
import "../css/react-sliding-pane.css";
import MainMenu from "../components/MainMenu/MainMenu";

class RecommendationWrapper extends Component {
  state = {
    results: [],
    isPaneOpen: false,
  };

  handleMobileFiltersClick = () => {
    this.setState({ isPaneOpen: true });
  };

  async componentDidMount() {
    const payload = await createResultsPagePayload({});
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
        const payload = await createResultsPagePayload({});
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
    isUnselectAll,
    isOnlyOption,
    isSingleSelect = false,
    urlParam,
  }) => {
    //filterField is the filter criteria e.g. filterBrand. optionId is the option selected within that criteria e.g. (Obagi)
    let filterValue;
    if (isUnselectAll) {
      filterValue = [];
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
    const createdParams = setResultsPageUrl({
      fieldValuePair,
    });
    const param = Array.isArray(createdParams)
      ? splitArray({ arr: createdParams })
      : createdParams;
    const searchParams = queryString.parse(window.location.search);
    const newParams = { ...searchParams, [urlParam]: param };
    const stringified = queryString.stringify(newParams);
    this.props.history.push({
      pathname: this.props.match.path,
      search: stringified,
    });
  };

  render() {
    const { results } = this.state;
    const filtersConfig = getFilterPillsConfig({
      filterOptionClickFn: this.filterOptionClickFn,
    });
    return (
      <div class="min-h-screen">
        <MainMenu
          showMenuDropdowns={false}
          userCountry={this.props.userCountry}
        />
        <div class="flex flex-col lg:flex-row px-4 pt-10 sm:px-16 bg-white min-h-screen lg:justify-center">
          <div class="hidden lg:block w-80 mr-4">
            <FiltersBar filtersConfig={filtersConfig} />
          </div>
          <div class="block lg:hidden w-80 mr-4 mb-10">
            <div
              onClick={this.handleMobileFiltersClick}
              class="flex items-center"
            >
              <AdjustmentsHorizontalIcon class="text-sm sm:text-base h-5 w-5 inline mr-2 text-gray-600" />
              <span class="text-xs sm:text-base uppercase font-light text-gray-600">
                Filters
              </span>
            </div>
            <SlidingPane
              className="bg-white"
              isOpen={this.state.isPaneOpen}
              hideHeader={true}
              closeIcon={
                <div>
                  <XMarkIcon class="h-5 w-5" />
                </div>
              }
              onRequestClose={() => {
                // triggered on "<" on left top click or on outside click
                this.setState({ isPaneOpen: false });
              }}
            >
              <FiltersBar filtersConfig={filtersConfig} />
              <br />
            </SlidingPane>
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
