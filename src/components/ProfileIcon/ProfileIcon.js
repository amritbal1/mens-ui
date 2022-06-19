import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import { PureComponent } from "react";
import ProfileMenu from "./ProfileMenu";
import { isEmpty } from "../../utils/objectUtils";
import AppContext from "../../AppContext";

class ProfileIcon extends PureComponent {
  state = {
    displayProfileMenu: false,
  };

  handleProfileIconClick = () => {
    const { displayProfileMenu } = this.state;
    this.setState({ displayProfileMenu: !displayProfileMenu });
  };

  handleMenuOptionClick = () => {
    this.setState({ displayProfileMenu: false });
  };

  render() {
    const { displayProfileMenu } = this.state;
    const { auth0 } = this.props;
    const { user } = auth0;
    if (isEmpty(user)) return null;
    return (
      <div class="relative ml-6">
        <img
          src={user.picture}
          alt={user.name}
          class="w-8 h-8 rounded-full mr-2 bg-gray-100 cursor-pointer"
          onClick={this.handleProfileIconClick}
        />
        {displayProfileMenu && (
          <ProfileMenu handleMenuOptionClick={this.handleMenuOptionClick} />
        )}
      </div>
    );
  }
}

ProfileIcon.contextType = AppContext;
export default withAuth0(ProfileIcon);
