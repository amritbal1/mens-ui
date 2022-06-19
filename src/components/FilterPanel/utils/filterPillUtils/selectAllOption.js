import React, { Component } from "react";
import { contextConsumerSwitcher } from "../../../../utils/contextUtils/index";
import { getSwitch } from "./Switch";

class SelectAllOption extends Component {
  handleSelectAllClick = ({ context, isSelected }) => {
    const { filterOptionClickFn } = context;
    const { allValuesField, filterField } = this.props;
    const updatedIsSelected = !isSelected;

    filterOptionClickFn({
      isSelectAll: true,
      allValuesField: allValuesField,
      filterField: filterField,
      isSelectAllSelected: updatedIsSelected,
    });
  };

  getSelectAllOption = ({ context }) => {
    const { filterField, allValuesField } = this.props;
    const isSelected =
      context[filterField] &&
      context[filterField].length === context[allValuesField].length;

    return (
      <div>
        <div class="px-2 py-1 flex justify-between">
          <div class="mr-2 my-auto text-sm text-slate-gray">Select All</div>
          {getSwitch({
            checked: isSelected,
            onChangeFn: this.handleSelectAllClick,
            context,
          })}
          {/* <div>
            <Switch
              size="medium"
              checked={isSelected}
              onChange={() =>
                this.handleSelectAllClick({ context, isSelected })
              }
              classes={classes}
            />
          </div> */}
        </div>
      </div>
    );
  };

  render() {
    const { contextName } = this.props;
    const contextWrappedComponent = contextConsumerSwitcher({
      contextName: contextName,
      childFn: this.getSelectAllOption,
    });
    return contextWrappedComponent;
  }
}

export default SelectAllOption;
