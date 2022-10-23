import React, { Component } from "react";
import AppContext from "./AppContext";
import { withAuth0 } from "@auth0/auth0-react";
import { withRouter } from "react-router-dom";

class AppProvider extends Component {
  state = {
    isBackgroundBlurred: false,
  };

  setBlurredBackground = ({ isBackgroundBlurred }) => {
    this.setState({ isBackgroundBlurred });
  };

  render() {
    const { isBackgroundBlurred } = this.state;
    const { children } = this.props;
    return (
      <AppContext.Provider
        value={{
          isBackgroundBlurred,
          setBlurredBackground: this.setBlurredBackground,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }
}

export default withAuth0(withRouter(AppProvider));
