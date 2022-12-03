import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import CategorySelection from "../components/CategorySelection";
import MainMenu from "../components/MainMenu/MainMenu";
import * as banner from "../images/bottles_2.jpeg";
import "./homepage.css";
// Product Categories
import * as moisturiser from "../images/moisturiser.jpg";
import * as cleanser from "../images/cleanser.jpeg";
import * as serum from "../images/serum.jpg";
import * as exfoliator from "../images/exfoliator.jpeg";
// SKIN TYPES
import * as drySkin from "../images/dry_skin.jpg";
import * as sensitiveSkin from "../images/sensitive_skin.jpg";
import * as oilySkin from "../images/oily_skin.jpg";
import * as antiAging from "../images/anti_aging.jpeg";
import * as acne from "../images/acne.jpg";

const categoryConfig = [
  {
    name: "Moisturisers",
    key: "productCategories",
    value: "Moisturiser",
    imageUrl: moisturiser,
  },
  {
    name: "Cleansers",
    key: "productCategories",
    value: "Cleanser",
    imageUrl: cleanser,
  },
  {
    name: "Serums",
    key: "productCategories",
    value: "Serum",
    imageUrl: serum,
  },
  {
    name: "Exfoliators",
    key: "productCategories",
    value: "Exfoliator",
    imageUrl: exfoliator,
  },
];

const skinConcernConfig = [
  {
    name: "Oily Skin",
    key: "skinConcerns",
    value: "oily-skin",
    imageUrl: oilySkin,
  },
  {
    name: "Dry Skin",
    key: "skinConcerns",
    value: "dry-skin",
    imageUrl: drySkin,
  },
  {
    name: "Sensitive Skin",
    key: "skinConcerns",
    value: "sensitive-skin",
    imageUrl: sensitiveSkin,
  },
  {
    name: "Anti Aging",
    key: "skinConcerns",
    value: "anti-aging",
    imageUrl: antiAging,
  },
  { name: "Acne", key: "skinConcerns", value: "acne", imageUrl: acne },
];

class HomePage extends PureComponent {
  handleShopNowClick = () => {
    const { history } = this.props;
    history.push(
      `/results?brands=null&minPrice=null&maxPrice=null&skinConcerns=null&productCategories=null`
    );
  };

  render() {
    const { userCountry, handleCountryChange } = this.props;
    return (
      <div class="h-screen pb-6 mx-auto">
        <div id="wrapper-1">
          <div id="wrapper-2">
            <span id="wrapper-3">
              <span id="wrapper-4">
                <div class="bg-transparent absolute top-0 w-full">
                  <MainMenu
                    userCountry={userCountry}
                    handleCountryChange={handleCountryChange}
                  />
                </div>
                <img id="bannerImage" alt="banner" src={banner.default} />
                <div class="absolute right-12 bottom-1/2 w-96 px-6">
                  <div class="text-white text-4xl font-thin">
                    Men's premium skincare products
                  </div>
                  <button
                    class="mt-2 lg:mt-6 w-4/5 border bg-transparent text-gray-50 py-2 sm:py-3 px-4 focus:outline-none sm:hover:bg-gray-700 sm:hover:text-gray-100"
                    onClick={this.handleShopNowClick}
                  >
                    <div class="w-full text-base text-center tracking-widest uppercase text-sm">
                      Shop Now
                    </div>
                  </button>
                </div>
              </span>
            </span>
          </div>
        </div>
        <div class="flex flex-col pb-7 font-montserrat">
          <div class="bg-light-gray py-10 md:py-20">
            <div class="pb-12 md:pb-20 text-center text-xl sm:text-2xl md:text-3xl uppercase font-light tracking-tighter">
              Shop by category
            </div>
            <CategorySelection
              config={categoryConfig}
              type="productCategories"
            />
          </div>
          <div class="bg-light-gray py-10">
            <div class="pb-12 md:pb-20 text-center text-xl md:text-3xl uppercase font-light tracking-tighter">
              Shop by skin concern
            </div>
            <CategorySelection config={skinConcernConfig} type="skinConcerns" />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(HomePage);
