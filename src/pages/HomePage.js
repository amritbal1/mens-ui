import { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import CategorySelection from "../components/CategorySelection";
import MainMenu from "../components/MainMenu/MainMenu";
import { getTrendingProducts } from "../services/TrendingProductsService";
import { isEmpty } from "../utils/objectUtils";
import { REGION, S3_BUCKET } from "../aws-config";
import { categoryConfig, skinConcernConfig } from "../utils/config";
import "../css/homepage.css";
// Banner Images
import * as banner_md from "../images/lumin_500.jpeg";
import * as banner_sm from "../images/banner_sm.jpeg";
import * as banner_lg from "../images/lumin_wide.jpeg";
import { getPricingData } from "../services/PricingDataService";

const isMdScreen = window.screen.width >= 768 && window.screen.width < 1024;
const isLgScreen = window.screen.width >= 1024;

class HomePage extends PureComponent {
  state = {
    trendingProductsConfig: [],
    pricingData: [],
  };

  async componentDidMount() {
    const { userCountry } = this.props;
    this.updateData({ userCountry });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.userCountry !== prevProps.userCountry) {
      const { trendingProductsConfig } = this.state;
      const pricingData = [];
      if (isEmpty(trendingProductsConfig)) {
        this.updateData({ userCountry: this.props.userCountry });
      } else {
        await Promise.all(
          trendingProductsConfig.map(async (product) => {
            const { productId } = product;
            const data =
              (await getPricingData({
                productId,
                country: this.props.userCountry,
              })) || [];
            const { affiliateLinks = [], country = "" } = data;
            const price =
              !isEmpty(affiliateLinks) &&
              !isEmpty(affiliateLinks[0]) &&
              affiliateLinks[0].price;
            pricingData.push({ country, price });
          })
        );
        this.setState({ pricingData });
      }
    }
  }

  updateData = async ({ userCountry }) => {
    const trendingProducts = await getTrendingProducts();
    const pricingData = [];
    if (isEmpty(trendingProducts)) return;
    const trendingProductsConfig = await Promise.all(
      trendingProducts.map(async (product) => {
        const { productName, brandName, mainImageUrl, productId } = product;
        const data =
          (await getPricingData({
            productId,
            country: userCountry,
          })) || [];
        const { affiliateLinks = [], country = "" } = data;
        const price =
          !isEmpty(affiliateLinks) &&
          !isEmpty(affiliateLinks[0]) &&
          affiliateLinks[0].price;
        pricingData.push({ country, price });
        const s3ImageUrl = `https://s3.${REGION}.amazonaws.com/${S3_BUCKET}/${mainImageUrl[0]}`;
        return {
          productId,
          name: productName,
          brandName,
          key: "product",
          value: productId,
          imageUrl: s3ImageUrl,
        };
      })
    );
    this.setState({ trendingProductsConfig, pricingData });
  };

  handleShopNowClick = () => {
    const { history } = this.props;
    history.push(
      `/results?brands=null&minPrice=null&maxPrice=null&skinConcerns=null&productCategories=null`
    );
  };

  render() {
    const { trendingProductsConfig, pricingData } = this.state;
    const { userCountry, handleCountryChange } = this.props;
    let bannerImage = banner_sm;
    if (isMdScreen && !isLgScreen) {
      bannerImage = banner_md;
    } else if (!isMdScreen && isLgScreen) {
      bannerImage = banner_lg;
    }
    return (
      <div class="h-screen pb-6 mx-auto w-full relative font-jost">
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
                <div class="w-full sm:w-80 md:w-96 xl:w-600px mx-auto sm:mx-6 lg:mx-16 absolute bottom-0 xl:left-1/5 xl:top-1/3 sm:right-0 px-6 xl:px-0 pb-4 xs:pb-10 flex flex-col items-center justify-center">
                  <div class="pb-6 text-2xl sm:text-3xl w-80 md:w-96 xl:w-600px text-transparent bg-clip-text bg-gradient-to-br from-moonlitDark via-moonlitMedium to-moonlitLight tracking-widest leading-8 md:leading-12 uppercase font-light">
                    Premium skincare for the modern male
                  </div>
                  <button
                    class="lg:mt-6 w-3/5 border border-moonlitDark bg-transparent text-moonlitDark py-2 sm:py-3 px-4 focus:outline-none sm:hover:bg-moonlitMedium sm:hover:text-gray-100 w-96"
                    onClick={this.handleShopNowClick}
                  >
                    <div class="w-full text-base text-center tracking-widest uppercase text-xs sm:text-sm">
                      Shop Now
                    </div>
                  </button>
                </div>
              </span>
            </span>
          </div>
        </div>
        <div class="flex flex-col pb-7">
          <div class="bg-stone py-10 md:py-16">
            <div class="pb-12 md:pb-16 text-center text-xl sm:text-2xl uppercase font-bold tracking-tighter font-tenorSans">
              Shop by category
            </div>
            <CategorySelection
              config={categoryConfig}
              type="productCategories"
            />
          </div>
          <div class="bg-darkStone py-10 md:py-16">
            <div class="pb-12 md:pb-16 text-center text-xl sm:text-2xl uppercase font-bold tracking-tighter font-tenorSans">
              Trending Products
            </div>
            <CategorySelection
              config={trendingProductsConfig}
              type="product"
              pricingData={pricingData}
            />
          </div>
          <div class="bg-stone py-10 md:py-16">
            <div class="pb-12 md:pb-16 text-center text-xl sm:text-2xl uppercase font-bold tracking-tighter font-tenorSans">
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
