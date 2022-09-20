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
        <div class="flex flex-col lg:flex-row pt-4 md:pt-8 pb-7 px-2 lg:px-7 font-montserrat">
          <div class="mx-auto w-full lg:w-2/5 lg:mr-10">
            <div class="text-3xl sm:text-5xl text-center font-normal tracking-tight text-slate-teal leading-10 sm:leading-12 mb-6 lg:mb-10">
              {"Skincare recommendations."}
              <br />
              {"Powered by AI analysis of reviews."}
            </div>
            <div class="text-lg sm:text-2xl text-center font-light tracking-tight text-slate-teal mb-10">
              Discover products matching your skin type and skin concerns
            </div>
          </div>
          <div class="w-full lg:w-3/5 lg:ml-10 mx-auto mt-3 lg:mt-0">
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
