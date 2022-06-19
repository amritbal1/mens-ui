import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ResultsProvider from "./pages/ResultsPage/ResultsProvider";
import ResultsPage from "./pages/ResultsPage/ResultsPage";
import ReviewPage from "./pages/ReviewPage/ReviewPage";
import ProfileSetupPage from "./pages/ProfileSetupPage/ProfileSetupPage";
import ProductPage from "./pages/ProductPage";
import { Auth0Provider } from "@auth0/auth0-react";
import AppProvider from "./AppProvider";
import { SORTING_FIELD } from "./utils/enums";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import { isEmpty } from "./utils/objectUtils";
import AppContext from "./AppContext";
import SubmitPage from "./pages/SubmitPage";

class App extends PureComponent {
  onRedirectCallback = (appState) => {
    this.props.history.push(
      !isEmpty(appState) && appState.returnTo
        ? appState.returnTo
        : window.location.pathname
    );
  };

  componentDidMount() {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }
  render() {
    return (
      <Auth0Provider
        domain="nova-reviews.eu.auth0.com"
        clientId="je0CZT9jitVMcsTGxbENI2wlyp7nr7yz"
        redirectUri={window.location.origin}
        onRedirectCallback={this.onRedirectCallback}
        audience="https://nova-reviews.eu.auth0.com/api/v2/"
        scope="read:current_user"
      >
        <AppProvider>
          <section class="w-screen h-screen font-sans">
            <AppContext.Consumer>
              {(context) => {
                const { isBackgroundBlurred } = context;
                const backgroundOpacity = isBackgroundBlurred
                  ? "opacity-25"
                  : "";
                return (
                  <div>
                    <Switch>
                      <Route
                        exact
                        path="/"
                        render={(props) => {
                          const allProps = { ...props, backgroundOpacity };
                          return <LandingPage {...allProps} />;
                        }}
                      />

                      <Route
                        exact
                        path="/submit-page"
                        render={(props) => {
                          const allProps = { ...props, backgroundOpacity };
                          return <SubmitPage {...allProps} />;
                        }}
                      />
                      <Route
                        exact
                        path="/profile-setup"
                        render={(props) => {
                          const allProps = { ...props, backgroundOpacity };
                          return <ProfileSetupPage {...allProps} />;
                        }}
                      />
                      <Route
                        exact
                        path="/profile-settings"
                        render={(props) => {
                          const allProps = { ...props, backgroundOpacity };
                          return <ProfileSettingsPage {...allProps} />;
                        }}
                      />
                      <Route
                        exact
                        path="/finder-results"
                        render={(props) => {
                          const newProps = {
                            ...props,
                            backgroundOpacity,
                            initialSortPillDisplayValue:
                              SORTING_FIELD.RECOMMENDED,
                          };
                          return (
                            <ResultsProvider>
                              <ResultsPage {...newProps} />
                            </ResultsProvider>
                          );
                        }}
                      />
                      <Route
                        path="/product"
                        render={(props) => {
                          const allProps = { ...props, backgroundOpacity };
                          return <ProductPage {...allProps} />;
                        }}
                      />
                      <Route
                        path="/brand"
                        render={(props) => {
                          const newProps = {
                            ...props,
                            backgroundOpacity,
                            initialSortPillDisplayValue:
                              SORTING_FIELD.RECOMMENDED,
                          };
                          return (
                            <ResultsProvider>
                              <ResultsPage {...newProps} />
                            </ResultsProvider>
                          );
                        }}
                      />
                      <Route
                        path="/category"
                        render={(props) => {
                          const newProps = {
                            ...props,
                            backgroundOpacity,
                            initialSortPillDisplayValue:
                              SORTING_FIELD.RECOMMENDED,
                          };
                          return (
                            <ResultsProvider>
                              <ResultsPage {...newProps} />
                            </ResultsProvider>
                          );
                        }}
                      />
                      <Route
                        path="/new-review"
                        render={(props) => {
                          const allProps = { ...props, backgroundOpacity };
                          return <ReviewPage {...allProps} />;
                        }}
                      />
                    </Switch>
                  </div>
                );
              }}
            </AppContext.Consumer>
          </section>
        </AppProvider>
      </Auth0Provider>
    );
  }
}

export default withRouter(App);
