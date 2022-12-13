import React, { Component } from "react";
import { Disclosure } from "@headlessui/react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import FilterPillOptions from "../FilterPanel/utils/filterPillUtils/FilterPillOptions";
import { getPillName } from "../FilterPanel/utils/filterPillUtils/filterPillNameUtils";
const BUTTON_STYLE =
  "w-full px-4 py-2 text-left uppercase tracking-widest text-xs font-light focus:outline-none";

const PANEL_STYLE =
  "px-4 pb-2 text-xs text-gray-500 max-h-72 overflow-y-scroll scrollbar";

class FiltersBar extends Component {
  render() {
    const { filtersConfig } = this.props;
    return (
      <div>
        <div className="px-4">
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
                        <span class="font-normal">{label}</span>
                        {open ? (
                          <MinusIcon className="rotate-180 transform  h-4 w-4 text-slate-gray" />
                        ) : (
                          <PlusIcon className="rotate-180 transform h-4 w-4 text-slate-gray" />
                        )}
                      </div>
                      <div class="text-gray-600 sm:mt-1 normal-case tracking-tighter">
                        {pillLabel}
                      </div>
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
