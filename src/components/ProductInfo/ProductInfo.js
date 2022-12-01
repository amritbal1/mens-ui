import React, { PureComponent } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { CURRENCIES } from "../../utils/currencyEnum";
import { isEmpty } from "../../utils/objectUtils";
class ProductInfo extends PureComponent {
  render() {
    const { productDetails, pricingData } = this.props;
    const { brandName, productName } = productDetails;
    const country =
      pricingData && pricingData.country ? pricingData.country : "GB";
    const localCurrency = CURRENCIES[country];
    //TODO: Handle multiple affiliate Links
    const affiliateLink =
      pricingData && !isEmpty(pricingData.affiliateLinks)
        ? pricingData.affiliateLinks[0]
        : "";
    const { price } = affiliateLink;
    return (
      <div class="h-full w-full flex flex-col">
        <div>
          <div class="lg:mb-16">
            <div class="flex mb-2 mr-2 sm:mr-0">
              <div class="sm:px-0">
                <div class="text-sm sm:text-base lg:text-xl font-normal tracking-tight text-slate-gray mb-1">
                  {brandName}
                </div>
              </div>
            </div>
            <div>
              <div class="uppercase font-normal tracking-wide-x text-lg sm:text-2xl text-slate-gray sm:px-0 mb-6">
                {productName}
              </div>
            </div>
          </div>
          <div class="mb-4">
            <div class="mb-4">
              {price && (
                <div class="text-slate-gray font-light uppercase text-base sm:text-xl">
                  {`~${localCurrency} ${(Math.round(price * 100) / 100).toFixed(
                    2
                  )}`}
                </div>
              )}
              <a
                href={affiliateLink.productUrl || ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  class="mt-2 lg:mt-6 w-full lg:w-96 bg-gray-900 text-gray-50 tracking-wide py-2 sm:py-3 lg:py-4 px-6 shadow-md focus:outline-none sm:hover:opacity-60"
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                >
                  <div class="w-full text-base sm:text-lg flex justify-between items-center">
                    <div />
                    <div class="tracking-widest uppercase text-sm">Shop Now</div>
                    <div>
                      <ArrowTopRightOnSquareIcon className="self-start inline h-5 w-5 sm:h-6 sm:w-6 ml-3 stroke-2" />
                    </div>
                  </div>
                </button>
              </a>
            </div>
          </div>
        </div>
        <div class="pt-2 sm:pt-8 text-sm sm:text-lg font-light leading-8">
          {
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse a arcu felis. Quisque eleifend mauris ut neque fringilla, ac tempus orci ullamcorper. Proin molestie neque in laoreet posuere. "
          }
        </div>
      </div>
    );
  }
}

export default ProductInfo;
