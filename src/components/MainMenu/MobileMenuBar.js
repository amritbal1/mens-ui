import React, { Component } from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { withRouter } from "react-router-dom";
import { Dropdown } from "./dropdown";
import { COUNTRIES_OPTIONS } from "../../utils/countryEnum";

const BUTTON_STYLE =
  "w-full px-4 py-5 text-left uppercase tracking-widest text-sm sm:text-base font-medium focus:outline-none text-slate-gray";

const PANEL_STYLE =
  "flex flex-col pl-8 pr-4 pb-2 text-sm text-gray-500 max-h-72 overflow-y-scroll scrollbar";

class MobileMenuBar extends Component {
  handleOptionClick = ({ urlParam, value }) => {
    const { history } = this.props;
    if (urlParam === "brands") {
      history.push(
        `/results?brands=${value}&minPrice=null&maxPrice=null&productCategories=null&skinConcerns=null`
      );
    } else if (urlParam === "productCategories") {
      history.push(
        `/results?brands=null&minPrice=null&maxPrice=null&productCategories=${value}&skinConcerns=null`
      );
    }
  };
  render() {
    const {
      brandsArray,
      productCategoriesArray,
      handleCountryDropdownChange,
      selectedCountryOption,
    } = this.props;
    return (
      <div>
        <Disclosure>
          {({ open }) => (
            <div class="border-b">
              <Disclosure.Button className={BUTTON_STYLE}>
                <div class="flex w-full justify-between">
                  <span>Brands</span>
                  {open ? (
                    <ChevronDownIcon className="rotate-180 transform  h-4 w-4 sm:h-6 sm:w- text-slate-gray" />
                  ) : (
                    <ChevronUpIcon className="rotate-180 transform h-4 w-4 sm:h-6 sm:w-6 text-slate-gray" />
                  )}
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className={PANEL_STYLE}>
                {brandsArray.map((brand) => {
                  const displayValue = brand[0];
                  const value = brand[1];
                  return (
                    <div
                      class="text-sm pb-4 text-slate-gray font-light tracking-tight"
                      onClick={() =>
                        this.handleOptionClick({
                          urlParam: "brands",
                          value: value,
                        })
                      }
                    >
                      {displayValue}
                    </div>
                  );
                })}
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <div class="border-b">
              <Disclosure.Button className={BUTTON_STYLE}>
                <div class="flex w-full justify-between">
                  <span>Categories</span>
                  {open ? (
                    <ChevronDownIcon className="rotate-180 transform  h-4 w-4 sm:h-6 sm:w- text-slate-gray" />
                  ) : (
                    <ChevronUpIcon className="rotate-180 transform h-4 w-4 sm:h-6 sm:w-6 text-slate-gray" />
                  )}
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className={PANEL_STYLE}>
                {productCategoriesArray.map((productCategory) => {
                  const displayValue = productCategory[0];
                  const value = productCategory[1];
                  return (
                    <div
                      class="text-sm pb-4 text-slate-gray font-light tracking-tight"
                      onClick={() =>
                        this.handleOptionClick({
                          urlParam: "productCategories",
                          value: value,
                        })
                      }
                    >
                      {displayValue}
                    </div>
                  );
                })}
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
        <div class="w-full pt-20">
          <Dropdown
            options={COUNTRIES_OPTIONS}
            handleChange={handleCountryDropdownChange}
            placeholder={selectedCountryOption.label}
            value={selectedCountryOption}
            inputValueObject={true}
            overrideStyles={{
              menuBarStyles: true,
            }}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(MobileMenuBar);
