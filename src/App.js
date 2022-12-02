import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import RecommendationWrapper from "./pages/RecommendationWrapper.js";
import AppProvider from "./AppProvider";
import { isEmpty } from "./utils/objectUtils";
import AppContext from "./AppContext";
import { StyledEngineProvider } from "@mui/material/styles";
import { getUserLocation } from "./services/GeoLocationService";
class App extends PureComponent {
  state = {
    userCountry: "",
  };

  onRedirectCallback = (appState) => {
    this.props.history.push(
      !isEmpty(appState) && appState.returnTo
        ? appState.returnTo
        : window.location.pathname
    );
  };

  async componentDidMount() {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    const userCountry = await getUserLocation();
    this.setState({ userCountry: userCountry });
  }

  //When user is on the product page and they change the country, we need to call the pricing API again with the new country to fetch new prices (and affiliate links) in correct currency
  handleCountryChange = ({ userCountry }) => {
    this.setState({ userCountry: userCountry });
  };

  render() {
    const { userCountry } = this.state;
    return (
      <StyledEngineProvider injectFirst>
        <AppProvider>
          <section class="w-screen h-screen bg-white font-sans">
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
                          const allProps = {
                            ...props,
                            backgroundOpacity,
                            userCountry,
                          };
                          return (
                            <HomePage
                              {...allProps}
                              handleCountryChange={this.handleCountryChange}
                            />
                          );
                        }}
                      />
                      <Route
                        exact
                        path="/results"
                        render={() => {
                          return (
                            <RecommendationWrapper
                              userCountry={userCountry}
                              handleCountryChange={this.handleCountryChange}
                            />
                          );
                        }}
                      />
                      <Route
                        path="/product"
                        render={(props) => {
                          const allProps = {
                            ...props,
                            backgroundOpacity,
                            userCountry,
                            handleCountryChange: this.handleCountryChange,
                          };
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
      </StyledEngineProvider>
    );
  }
}

export default withRouter(App);
