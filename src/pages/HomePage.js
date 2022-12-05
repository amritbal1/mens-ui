import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import CategorySelection from "../components/CategorySelection";
import MainMenu from "../components/MainMenu/MainMenu";
import { getTrendingProducts } from "../services/TrendingProductsService";
import { isEmpty } from "../utils/objectUtils";
import { REGION, S3_BUCKET } from "../aws-config";
// Banner Images
import * as banner_md from "../images/lumin_500.jpeg";
import * as banner_sm from "../images/banner_sm.jpeg";
import * as banner_lg from "../images/lumin_wide.jpeg";
import "./homepage.css";
// Product Categories Images
import * as moisturiser from "../images/moisturiser.jpg";
import * as cleanser from "../images/cleanser.jpeg";
import * as serum from "../images/serum.jpg";
import * as exfoliator from "../images/exfoliator.jpeg";
// Skin Concern Images
import * as drySkin from "../images/dry_skin.jpg";
import * as sensitiveSkin from "../images/sensitive_skin.jpg";
import * as oilySkin from "../images/oily_skin.jpg";
import * as antiAging from "../images/anti_aging.jpeg";
import * as acne from "../images/acne.jpg";

const isMdScreen = window.screen.width >= 768 && window.screen.width < 1024;
const isLgScreen = window.screen.width >= 1024;

const categoryConfig = [
  {
    name: "Moisturisers",
    key: "productCategories",
    value: "Moisturiser",
    imageUrl: moisturiser.default,
  },
  {
    name: "Cleansers",
    key: "productCategories",
    value: "Cleanser",
    imageUrl: cleanser.default,
  },
  {
    name: "Serums",
    key: "productCategories",
    value: "Serum",
    imageUrl: serum.default,
  },
  {
    name: "Exfoliators",
    key: "productCategories",
    value: "Exfoliator",
    imageUrl: exfoliator.default,
  },
];

const skinConcernConfig = [
  {
    name: "Oily Skin",
    key: "skinConcerns",
    value: "oily-skin",
    imageUrl: oilySkin.default,
  },
  {
    name: "Dry Skin",
    key: "skinConcerns",
    value: "dry-skin",
    imageUrl: drySkin.default,
  },
  {
    name: "Sensitive Skin",
    key: "skinConcerns",
    value: "sensitive-skin",
    imageUrl: sensitiveSkin.default,
  },
  {
    name: "Anti Aging",
    key: "skinConcerns",
    value: "anti-aging",
    imageUrl: antiAging.default,
  },
  { name: "Acne", key: "skinConcerns", value: "acne", imageUrl: acne.default },
];

class HomePage extends PureComponent {
  state = {
    trendingProductsConfig: [],
  };

  async componentDidMount() {
    const trendingProducts = await getTrendingProducts();
    const trendingProductsConfig = !isEmpty(trendingProducts)
      ? trendingProducts.map((product) => {
          const { productName, brandName, mainImageUrl, productId } = product;
          const s3ImageUrl = `https://s3.${REGION}.amazonaws.com/${S3_BUCKET}/${mainImageUrl[0]}`;
          return {
            name: productName,
            brandName,
            key: "product",
            value: productId,
            imageUrl: s3ImageUrl,
          };
        })
      : [];
    this.setState({ trendingProductsConfig: trendingProductsConfig });
  }

  handleShopNowClick = () => {
    const { history } = this.props;
    history.push(
      `/results?brands=null&minPrice=null&maxPrice=null&skinConcerns=null&productCategories=null`
    );
  };

  render() {
    const { trendingProductsConfig } = this.state;
    const { userCountry, handleCountryChange } = this.props;
    let bannerImage = banner_sm;
    if (isMdScreen && !isLgScreen) {
      bannerImage = banner_md;
    } else if (!isMdScreen && isLgScreen) {
      bannerImage = banner_lg;
    }
    return (
      <div class="h-screen pb-6 mx-auto w-full relative font-montserrat">
        <div class="bg-transparent absolute top-0 w-full z-50">
          <MainMenu
            userCountry={userCountry}
            handleCountryChange={handleCountryChange}
          />
        </div>
        <div id="wrapper-1">
          <div id="wrapper-2">
            <span id="wrapper-3">
              <span id="wrapper-4">
                <span id="sibling1">
                  <img id="img1" alt="banner" src={bannerImage.default} />
                </span>
                <img id="bannerImage" alt="banner" src={bannerImage.default} />
                <div class="w-full sm:w-80 md:w-96 xl:w-600px mx-auto sm:mx-6 lg:mx-16 absolute bottom-0 xl:left-1/2 xl:bottom-1/3 sm:right-0 px-6 xl:px-0 pb-4 xs:pb-10 flex flex-col items-center justify-center">
                  <div class="pb-4 leading-8 text-3xl sm:text-4xl xl:text-6xl font-light w-80 md:w-96 xl:w-600px text-transparent bg-clip-text bg-gradient-to-br from-moonlitDark via-moonlitMedium to-moonlitLight tracking-wide">
                    Men's premium skincare products
                  </div>
                  <button
                    class="mt-2 lg:mt-6 xl:mt-12 w-4/5 border border-moonlitDark bg-transparent text-moonlitDark py-2 sm:py-3 px-4 focus:outline-none sm:hover:bg-moonlitMedium sm:hover:text-gray-100 w-96"
                    onClick={this.handleShopNowClick}
                  >
                    <div class="w-full text-base text-center tracking-widest uppercase text-xs sm:text-sm xl:text-lg">
                      Shop Now
                    </div>
                  </button>
                </div>
              </span>
            </span>
          </div>
        </div>
        <div class="flex flex-col pb-7 font-montserrat">
          <div class="bg-white py-10 md:py-20">
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
              Trending Products
            </div>
            <CategorySelection config={trendingProductsConfig} type="product" />
          </div>
          <div class="bg-white py-10">
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
