import FilterOption from "../../FilterOption";
import SelectAllOption from "./selectAllOption";
import RatingPill from "./RatingPillCreator/RatingPill";
import { FILTER_PILL_NAME } from "../../../../utils/enums";
import PricePill from "./PricePill/PricePill";

import React, { useEffect, useRef } from "react";

const FilterPillOptions = ({
  data,
  filterField,
  allValuesField,
  label,
  contextName,
  isSingleSelect = false,
  handleClickOutsideOptionsContainer,
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

  if (label === FILTER_PILL_NAME.RATING) {
    return (
      <div ref={optionsRef}>
        <RatingPill contextName={contextName} ref={optionsRef} />
      </div>
    );
  }
  if (label === FILTER_PILL_NAME.PRICE)
    return (
      <div ref={optionsRef}>
        <PricePill contextName={contextName} />
      </div>
    );
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
          contextName={contextName}
          isSingleSelect={isSingleSelect}
        />
      </div>
    );
  });

  const selectAllOption = (
    <SelectAllOption
      key={filterField}
      allValuesField={allValuesField}
      filterField={filterField}
      contextName={contextName}
    />
  );

  return isSingleSelect ? (
    <div ref={optionsRef}>{options}</div>
  ) : (
    <div ref={optionsRef}>
      <div>{selectAllOption} </div> <div>{options}</div>
    </div>
  );
};

export default FilterPillOptions;
