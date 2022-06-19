import React, { Component } from "react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  XIcon,
} from "@heroicons/react/outline";
import { contextConsumerSwitcher } from "../../utils/contextUtils/index";
import { getPillName } from "./utils/filterPillUtils/filterPillNameUtils";
import FiltersModal from "../FiltersModal/FiltersModal";
import FilterPillOptions from "./utils/filterPillUtils/FilterPillOptions";

class FilterPill extends Component {
  state = {
    isPillClicked: false,
    windowWidth: window.screen.width,
  };

  handleModalClose = () => {
    this.setState({ isPillClicked: false });
  };

  componentDidMount() {
    const { label, isPillClicked } = this.props;
    this.setState({ pillName: label, isPillClicked });
    window.addEventListener("resize", this.handleWindowResize);
  }

  componentDidUpdate(prevProps, prevState) {
    const prevPillIsClicked = prevState.isPillClicked;
    //We need the state value to handle changes within this component which update the isPillClicked state variable based on clicking the pill/chevron itself
    const currPillIsClicked = this.state.isPillClicked;
    //We need the props value because we handle the logic for clicking outside the options container in a higher level component which  updates & passes in the isPillClicked prop here
    const currPillIsClickedProps = this.props.isPillClicked;
    if (prevPillIsClicked === true && currPillIsClicked === false) {
      this.setState({ isPillClicked: currPillIsClicked });
    }
    if (
      prevPillIsClicked === true &&
      currPillIsClicked === true &&
      currPillIsClickedProps === false
    ) {
      this.setState({ isPillClicked: currPillIsClickedProps });
    }
  }

  handleWindowResize = () => {
    this.setState({ windowWidth: window.screen.width });
  };

  handleClearOptions = (e, context) => {
    const { filterOptionClickFn, allValuesField } = context;
    const { filterField } = this.props;
    if (filterField === "filterMinPrice") {
      //In the filter pills config we only set the filter field to "filterMinPrice" in order to recognise it here, however when we hit the Clear button we want to reset both minPrice and maxPrice to null hence why we call the filterFn with both fields
      filterOptionClickFn({
        optionId: null,
        filterField: "filterMinPrice",
      });
      filterOptionClickFn({
        optionId: null,
        filterField: "filterMaxPrice",
      });
    } else if (filterField === "filterStarRating") {
      filterOptionClickFn({
        filterField: "filterStarRating",
        optionId: null,
      });
    } else {
      filterOptionClickFn({
        isSelectAll: true,
        allValuesField,
        filterField,
        isSelectAllSelected: false,
      });
    }
  };

  handlePillClick = (e) => {
    const { isPillClicked } = this.state;
    const updatedIsPillClicked = !isPillClicked;
    this.setState({ isPillClicked: updatedIsPillClicked });
  };

  getFilterPill = ({ context }) => {
    const { label, contextName, filterPillsConfig } = this.props;
    const { isPillClicked, windowWidth } = this.state;
    const pillLabel = getPillName({ context, label });
    const userHasSelectedOptions = pillLabel !== label;
    const pillClickedStyling =
      isPillClicked || userHasSelectedOptions
        ? "bg-gray-100 border-gray-700"
        : "bg-white md:hover:border-gray-700";
    const pillStyling = `font-light rounded-full border px-4 py-2 cursor-pointer flex ${pillClickedStyling}`;
    let iconToDisplay;
    if (userHasSelectedOptions) {
      iconToDisplay = (
        <XIcon
          class="rounded-full ml-2 my-auto h-4 w-4 md:hover:bg-gray-100"
          id="x-icon"
          onClick={(e) => this.handleClearOptions(e, context)}
        />
      );
    } else if (isPillClicked) {
      iconToDisplay = (
        <ChevronUpIcon
          class="ml-2 my-auto h-4 w-4"
          id="chevron-up"
          onClick={this.handlePillClick}
        />
      );
    } else if (!isPillClicked) {
      iconToDisplay = (
        <ChevronDownIcon
          class="ml-2 my-auto h-4 w-4"
          id="chevron-down"
          onClick={this.handlePillClick}
        />
      );
    }
    return (
      <div>
        <div class={pillStyling}>
          <div onClick={this.handlePillClick} class="text-xs">{pillLabel}</div>
          {iconToDisplay}
        </div>
        {isPillClicked && (
          <div>
            {windowWidth >= 768 && (
              <div class="hidden md:block absolute top-8 left-0 rounded-md shadow-2xl border z-10 bg-white w-min-350px mt-3 pb-2 px-2">
                <div>
                  <FilterPillOptions {...this.props} />
                </div>
              </div>
            )}
            {/* Calculating the MD breakpoint manually because md:hidden still causes the Material UI slider tooltip in FiltersModal to render and show twice on the page */}
            {windowWidth < 768 && (
              <FiltersModal
                contextName={contextName}
                filterPillsConfig={filterPillsConfig}
                handleModalClose={this.handleModalClose}
              />
            )}
          </div>
        )}
      </div>
    );
  };

  render() {
    const { contextName } = this.props;
    const contextWrappedComponent = contextConsumerSwitcher({
      contextName: contextName,
      childFn: this.getFilterPill,
    });
    return <div>{contextWrappedComponent}</div>;
  }
}

export default FilterPill;
