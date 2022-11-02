import { isEmpty } from "../../../../utils/objectUtils";
import FilterPill from "../../FilterPill";
import React, { Component } from "react";

class FilterPillsCreator extends Component {
  state = { pillPositions: [] };

  componentDidMount() {
    const scrollDiv = document.getElementById("scrollable-filters");
    scrollDiv.addEventListener("scroll", this.onScroll);
  }

  onScroll = () => {
    const { filterPillsConfig } = this.props;
    const pillPositions = filterPillsConfig.map((pill) => {
      const { label } = pill;
      const parentWrapperPill = document.getElementById(
        `${label.split(" ").join("_")}-parent`
      );
      const scrollDivLeft = document
        .getElementById("filter-wrapper")
        .getBoundingClientRect().left;
      const wrapperLeft = parentWrapperPill.getBoundingClientRect().left;
      const leftDifference = wrapperLeft - scrollDivLeft;
      return {
        label: label.split(" ").join("_"),
        left: leftDifference,
      };
    });
    this.setState({ pillPositions });
  };

  render() {
    const { pillPositions } = this.state;
    const {
      filterPillsConfig,
      isPillClicked,
      handleClickOutsideOptionsContainer,
    } = this.props;
    if (isEmpty(filterPillsConfig)) return null;
    return filterPillsConfig.map((pill) => {
      const {
        label,
        data,
        filterField,
        allValuesField,
        urlParam,
        isSingleSelect,
        filterOptionClickFn,
      } = pill;
      const amendedLabel = label.split(" ").join("_");
      const pillPosition = pillPositions.find(
        (el) => el.label === amendedLabel
      );
      return (
        <div
          id={`${amendedLabel}-parent`}
          key={label}
          class="mr-1 md:mr-2 mb-2 flex-shrink-0"
        >
          <FilterPill
            label={label}
            data={data}
            filterField={filterField}
            allValuesField={allValuesField}
            urlParam={urlParam}
            isSingleSelect={isSingleSelect}
            filterPillsConfig={filterPillsConfig}
            isPillClicked={isPillClicked}
            handleClickOutsideOptionsContainer={
              handleClickOutsideOptionsContainer
            }
            filterOptionClickFn={filterOptionClickFn}
            pillPosition={pillPosition}
          />
        </div>
      );
    });
  }
}

export default FilterPillsCreator;
