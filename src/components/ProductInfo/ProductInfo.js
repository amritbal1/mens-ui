import React, { PureComponent } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { isEmpty } from "../../utils/objectUtils";
import {
  ATTRIBUTE_LABELS_POSITIVE,
  ATTRIBUTE_LABELS_NEGATIVE,
} from "../ProductCard/attributes";

class ProductInfo extends PureComponent {
  render() {
    const { productDetails, attributeAnalysis } = this.props;
    const {
      brandName,
      productName,
      affiliateData = [{ productUrl: "" }],
    } = productDetails;
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
        <div class="mb-6">
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
        {!isEmpty(attributeAnalysis) && (
          <div class="sm:pt-4">
            <div class="font-light text-sm font-normal mb-2 uppercase tracking-wider text-slate-gray">
              What the reviews say
            </div>
            <div class="flex flex-wrap">
              {attributeAnalysis.map((attribute) => {
                const { overallScore, attribute: attributeName } = attribute;
                return overallScore > 50
                  ? ATTRIBUTE_LABELS_POSITIVE[attributeName] && (
                      <span class="text-xs font-light text-slate-gray border rounded-full p-1 mb-1 mr-1 px-2">
                        {ATTRIBUTE_LABELS_POSITIVE[attributeName]}
                        <CheckIcon class="ml-1 inline h-3 w-3 text-green-700" />
                      </span>
                    )
                  : ATTRIBUTE_LABELS_NEGATIVE[attributeName] && (
                      <span class="text-xs font-light text-slate-gray border rounded-full p-1 mb-1 mr-1 px-2">
                        {ATTRIBUTE_LABELS_NEGATIVE[attributeName]}
                        <XMarkIcon class="ml-1 inline h-3 w-3 text-red-700" />
                      </span>
                    );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ProductInfo;
