import React, { PureComponent } from "react";
import {
  ArrowTopRightOnSquareIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import { CURRENCIES } from "../../utils/currencyEnum";
import { isEmpty } from "../../utils/objectUtils";
import { Disclosure } from "@headlessui/react";
class ProductInfo extends PureComponent {
  render() {
    const { productDetails, pricingData } = this.props;
    const { brandName, productName, ingredients } = productDetails;
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
      <div class="h-full w-full flex flex-col sm:justify-between">
        <div>
          <div class="flex mb-2 mr-2 sm:mr-0">
            <div class="sm:px-0">
              <div class="text-sm font-light text-slate-gray mb-1">
                {brandName}
              </div>
            </div>
          </div>
          <div>
            <div class="uppercase tracking-wide-x text-base text-slate-gray sm:px-0 mb-6">
              {productName}
            </div>
          </div>
        </div>
        <div class="mb-4 sm:mt-6">
          <div class="mb-4">
            {price && (
              <span class="text-slate-gray uppercase font-light">
                {`~${localCurrency} ${(Math.round(price * 100) / 100).toFixed(
                  2
                )}`}
              </span>
            )}
            <a
              href={affiliateLink.productUrl || ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                class="mt-2 w-full bg-gray-900 text-gray-50 tracking-wide py-3 sm:py-2 px-6 rounded-lg shadow-md focus:outline-none sm:hover:opacity-60"
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
              >
                <div class="w-full text-sm flex justify-between items-center">
                  <div />
                  <div>Shop Now</div>
                  <div>
                    <ArrowTopRightOnSquareIcon className="self-end inline h-5 w-5 ml-3" />
                  </div>
                </div>
              </button>
            </a>
          </div>
          {!isEmpty(ingredients) && (
            <div className="w-full">
              <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between border-b border-gray-400 py-1 text-left text-sm font-light text-slate-gray pr-1">
                        <span>Ingredients</span>
                        <ChevronUpIcon
                          className={`${
                            open ? "rotate-180 transform" : ""
                          } h-5 w-5 text-slate-gray`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500 font-light sm:max-h-40 sm:overflow-y-scroll scrollbar">
                        {ingredients.join(", ")}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ProductInfo;
