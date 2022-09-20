import React, { PureComponent } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

class ProductInfo extends PureComponent {
  render() {
    const { productDetails } = this.props;
    const {
      brandName,
      productName,
      affiliateData = [{ productUrl: "" }],
    } = productDetails;
    return (
      <div class="h-full w-full flex flex-col sm:justify-between">
        <div class="hidden md:block">
          <div class="flex mb-2 mr-2 sm:mr-0">
            <div class="sm:px-0">
              <div class="text-base font-light text-slate-gray mb-1">
                {brandName}
              </div>
            </div>
          </div>
          <div>
            <div class="uppercase tracking-widest text-base text-slate-gray sm:px-0 mb-6">
              {productName}
            </div>
          </div>
        </div>
        <div class="md:hidden sm:block">
          <div class="flex mb-2 mr-2 sm:mr-0">
            <div class="sm:px-0">
              <div class="text-base font-light text-slate-gray mb-1">
                {brandName}
              </div>
            </div>
          </div>
          <div>
            <div class="uppercase tracking-widest text-base text-slate-gray sm:px-0 mb-6">
              {productName}
            </div>
          </div>
        </div>

        <div class="mb-4">
          <a
            href={affiliateData[0].productUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              class="w-full bg-gray-900 text-gray-50 tracking-wide py-3 sm:py-2 px-6 rounded-lg shadow-md focus:outline-none sm:hover:opacity-60"
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
      </div>
    );
  }
}

export default ProductInfo;
