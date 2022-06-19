import React, { PureComponent } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { contextConsumerSwitcher } from "../../utils/contextUtils";

class SortingPanel extends PureComponent {
  state = {
    sortPillDisplayValue: null, // the value to display in the sort pill when it's not been clicked (it must reflect value of current sort state)
  };

  componentDidMount() {
    const { initialSortPillDisplayValue } = this.props;
    this.setState({ sortPillDisplayValue: initialSortPillDisplayValue });
  }
  handleSortOptionClick = ({ sortingField, context, selectedOptionLabel }) => {
    const { sortingOptionClickFn } = context;
    sortingOptionClickFn({ sortingField: sortingField });
    //On selecting an option, close the options list and update the sort pill display value
    this.setState({
      sortPillDisplayValue: selectedOptionLabel,
    });
  };

  getSortingPanel = ({ context }) => {
    const { sortPillDisplayValue } = this.state;
    const { sortingPillConfig } = this.props;
    return (
      <div className="text-right">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="text-xs font-light inline-flex justify-center w-full px-4 py-2 text-slate-gray bg-gray-100 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              {`Sort by ${sortPillDisplayValue}`}
              <ChevronDownIcon
                className="w-5 h-5 ml-2 -mr-1 text-gray-700 hover:text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute z-10 right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                {sortingPillConfig.map((sortOption, index) => {
                  const { label, sortingField } = sortOption;
                  return (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <button
                          onClick={() =>
                            this.handleSortOptionClick({
                              sortingField,
                              context,
                              selectedOptionLabel: label,
                            })
                          }
                          className={`${
                            active
                              ? "bg-gray-100 text-gray-700"
                              : "text-slate-gray"
                          } group flex rounded-md items-center w-full px-2 py-2 text-xs font-light`}
                        >
                          {label}
                        </button>
                      )}
                    </Menu.Item>
                  );
                })}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    );
  };

  render() {
    const { contextName } = this.props;
    const contextWrappedComponent = contextConsumerSwitcher({
      contextName: contextName,
      childFn: this.getSortingPanel,
    });
    return contextWrappedComponent;
  }
}

export default SortingPanel;
