import { isEmpty } from "../../../../utils/objectUtils";
import FilterPill from "../../FilterPill";

export const createFilterPills = ({
  filterPillsConfig,
  isPillClicked,
  handleClickOutsideOptionsContainer,
}) => {
  if (isEmpty(filterPillsConfig)) return null;
  return filterPillsConfig.map((pill) => {
    const {
      label,
      data,
      filterField,
      allValuesField,
      urlParam,
      isSingleSelect,
      filterOptionClickFn,
    } = pill;
    return (
      <div
        id={`${label}-parent`}
        key={label}
        class="mr-1 md:mr-2 mb-2 flex-shrink-0"
      >
        <FilterPill
          label={label}
          data={data}
          filterField={filterField}
          allValuesField={allValuesField}
          urlParam={urlParam}
          isSingleSelect={isSingleSelect}
          filterPillsConfig={filterPillsConfig}
          isPillClicked={isPillClicked}
          handleClickOutsideOptionsContainer={
            handleClickOutsideOptionsContainer
          }
          filterOptionClickFn={filterOptionClickFn}
        />
      </div>
    );
  });
};
