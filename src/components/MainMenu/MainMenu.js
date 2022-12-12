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
import { Dropdown } from "./dropdown";
import { COUNTRIES_OPTIONS } from "../../utils/countryEnum";
import { CURRENCIES } from "../../utils/currencyEnum";

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
  state = { isPaneOpenLeft: false, selectedCountryOption: {} };

  componentDidMount() {
    const userCountryCode = localStorage.getItem("ipCountry") || "GB";
    const selectedCountryOption = COUNTRIES_OPTIONS.find(
      (el) => el.value === userCountryCode
    );
    this.setState({ selectedCountryOption });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userCountry !== prevProps.userCountry) {
      const selectedCountryOption = COUNTRIES_OPTIONS.find(
        (el) => el.value === this.props.userCountry
      );
      this.setState({ selectedCountryOption });
    }
  }

  handleBurgerMenuClick = () => {
    this.setState({ isPaneOpenLeft: true });
  };

  handleLogoClick = () => {
    this.props.history.push("/");
  };

  handleCountryDropdownChange = (selectedOption) => {
    const { handleCountryChange } = this.props;
    this.setState({
      selectedCountryOption: selectedOption,
      selectedCountryValue: selectedOption.value,
    });
    localStorage.setItem("ipCountry", selectedOption.value);
    localStorage.setItem("localCurrency", CURRENCIES[selectedOption.value]);
    handleCountryChange({ userCountry: selectedOption.value });
  };

  render() {
    const { showMenuDropdowns = true } = this.props;
    const { selectedCountryOption } = this.state;
    return (
      <div class="px-6 sm:px-12 flex items-center h-20 justify-between bg-transparent text-slate-gray">
        <div class="block sm:hidden">
          <Bars2Icon
            class="inline h-7 w-7"
            onClick={this.handleBurgerMenuClick}
          />
        </div>
        <div className="flex-shrink-0 px-4">
          <img
            onClick={this.handleLogoClick}
            className="h-12 w-12 cursor-pointer"
            src={logo.default}
            alt="Workflow"
          />
        </div>
        {/* Shadow div to center the logo on mobile */}
        <div class="block sm:hidden" />
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
        <div class="hidden sm:block">
          <div class="w-40">
            <Dropdown
              options={COUNTRIES_OPTIONS}
              handleChange={this.handleCountryDropdownChange}
              placeholder={selectedCountryOption.label}
              value={selectedCountryOption}
              inputValueObject={true}
              overrideStyles={{
                placeholder: { fontWeight: 400 },
              }}
            />
          </div>
        </div>
        <SlidingPane
          className="bg-stone"
          from="left"
          isOpen={this.state.isPaneOpenLeft}
          hideHeader={true}
          closeIcon={
            <div>
              <XMarkIcon class="h-5 w-5" />
            </div>
          }
          onRequestClose={() => {
            // triggered on "<" on left top click or on outside click
            this.setState({ isPaneOpenLeft: false });
          }}
        >
          <MobileMenuBar
            brandsArray={brandsArray}
            productCategoriesArray={productCategoriesArray}
            handleCountryDropdownChange={this.handleCountryDropdownChange}
            selectedCountryOption={selectedCountryOption}
          />
          <br />
        </SlidingPane>
      </div>
    );
  }
}

export default withRouter(MainMenu);
