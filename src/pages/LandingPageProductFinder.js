import ProductFinder from "../components/ProductFinder/ProductFinder";
import { PureComponent } from "react";
import Navbar from "../components/Navbar/Navbar";

class LandingPage extends PureComponent {
  render() {
    return (
      <div class="h-full pt-6 pb-6 mx-auto bg-lilac-10">
        <Navbar />
        <div class="h-60px"></div>
        <div class="h-full flex flex-col pt-4 md:pt-16 pb-7 px-2 sm:px-7">
          <div class="mx-auto mb-6 w-full">
            <div class="text-4xl sm:text-5xl text-center font-light tracking-tighter text-slate-gray leading-11 sm:leading-12">
              {"Skincare recommendations."}
              <br />
              {"Based on review analysis."}
            </div>
          </div>
          <div class="h-5/6 w-full lg:w-4/6 mx-auto mt-3">
            <div class="text-xl sm:text-2xl text-center font-extralight tracking-tighter text-slate-gray mb-10">
              Find the right products for your skin based on analysis of 100+
              reviews.
            </div>
            <div>
              <ProductFinder />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
