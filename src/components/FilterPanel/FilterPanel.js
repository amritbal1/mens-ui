import React, { PureComponent, createRef } from "react";
import { contextConsumerSwitcher } from "../../utils/contextUtils/index";

import { createFilterPills } from "./utils/filterPillUtils/filterPillsCreator";

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

  getFilterPanel = ({ contextName }) => {
    const { filterPillsConfig } = this.props;
    const { isPillClicked } = this.state;
    return (
      <div>
        <div ref={this.wrapperRef} class="text-sm">
          <div class="flex flex-nowrap md:flex-wrap overflow-x-auto overflow-y-hidden md:overflow-visible">
            <span class="mr-2 flex-shrink-0 self-center mb-1 md:mb-2 text-slate-gray text-sm font-light">
              Filter by
            </span>
            {createFilterPills({
              filterPillsConfig,
              contextName,
              isPillClicked,
              handleClickOutsideOptionsContainer:
                this.handleClickOutsideOptionsContainer,
            })}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { contextName } = this.props;
    const contextWrappedComponent = contextConsumerSwitcher({
      contextName,
      childFn: this.getFilterPanel,
    });
    return contextWrappedComponent;
  }
}

export default FilterPanel;
