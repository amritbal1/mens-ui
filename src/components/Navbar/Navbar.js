import React, { PureComponent, createRef } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { withRouter } from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";
// import ProfileIcon from "../ProfileIcon/ProfileIcon";
import AppContext from "../../AppContext";
// import { MenuIcon, XIcon } from "@heroicons/react/outline";
// import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { LOCAL_STORAGE_ITEM, SORTING_FIELD } from "../../utils/enums";
import * as logo from "../../images/brand-logo.png";

// const navbarItemStyle =
//   "cursor-pointer lg:ml-10 text-slate-gray uppercase hover:opacity-70 rounded-full px-3 py-4 text-xs tracking-wider";
// const menuItemStyle =
//   "text-lg uppercase font-light text-slate-gray block rounded-md cursor-pointer cursor-pointer border-b py-4";
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
    localStorage.setItem(LOCAL_STORAGE_ITEM.IS_USER_LOGGED_IN, "false");
    localStorage.setItem(LOCAL_STORAGE_ITEM.IS_USER_SIGNED_UP, "false");
    localStorage.setItem(LOCAL_STORAGE_ITEM.USER_PROFILE_INFORMATION, "null");
    localStorage.setItem(LOCAL_STORAGE_ITEM.USER_ID, "null");
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
      localStorage.setItem(LOCAL_STORAGE_ITEM.IS_USER_LOGGED_IN, "true");
      await loginWithRedirect({ appState: { returnTo: "/new-review" } });
    }
  };

  handleUserLogin = async () => {
    const { auth0 } = this.props;
    const { loginWithRedirect } = auth0;
    localStorage.setItem(LOCAL_STORAGE_ITEM.IS_USER_LOGGED_IN, "true");
    await loginWithRedirect();
  };

  render() {
    const { displaySearchBar = false } = this.props;
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
                      <div className="ml-4 flex items-baseline space-x-2 justify-between">
                        {/* <Fragment>
                          <span
                            class="text-slate-gray cursor-pointer mr-4"
                            onClick={this.handleLogoClick}
                          >
                            Product Finder
                          </span>
                        </Fragment> */}
                      </div>
                    </div>
                  </div>
                  {displaySearchBar && (
                    <div className="md:hidden w-full">
                      <SearchBar
                        overrideStyles={{
                          menuWidth: "80vw",
                          position: "absolute",
                          marginLeft: "-50px",
                        }}
                      />
                    </div>
                  )}
                  {displaySearchBar && (
                    <div className="hidden md:block w-full max-w-4xl">
                      <SearchBar />
                    </div>
                  )}
                  <div className="hidden md:block flex-shrink-0">
                    <div className="flex items-center">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative">
                        <div className="flex items-center">
                          {/* <Fragment>
                            <div
                              className={navbarItemStyle}
                              onClick={this.handleViewAllProducts}
                            >
                              All Products
                            </div>
                          </Fragment> */}
                          {/* <Fragment>
                            <div
                              className={navbarItemStyle}
                              onClick={this.handleWriteReviewClick}
                            >
                              Write A Review
                            </div>
                          </Fragment> */}
                          {/* <Fragment>
                            {!isAuthenticated && (
                              <div
                                className={navbarItemStyle}
                                onClick={this.handleUserLogin}
                              >
                                Sign Up
                              </div>
                            )}
                            {isAuthenticated && <ProfileIcon />}
                          </Fragment> */}
                        </div>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    {/* <div onClick={this.handleMenuButtonClick}>
                      <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-lilac-700 md:hover:text-white md:hover:opacity-70 focus:outline-none ">
                        <span className="sr-only">Open main menu</span>
                        {isPanelOpen ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div> */}
                  </div>
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
                  <div className="fixed right-0 bg-white h-screen w-300px overflow-x-hidden z-10 px-4 pt-5 pb-5 shadow-md">
                    {/* <Fragment>
                      <div
                        className={menuItemStyle}
                        onClick={this.handleLogoClick}
                      >
                        Product Finder
                      </div>
                    </Fragment> */}
                    {/* <Fragment>
                      <div
                        className={menuItemStyle}
                        onClick={this.handleViewAllProducts}
                      >
                        All Products
                      </div>
                    </Fragment> */}
                    {/* <Fragment>
                      <div
                        className={menuItemStyle}
                        onClick={this.handleWriteReviewClick}
                      >
                        Write A Review
                      </div>
                    </Fragment> */}
                    {/* If authenticated, show profile settings and log out or else show log in */}
                    {/* {isAuthenticated && (
                      <div>
                        <Fragment>
                          <div
                            className={menuItemStyle}
                            onClick={this.handleProfileSettingsClick}
                          >
                            Profile Settings
                          </div>
                        </Fragment>
                        <Fragment>
                          <div
                            className={menuItemStyle}
                            onClick={this.handleLogout}
                          >
                            Logout
                          </div>
                        </Fragment>
                      </div>
                    )} */}
                    {/* {!isAuthenticated && (
                      <div>
                        <Fragment>
                          <div
                            className={menuItemStyle}
                            onClick={this.handleUserLogin}
                          >
                            Sign in
                          </div>
                        </Fragment>
                      </div>
                    )} */}
                  </div>
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
