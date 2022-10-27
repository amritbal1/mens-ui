import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import LandingPageProductFinder from "./pages/LandingPageProductFinder";
import ProductPage from "./pages/ProductPage";
import RecommendationWrapper from "./pages/RecommendationWrapper.js";
import AppProvider from "./AppProvider";
import { isEmpty } from "./utils/objectUtils";
import AppContext from "./AppContext";

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
      <AppProvider>
        <section class="w-screen h-screen font-sans">
          <AppContext.Consumer>
            {(context) => {
              const { isBackgroundBlurred } = context;
              const backgroundOpacity = isBackgroundBlurred ? "opacity-25" : "";
              return (
                <div>
                  <Switch>
                    <Route
                      exact
                      path="/"
                      render={(props) => {
                        const allProps = { ...props, backgroundOpacity };
                        return <LandingPageProductFinder {...allProps} />;
                      }}
                    />
                    <Route
                      exact
                      path="/finder-results"
                      render={() => {
                        return <RecommendationWrapper />;
                      }}
                    />
                    <Route
                      path="/product"
                      render={(props) => {
                        const allProps = { ...props, backgroundOpacity };
                        return <ProductPage {...allProps} />;
                      }}
                    />
                  </Switch>
                </div>
              );
            }}
          </AppContext.Consumer>
        </section>
      </AppProvider>
    );
  }
}

export default withRouter(App);
