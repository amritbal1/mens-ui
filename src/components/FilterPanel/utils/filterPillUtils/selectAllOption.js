import React, { Component } from "react";
import { getSwitch } from "./Switch";
import { getValueFromUrl } from "../../../../utils/urlUtils/urlValueGetter";
import { configValues } from "../../../../utils/config";
import { isEmpty } from "../../../../utils/objectUtils";

class SelectAllOption extends Component {
  handleSelectAllClick = ({ isSelected }) => {
    const { allValuesField, filterField, filterOptionClickFn, urlParam } = this.props;
    const updatedIsSelected = !isSelected;

    filterOptionClickFn({
      isSelectAll: true,
      allValuesField: allValuesField,
      filterField: filterField,
      isSelectAllSelected: updatedIsSelected,
      urlParam: urlParam
    });
  };

  getSelectAllOption = () => {
    const { allValuesField, urlParam } = this.props;
    const selectedValues = getValueFromUrl({ param: urlParam });
    const isSelected =
      !isEmpty(selectedValues) && Array.isArray(selectedValues) &&
      selectedValues.length === configValues[allValuesField].length;

    return (
      <div>
        <div class="px-2 py-1 flex justify-between">
          <div class="mr-2 my-auto text-sm text-slate-gray">Select All</div>
          {getSwitch({
            checked: isSelected,
            onChangeFn: this.handleSelectAllClick,
          })}
        </div>
      </div>
    );
  };

  render() {
    return this.getSelectAllOption();
  }
}

export default SelectAllOption;
