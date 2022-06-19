import React, { Component } from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { withRouter } from "react-router-dom";
import { LOCAL_STORAGE_ITEM } from "../../utils/enums";

class ProfileMenu extends Component {
  handleLogoutButton = () => {
    const { auth0, handleMenuOptionClick } = this.props;
    const { logout } = auth0;
    localStorage.setItem(LOCAL_STORAGE_ITEM.IS_USER_LOGGED_IN, "false");
    localStorage.setItem(LOCAL_STORAGE_ITEM.IS_USER_SIGNED_UP, "false");
    localStorage.setItem(LOCAL_STORAGE_ITEM.USER_PROFILE_INFORMATION, "null");
    localStorage.setItem(LOCAL_STORAGE_ITEM.USER_ID, "null");
    handleMenuOptionClick();
    logout({ returnTo: window.location.origin });
  };

  handleProfileSettingsButton = () => {
    const { history, handleMenuOptionClick } = this.props;
    handleMenuOptionClick();
    history.push("/profile-settings");
  };
  render() {
    return (
      <div class="absolute top-8 right-0 border rounded-xl shadow-2xl z-10 bg-white mt-3 w-min-165px text-sm px-8 py-4 text-slate-gray">
        <p
          class="font-light tracking-wider py-2 cursor-pointer md:hover:opacity-70"
          onClick={this.handleProfileSettingsButton}
        >
          <button>Profile Settings</button>
        </p>
        <p
          class="font-light tracking-wider py-2 cursor-pointer md:hover:opacity-70"
          onClick={this.handleLogoutButton}
        >
          <button>Log Out</button>
        </p>
      </div>
    );
  }
}

export default withAuth0(withRouter(ProfileMenu));
