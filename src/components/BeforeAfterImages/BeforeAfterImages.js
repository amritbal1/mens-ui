import React, { Component } from "react";
import { isEmpty } from "../../utils/objectUtils";
import { productPageTitleStyle } from "../../utils/styles";

class BeforeAfterImages extends Component {
  render() {
    const { beforeAfterImageUrls } = this.props;
    if (isEmpty(beforeAfterImageUrls)) return null;
    const style =
      !isEmpty(beforeAfterImageUrls) && beforeAfterImageUrls.length === 1
        ? "grid grid-cols-1"
        : "grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 sm:gap-y-8";

    return (
      <div>
        <div class={`${productPageTitleStyle} border-t-2 py-4 mb-2`}>
          Before &amp; After Photos
        </div>
        <div class="flex justify-center">
          <div class={style}>
            {beforeAfterImageUrls.map((beforeAfterPair) => {
              const { beforeImageUrl, afterImageUrl } = beforeAfterPair;
              return (
                <div class="rounded-md flex items-center justify-center">
                  <div class="h-48 w-48">
                    <img
                      src={beforeImageUrl[0]}
                      class="rounded-l-md"
                      alt="before"
                    />
                  </div>
                  <div class="h-48 w-48">
                    <img
                      src={afterImageUrl[0]}
                      class="rounded-r-md"
                      alt="after"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default BeforeAfterImages;
