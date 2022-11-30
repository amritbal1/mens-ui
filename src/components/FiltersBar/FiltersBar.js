import React, { Component } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import FilterPillOptions from "../FilterPanel/utils/filterPillUtils/FilterPillOptions";
const BUTTON_STYLE =
  "flex w-full justify-between px-4 py-6 text-left text-base font-light focus:outline-none";

const PANEL_STYLE = "px-4 pb-2 text-sm text-gray-500";

class FiltersBar extends Component {
  render() {
    const { filtersConfig } = this.props;
    return (
      <div>
        <div className="rounded-2xl bg-white p-2">
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
            return (
              <Disclosure>
                {({ open }) => (
                  <div class="border-b">
                    <Disclosure.Button className={BUTTON_STYLE}>
                      <span>{label}</span>
                      <ChevronDownIcon
                        className={`${
                          open ? "rotate-180 transform" : ""
                        } h-6 w-6 text-slate-gray`}
                      />
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
