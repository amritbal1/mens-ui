import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";
import AppContext from "../../AppContext";
import { Disclosure } from "@headlessui/react";
import * as logo from "../../images/brand-logo.png";
import { Dropdown } from "../SkinInfo/dropdown.js";
import { COUNTRIES_OPTIONS } from "../../utils/countryEnum";
import { CURRENCIES } from "../../utils/currencyEnum";
class Navbar extends PureComponent {
  state = {
    selectedCountryOption: {},
  };

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

  handleLogoClick = () => {
    const { history } = this.props;
    const { isPanelOpen } = this.state;
    isPanelOpen && this.closePanel();
    history.push("/");
  };

  handleCountryDropdownChange = (selectedOption) => {
    const { handleCountryChange } = this.props;
    this.setState({
      selectedCountryOption: selectedOption,
      selectedCountryValue: selectedOption.value,
    });
    localStorage.setItem("ipCountry", selectedOption.value);
    localStorage.setItem("localCurrency", CURRENCIES[selectedOption.value]);
    if (handleCountryChange) {
      handleCountryChange({ userCountry: selectedOption.value });
    }
  };

  render() {
    const { selectedCountryOption } = this.state;
    return (
      <div
        ref={this.wrapperRef}
        class={`fixed h-60px top-0 z-50 bg-lilac-10 w-full`}
      >
        <Disclosure as="nav" className={`bg-white z-50 box-shadow-bottom`}>
          {({ open }) => (
            <>
              <div className="mx-auto px-2 sm:px-6 lg:px-16">
                <div className="flex items-center justify-between h-16 space-x-2">
                  <div className="flex items-center flex-shrink-0">
                    <div className="flex-shrink-0 px-2">
                      <img
                        onClick={this.handleLogoClick}
                        className="h-16 w-16 cursor-pointer"
                        src={logo.default}
                        alt="Workflow"
                      />
                    </div>
                  </div>
                  <div>
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
                </div>
              </div>
            </>
          )}
        </Disclosure>
      </div>
    );
  }
}

Navbar.contextType = AppContext;
const routerNavbar = withAuth0(withRouter(Navbar));
export default routerNavbar;
