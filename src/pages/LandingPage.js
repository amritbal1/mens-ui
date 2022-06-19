import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { LOCAL_STORAGE_ITEM } from "../utils/enums";
import { withAuth0 } from "@auth0/auth0-react";
class LandingPage extends PureComponent {
  handleWriteReview = async () => {
    const { history, auth0 } = this.props;
    const { isAuthenticated } = auth0;
    if (isAuthenticated) {
      history.push("/new-review");
    } else {
      const { loginWithRedirect } = auth0;
      localStorage.setItem(LOCAL_STORAGE_ITEM.IS_USER_LOGGED_IN, "true");
      await loginWithRedirect({ appState: { returnTo: "/new-review" } });
    }
  };

  render() {
    const { backgroundOpacity } = this.props;
    return (
      <div class="bg-aqua-gradient">
        <Navbar />
        <div class="h-120px"></div>
        <div
          class={`h-screen pt-14 md:pt-20 pb-6 mx-auto ${backgroundOpacity}`}
        >
          <div class="h-full flex flex-col pb-7 px-2 sm:px-7">
            <div class="mx-auto mb-8 w-full">
              <div class="text-5xl sm:text-5xl text-center font-light tracking-tighter text-slate-gray">
                {"Honest reviews"}
              </div>
              <div class="text-3xl sm:text-4xl text-center font-extralight tracking-tighter text-slate-gray">
                {"Natural & Organic skincare products"}
              </div>
            </div>

            <div class="w-full px-2 sm:w-2/3 self-center mt-6 mb-12">
              <div class="text-center">
                <button
                  class="uppercase tracking-wider text-lg mb-12 cursor-pointer text-slate-gray font-light rounded-full py-2 px-8 border border-slate-gray hover:opacity-70"
                  onClick={this.handleWriteReview}
                >
                  Write A Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth0(withRouter(LandingPage));
