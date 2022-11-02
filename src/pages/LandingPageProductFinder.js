import ProductFinder from "../components/ProductFinder/ProductFinder";
import { PureComponent } from "react";
import Navbar from "../components/Navbar/Navbar";

class LandingPage extends PureComponent {
  render() {
    return (
      <div
        class="min-h-screen pt-6 pb-6 mx-auto bg-gradient-to-r
      from-lilac-50
      via-lilac-100
      to-lilac-200"
      >
        <Navbar />
        <div class="h-60px"></div>
        <div class="flex flex-col md:pt-8 pb-7 px-2 font-montserrat">
          <div class="mx-auto w-full">
            <div class="pt-4 text-3xl sm:text-5xl text-center font-normal tracking-tight text-slate-teal leading-10 sm:leading-12 mb-4">
              {"Personalised skincare recommendations."}
              <br />
              <span class="text-xl sm:text-2xl">
                {"Powered by AI analysis of reviews."}
              </span>
            </div>
          </div>
          <div class="w-full mx-auto mt-3 lg:w-3/5">
            <div class="h-5/6">
              <ProductFinder />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
