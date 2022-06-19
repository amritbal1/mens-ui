import { CONTEXT } from "../../../utils/enums";
import { isEmpty } from "../../../utils/objectUtils";
import FilterModalOption from "../FilterModalOption";

export const createFilterPanelOptions = ({
  filterPillsConfig,
  contextName = CONTEXT.RESULTS,
}) => {
  if (isEmpty(filterPillsConfig)) return null;
  return filterPillsConfig.map((pill, i) => {
    const {
      label,
      data,
      filterField,
      allValuesField,
      isSingleSelect,
      isChoicePill,
    } = pill;
    return (
      <div key={i} class="relative mr-1 mb-1 md:mr-2 md:mb-2 flex-shrink-0">
        <FilterModalOption
          isChoicePill={isChoicePill}
          label={label}
          data={data}
          filterField={filterField}
          allValuesField={allValuesField}
          contextName={contextName}
          isSingleSelect={isSingleSelect}
        />
      </div>
    );
  });
};
