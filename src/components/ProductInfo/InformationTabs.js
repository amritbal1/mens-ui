import React, { Component } from "react";
import { Tab } from "@headlessui/react";

class InformationTabs extends Component {
  render() {
    const { productDescription, ingredients } = this.props;
    const selectedTabStyle =
      "focus:outline-none border-b-2 border-gray-700 text-slate-gray mr-5 py-2 text-sm font-light";
    const unselectedTabStyle =
      "focus:outline-none mr-5 text-gray-500 hover:text-gray-700 cursor-pointer text-sm font-light";
    return (
      <Tab.Group>
        <Tab.List className={"mb-4"}>
          <Tab
            className={({ selected }) =>
              selected ? selectedTabStyle : unselectedTabStyle
            }
          >
            Details
          </Tab>
          <Tab
            className={({ selected }) =>
              selected ? selectedTabStyle : unselectedTabStyle
            }
          >
            Ingredients
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div class="text-slate-gray text-sm font-light">{productDescription}</div>
          </Tab.Panel>
          <Tab.Panel>
            <div class="text-slate-gray text-sm font-light">{ingredients}</div>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    );
  }
}

export default InformationTabs;
