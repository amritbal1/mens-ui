import React, { PureComponent, createRef } from "react";
import FilterPillsCreator from "./utils/filterPillUtils/FilterPillsCreator";

class FilterPanel extends PureComponent {
  state = {
    isPillClicked: false,
    clickedOutsideOptionsContainer: false,
  };

  handleClickOutsideOptionsContainer = ({ clickedOutsideOptionsContainer }) => {
    if (clickedOutsideOptionsContainer) {
      this.setState({ isPillClicked: false, clickedOutsideOptionsContainer });
    } else {
      this.setState({ clickedOutsideOptionsContainer });
    }
  };

  wrapperRef = createRef();

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target) &&
      this.state.clickedOutsideOptionsContainer
    ) {
      this.setState({
        isPillClicked: false,
      });
    } else {
      this.setState({
        isPillClicked: true,
      });
    }
  };

  getFilterPanel = () => {
    const { filterPillsConfig } = this.props;
    const { isPillClicked } = this.state;
    return (
      <div id={"filter-wrapper"} ref={this.wrapperRef} class="text-sm">
        <div id={"scrollable-filters"} class="flex flex-nowrap md:flex-wrap overflow-x-auto overflow-y-visible">
          <span class="mr-2 flex-shrink-0 self-center text-slate-gray text-xs font-light">
            Filter
          </span>
          <FilterPillsCreator
            filterPillsConfig={filterPillsConfig}
            isPillClicked={isPillClicked}
            handleClickOutsideOptionsContainer={
              this.handleClickOutsideOptionsContainer
            }
          />
        </div>
      </div>
    );
  };

  render() {
    return this.getFilterPanel();
  }
}

export default FilterPanel;
