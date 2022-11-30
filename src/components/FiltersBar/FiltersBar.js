import React, { Component } from "react";
import { Disclosure } from "@headlessui/react";
import { PlusIcon, MinusIcon } from "@heroicons/react/20/solid";
import FilterPillOptions from "../FilterPanel/utils/filterPillUtils/FilterPillOptions";
import { getPillName } from "../FilterPanel/utils/filterPillUtils/filterPillNameUtils";
const BUTTON_STYLE =
  "w-full px-4 py-4 text-left text-base font-light focus:outline-none";

const PANEL_STYLE =
  "px-4 pb-2 text-sm text-gray-500 max-h-72 overflow-y-scroll scrollbar";

class FiltersBar extends Component {
  render() {
    const { filtersConfig } = this.props;
    return (
      <div>
        <div className="rounded-2xl bg-transparent px-4">
          {filtersConfig.map((filter) => {
            const {
              label,
              data,
              filterField,
              allValuesField,
              urlParam,
              isSingleSelect,
              filterOptionClickFn,
            } = filter;
            const pillLabel = getPillName({ label });
            return (
              <Disclosure>
                {({ open }) => (
                  <div class="border-b">
                    <Disclosure.Button className={BUTTON_STYLE}>
                      <div class="flex w-full justify-between">
                        <span>{label}</span>
                        {open ? (
                          <MinusIcon className="rotate-180 transform h-6 w-6 text-slate-gray" />
                        ) : (
                          <PlusIcon className="rotate-180 transform h-6 w-6 text-slate-gray" />
                        )}
                      </div>
                      <div class="text-gray-600 mt-1">{pillLabel}</div>
                    </Disclosure.Button>
                    <Disclosure.Panel className={PANEL_STYLE}>
                      <FilterPillOptions
                        data={data}
                        filterField={filterField}
                        allValuesField={allValuesField}
                        label={label}
                        urlParam={urlParam}
                        isSingleSelect={isSingleSelect}
                        filterOptionClickFn={filterOptionClickFn}
                      />
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            );
          })}
        </div>
      </div>
    );
  }
}

export default FiltersBar;
