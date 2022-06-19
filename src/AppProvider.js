import React, { Component } from "react";
import AppContext from "./AppContext";
import { withAuth0 } from "@auth0/auth0-react";
import { getNewUserId } from "./services/NewUserService/NewUserService";
import { getExistingUserData } from "./services/ExistingUserService/ExistingUserService";
import { isEmpty } from "./utils/objectUtils";
import { getAccessToken } from "./services/AuthenticationService/AccessTokenService";
import { getUserMetadata } from "./services/AuthenticationService/UserMetadataService";
import { withRouter } from "react-router-dom";
import { LOCAL_STORAGE_ITEM } from "./utils/enums";

class AppProvider extends Component {
  state = {
    isBackgroundBlurred: false,
  };

  setBlurredBackground = ({ isBackgroundBlurred }) => {
    this.setState({ isBackgroundBlurred });
  };

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.auth0.isAuthenticated) {
      localStorage.setItem(LOCAL_STORAGE_ITEM.IS_USER_LOGGED_IN, "false");
      localStorage.setItem(LOCAL_STORAGE_ITEM.IS_USER_SIGNED_UP, "false");
      localStorage.setItem(LOCAL_STORAGE_ITEM.USER_ID, "null");
      localStorage.setItem(LOCAL_STORAGE_ITEM.USER_PROFILE_INFORMATION, "null");
    } else if (this.props.auth0.isAuthenticated) {
      localStorage.setItem(LOCAL_STORAGE_ITEM.IS_USER_LOGGED_IN, "true");
      !prevProps.auth0.isAuthenticated && this.setUserAuthenticationData();
    }
  }

  setUserAuthenticationData = async () => {
    const { auth0 } = this.props;
    const { getAccessTokenSilently, user } = auth0;
    const { sub: auth0UserId } = user;
    const accessToken = await getAccessToken({ getAccessTokenSilently });
    const userMetadata = await getUserMetadata({ accessToken, auth0UserId });
    if (!isEmpty(userMetadata)) {
      const { history } = this.props;
      const { is_new_signup: isNewSignUp } = userMetadata;
      //For first time sign in, set the mongoDb userId and email in local storage, redirect route to profile set up page
      //For second time login, get user profile data from back end
      const isUserSignedUp = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_ITEM.IS_USER_SIGNED_UP)
      );
      if (isNewSignUp && !isUserSignedUp) {
        const { userId } = await getNewUserId({
          auth0UserId,
          emailAddress: user.email,
        });
        if (!userId) return;
        localStorage.setItem(LOCAL_STORAGE_ITEM.USER_ID, userId);
        localStorage.setItem(LOCAL_STORAGE_ITEM.IS_USER_SIGNED_UP, "true");
        history.push("/profile-setup");
      } else {
        const response = await getExistingUserData({
          auth0UserId,
        });
        if (!response) return;
        const {
          id: userId,
          ageGroupCode,
          gender,
          ethnicity,
          skinTypes,
          displayName,
          firstName,
          lastName,
          profileImage,
        } = response;
        const userProfileInformation = {
          ageGroupCode,
          gender,
          ethnicity,
          skinTypes,
          displayName,
          firstName,
          lastName,
          profileImage,
        };
        localStorage.setItem(LOCAL_STORAGE_ITEM.USER_ID, userId);
        localStorage.setItem(
          LOCAL_STORAGE_ITEM.USER_PROFILE_INFORMATION,
          JSON.stringify(userProfileInformation)
        );
      }
      localStorage.setItem(LOCAL_STORAGE_ITEM.IS_USER_LOGGED_IN, "true");
    }
  };

  render() {
    const { isBackgroundBlurred } = this.state;
    const { children } = this.props;
    return (
      <AppContext.Provider
        value={{
          isBackgroundBlurred,
          setUserAuthenticationData: this.setUserAuthenticationData,
          setBlurredBackground: this.setBlurredBackground,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export default withAuth0(withRouter(AppProvider));
