import React, { PureComponent, createRef } from "react";
import { withRouter } from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";
import AppContext from "../../AppContext";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { SORTING_FIELD } from "../../utils/enums";
import * as logo from "../../images/brand-logo.png";

class Navbar extends PureComponent {
  state = {
    isPanelOpen: false,
  };

  wrapperRef = createRef();

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  closePanel = () => {
    const { setBlurredBackground } = this.context;
    this.setState({ isPanelOpen: false });
    setBlurredBackground({ isBackgroundBlurred: false });
  };

  handleClickOutside = (event) => {
    if (
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target)
    ) {
      this.closePanel();
    }
  };

  handleMenuButtonClick = () => {
    const { setBlurredBackground } = this.context;
    const { isPanelOpen } = this.state;
    setBlurredBackground({ isBackgroundBlurred: !isPanelOpen });
    this.setState({ isPanelOpen: !isPanelOpen });
  };

  handleLogoClick = () => {
    const { history } = this.props;
    const { isPanelOpen } = this.state;
    isPanelOpen && this.closePanel();
    history.push("/");
  };

  handleLogout = () => {
    const { auth0 } = this.props;
    const { logout } = auth0;
    // localStorage.setItem(LOCAL_STORAGE_ITEM.IS_USER_LOGGED_IN, "false");
    // localStorage.setItem(LOCAL_STORAGE_ITEM.IS_USER_SIGNED_UP, "false");
    // localStorage.setItem(LOCAL_STORAGE_ITEM.USER_PROFILE_INFORMATION, "null");
    // localStorage.setItem(LOCAL_STORAGE_ITEM.USER_ID, "null");
    logout({ returnTo: window.location.origin });
  };

  handleProfileSettingsClick = () => {
    const { history } = this.props;
    const { isPanelOpen } = this.state;
    isPanelOpen && this.closePanel();
    history.push("/profile-settings");
  };

  handleViewAllProducts = () => {
    const { history } = this.props;
    const { isPanelOpen } = this.state;
    const urlParams = `?skinConcerns=null&skinTypes=null&productCategories=null&sort=${SORTING_FIELD.RECOMMENDED}&starRating=null&productCharacteristics=null&brands=null&minPrice=null&maxPrice=null&pageNumber=1`;
    const encodedParams = encodeURI(urlParams);
    isPanelOpen && this.closePanel();
    history.push(`/finder-results${encodedParams}`);
  };

  handleWriteReviewClick = async () => {
    const { history, auth0 } = this.props;
    const { isAuthenticated } = auth0;
    if (isAuthenticated) {
      const { isPanelOpen } = this.state;
      isPanelOpen && this.closePanel();
      history.push("/new-review");
    } else {
      const { loginWithRedirect } = auth0;
      // localStorage.setItem(LOCAL_STORAGE_ITEM.IS_USER_LOGGED_IN, "true");
      await loginWithRedirect({ appState: { returnTo: "/new-review" } });
    }
  };

  handleUserLogin = async () => {
    const { auth0 } = this.props;
    const { loginWithRedirect } = auth0;
    // localStorage.setItem(LOCAL_STORAGE_ITEM.IS_USER_LOGGED_IN, "true");
    await loginWithRedirect();
  };

  render() {
    // const { isAuthenticated } = auth0;
    const { isPanelOpen } = this.state;
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

                    <div className="hidden md:block">
                      <div className="ml-4 flex items-baseline space-x-2 justify-between"></div>
                    </div>
                  </div>

                  <div className="hidden md:block flex-shrink-0">
                    <div className="flex items-center">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative">
                        <div className="flex items-center"></div>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden"></div>
                </div>
              </div>
              <Transition
                enter="transition duration-200 ease-out"
                enterFrom="transform opacity-0"
                enterTo="transform opacity-100"
                leave="transition duration-200 ease-out"
                leaveFrom="transform opacity-100"
                leaveTo="transform opacity-0"
                show={isPanelOpen}
              >
                <Disclosure.Panel static className="md:hidden">
                  <div className="fixed right-0 bg-white h-screen w-300px overflow-x-hidden z-10 px-4 pt-5 pb-5 shadow-md"></div>
                </Disclosure.Panel>
              </Transition>
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
