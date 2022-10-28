import FilterOption from "../../FilterOption";
import SelectAllOption from "./selectAllOption";
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
  handleClickOutsideOptionsContainer,
  filterOptionClickFn,
}) => {
  const handleClick = (e) => {
    const clickedOutsideOptionsContainer =
      optionsRef.current && !optionsRef.current.contains(e.target);
    handleClickOutsideOptionsContainer({ clickedOutsideOptionsContainer });
  };

  const optionsRef = useRef(null);

  useEffect(() => {}, [optionsRef]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
    //eslint-disable-next-line
  }, []);

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
        <SelectAllOption
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
