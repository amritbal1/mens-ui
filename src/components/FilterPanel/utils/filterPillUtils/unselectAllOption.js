import React, { Component } from "react";

class UnselectAllOption extends Component {
  handleUnselectAllClick = () => {
    const { allValuesField, filterField, filterOptionClickFn, urlParam } =
      this.props;

    filterOptionClickFn({
      isUnselectAll: true,
      allValuesField: allValuesField,
      filterField: filterField,
      urlParam: urlParam,
    });
  };

  getUnselectAllOption = () => {
    return (
      <div>
        <div class="py-1 flex justify-between">
          <div
            class="pb-2 my-auto text-xs underline text-gray-500 cursor-pointer"
            onClick={this.handleUnselectAllClick}
          >
            Unselect all
          </div>
        </div>
      </div>
    );
  };

  render() {
    return this.getUnselectAllOption();
  }
}

export default UnselectAllOption;
