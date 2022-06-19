import React from "react";
import { isEmpty } from "../../utils/objectUtils";
import YesNoToggle from "./YesNoToggle";

export const Questionnaire = ({ options, handleClickFn, selectedOptions }) => {
  if (isEmpty(options)) return null;
  return options.map((option, i) => {
    const { value } = option;
    return (
      <div key={i} class="sm:flex mb-1">
        <YesNoToggle
          option={option}
          key={value}
          handleClickFn={handleClickFn}
          selectedOptions={selectedOptions}
        />
      </div>
    );
  });
};
