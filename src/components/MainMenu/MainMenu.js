import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import MenuItem from "./MenuItem";
import * as logo from "../../images/brand-logo.png";
import { config } from "../../utils/config";
import { isEmpty } from "../../utils/objectUtils";
import { Bars2Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MobileMenuBar from "./MobileMenuBar";
import SlidingPane from "react-sliding-pane";
import "../../css/react-sliding-pane.css";

const brandsArray = !isEmpty(config.brandOptions)
  ? config.brandOptions.map((option) => {
      const { displayValue, value } = option;
      return [displayValue, value];
    })
  : [];

const productCategoriesArray = !isEmpty(config.productCategoryOptions)
  ? config.productCategoryOptions.map((option) => {
      const { displayValue, value } = option;
      return [displayValue, value];
    })
  : [];

class MainMenu extends Component {
  state = { isPaneOpen: false };
  handleBurgerMenuClick = () => {
    this.setState({ isPaneOpen: true });
  };

  handleLogoClick = () => {
    this.props.history.push("/");
  };

  render() {
    const { showMenuDropdowns = true } = this.props;
    return (
      <div class="px-6 sm:px-4 flex border-b items-center h-20 justify-between bg-light-gray">
        {/* Shadow div to center the logo on mobile */}
        <div class="block sm:hidden" />
        <div className="flex-shrink-0 px-4">
          <img
            onClick={this.handleLogoClick}
            className="h-12 w-12 cursor-pointer"
            src={logo.default}
            alt="Workflow"
          />
        </div>
        {showMenuDropdowns && (
          <div class="hidden sm:flex">
            <MenuItem
              menuTitle="Brands"
              urlParam="brands"
              linksArray={brandsArray}
            />
            <MenuItem
              menuTitle="Categories"
              urlParam="productCategories"
              linksArray={productCategoriesArray}
            />
          </div>
        )}
        <div class="hidden sm:block text-navTitle">Country</div>
        <div class="block sm:hidden">
          <Bars2Icon
            class="inline h-7 w-7 text-slate-gray"
            onClick={this.handleBurgerMenuClick}
          />
        </div>
        <SlidingPane
          className="bg-white"
          isOpen={this.state.isPaneOpen}
          hideHeader={true}
          closeIcon={
            <div>
              <XMarkIcon class="h-5 w-5" />
            </div>
          }
          onRequestClose={() => {
            // triggered on "<" on left top click or on outside click
            this.setState({ isPaneOpen: false });
          }}
        >
          <MobileMenuBar
            brandsArray={brandsArray}
            productCategoriesArray={productCategoriesArray}
          />
          <br />
        </SlidingPane>
      </div>
    );
  }
}

export default withRouter(MainMenu);
