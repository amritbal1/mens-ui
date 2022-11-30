import FilterOption from "../../FilterOption";
import UnselectAllOption from "./unselectAllOption";
import PricePill from "./PricePill/PricePill";
import React, { useEffect, useRef } from "react";
import { FILTER_PILL_NAME } from "../../../../utils/enums";

const FilterPillOptions = ({
  data,
  filterField,
  allValuesField,
  label,
  urlParam,
  isSingleSelect = false,
  filterOptionClickFn,
}) => {

  const optionsRef = useRef(null);

  useEffect(() => {}, [optionsRef]);

  if (label === FILTER_PILL_NAME.PRICE) {
    return (
      <div ref={optionsRef}>
        <PricePill
          filterField={filterField}
          filterOptionClickFn={filterOptionClickFn}
        />
      </div>
    );
  }

  if (!data) return null;
  const options = data.map((filterOption, i) => {
    const { displayValue: optionName, value } = filterOption;
    return (
      <div key={i}>
        <FilterOption
          label={optionName}
          id={value}
          filterField={filterField}
          allValuesField={allValuesField}
          urlParam={urlParam}
          filterOptionClickFn={filterOptionClickFn}
          isSingleSelect={isSingleSelect}
        />
      </div>
    );
  });

  return isSingleSelect ? (
    <div ref={optionsRef}>{options}</div>
  ) : (
    <div ref={optionsRef}>
      <div>
        <UnselectAllOption
          key={filterField}
          allValuesField={allValuesField}
          filterField={filterField}
          urlParam={urlParam}
          filterOptionClickFn={filterOptionClickFn}
        />
      </div>
      <div>{options}</div>
    </div>
  );
};

export default FilterPillOptions;
