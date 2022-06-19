import { CONTEXT } from "../../../../utils/enums";
import { isEmpty } from "../../../../utils/objectUtils";
import FilterPill from "../../FilterPill";
import ChoicePill from "../../ChoicePill";

export const createFilterPills = ({
  filterPillsConfig,
  contextName = CONTEXT.RESULTS,
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
      isChoicePill,
      isSingleSelect,
    } = pill;
    return (
      <div key={label} class="relative mr-1 md:mr-2 mb-2 flex-shrink-0">
        {isChoicePill ? (
          <ChoicePill
            label={label}
            filterField={filterField}
            contextName={contextName}
          />
        ) : (
          <FilterPill
            label={label}
            data={data}
            filterField={filterField}
            allValuesField={allValuesField}
            contextName={contextName}
            isSingleSelect={isSingleSelect}
            filterPillsConfig={filterPillsConfig}
            isPillClicked={isPillClicked}
            handleClickOutsideOptionsContainer={
              handleClickOutsideOptionsContainer
            }
          />
        )}
      </div>
    );
  });
};
