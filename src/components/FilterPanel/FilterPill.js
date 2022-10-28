import React, { Component } from "react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { getPillName } from "./utils/filterPillUtils/filterPillNameUtils";
import FilterPillOptions from "./utils/filterPillUtils/FilterPillOptions";
const isSmallScreen = window.screen.width <= 470;
class FilterPill extends Component {
  state = {
    isPillClicked: false,
  };

  handleModalClose = () => {
    this.setState({ isPillClicked: false });
  };

  componentDidMount() {
    const { label, isPillClicked } = this.props;
    this.setState({ pillName: label, isPillClicked });
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

  handleClearOptions = (e) => {
    const { filterField, filterOptionClickFn, allValuesField, urlParam } =
      this.props;
    if (filterField === "filterMinPrice") {
      //In the filter pills config we only set the filter field to "filterMinPrice" in order to recognise it here, however when we hit the Clear button we want to reset both minPrice and maxPrice to null hence why we call the filterFn with both fields
      filterOptionClickFn({
        optionId: null,
        filterField: "filterMinPrice",
        urlParam: "minPrice"
      });
      filterOptionClickFn({
        optionId: null,
        filterField: "filterMaxPrice",
        urlParam: "maxPrice"
      });
    } else {
      filterOptionClickFn({
        isSelectAll: true,
        allValuesField,
        filterField,
        isSelectAllSelected: false,
        urlParam: urlParam,
      });
    }
  };

  handlePillClick = (e) => {
    const { isPillClicked } = this.state;
    const updatedIsPillClicked = !isPillClicked;
    this.setState({ isPillClicked: updatedIsPillClicked });
  };

  getFilterPill = () => {
    const { label } = this.props;
    const { isPillClicked } = this.state;
    const pillLabel = getPillName({ label });
    const userHasSelectedOptions = pillLabel !== label;
    const pillClickedStyling =
      isPillClicked || userHasSelectedOptions
        ? "bg-gray-100 border-gray-700"
        : "bg-white md:hover:border-gray-700";
    const pillStyling = `font-light rounded-full border px-4 py-2 cursor-pointer flex ${pillClickedStyling}`;
    let iconToDisplay;
    if (userHasSelectedOptions) {
      iconToDisplay = (
        <XMarkIcon
          class="rounded-full ml-2 my-auto h-4 w-4 sm:hover:bg-white"
          id="x-icon"
          onClick={(e) => this.handleClearOptions(e)}
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
    const parentElement = document.getElementById(`${label}-parent`);
    return (
      <div>
        <div class={pillStyling}>
          <div onClick={this.handlePillClick} class="text-xs">
            {pillLabel}
          </div>
          {iconToDisplay}
        </div>
        {isPillClicked && parentElement && (
          <div>
            <div
              id={"menu"}
              style={{
                "--t": `${parentElement.offsetTop}px`,
                "--l": `${parentElement.offsetLeft}px`,
                position: "absolute",
                zIndex: "9999",
                borderRadius: "0.375rem",
                filter:
                  "drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))",
                backgroundColor: "white",
                minWidth: `${isSmallScreen ? "220px" : "250px"}`,
                marginTop: "0.5rem",
                paddingBottom: "0.5rem",
                paddingLeft: "0.5rem",
                paddingRight: "0.5rem",
              }}
            >
              <div>
                <FilterPillOptions {...this.props} />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  render() {
    return <div>{this.getFilterPill()}</div>;
  }
}

export default FilterPill;
