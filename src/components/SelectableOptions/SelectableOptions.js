import React, { Component } from "react";
import { isEmpty } from "../../utils/objectUtils";

class SelectableOptions extends Component {
  render() {
    const {
      options,
      handleOptionClickFn,
      selectedOptions,
      fieldToUpdate,
      readOnly,
    } = this.props;
    const optionsToDisplay = options.map((option, index) => {
      const { value, label, imageUrl } = option;
      const isSelected = selectedOptions.includes(value);
      let editStyle = "";
      if (!readOnly) {
        if (isSelected) editStyle = "bg-gray-200 cursor-pointer";
        if (!isSelected)
          editStyle = "bg-white md:hover:text-gray-400 cursor-pointer";
      } else {
        if (isSelected) editStyle = "bg-gray-200 ";
        if (!isSelected) editStyle = "bg-white";
      }
      const nonImageStyle = `text-xs flex justify-center items-center px-4 py-2 border border-gray-500 rounded-full mt-2 mr-2 sm:mr-4 text-slate-gray font-light ${editStyle}`;
      const style = `${editStyle} flex flex-col justify-center items-center`;
      return (
        <div
          key={index}
          value={value}
          onClick={() => handleOptionClickFn({ value: value, fieldToUpdate })}
        >
          {imageUrl && (
            <div class={style}>
              <img
                src={imageUrl}
                alt="skin"
                class="h-100px w-100px rounded-full"
              />
              <div class="text-xs justify-self-end text-center text-lilac-700 font-light">
                {label}
              </div>
            </div>
          )}
          {isEmpty(imageUrl) && <div class={nonImageStyle}>{label}</div>}
        </div>
      );
    });
    return <div class="flex flex-wrap">{optionsToDisplay}</div>;
  }
}

export default SelectableOptions;
