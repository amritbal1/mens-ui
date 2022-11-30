import { PureComponent } from "react";
import { REGION, S3_BUCKET } from "../../aws-config";
import "./circle.css";
class ProductCard extends PureComponent {
  state = {
    displayChevron: true,
  };

  handleProductCardClick = async ({ productId }) => {
    const { history } = this.props;
    history.push(
      `/product?productId=${productId}`
    );
  };

  handleMouseEnter = (e) => {
    this.setState({ displayChevron: false });
  };
  handleMouseLeave = (e) => {
    this.setState({ displayChevron: true });
  };

  render() {
    const { data } = this.props;
    const { dbg_price, productDetails } = data;
    const { productName, brandName, mainImageUrl, productId } = productDetails;
    const s3ImageUrl = `https://s3.${REGION}.amazonaws.com/${S3_BUCKET}/${mainImageUrl}`;
    return (
      <div class="mb-8 p-4 sm:mb-4">
        <figure
          class="max-w-20 mx-auto bg-white cursor-pointer transition-transform transform sm:hover:scale-105 sm:hover:shadow-lg hover:opacity-50 sm:hover:opacity-100"
          onClick={() => this.handleProductCardClick({ productId: productId })}
        >
          <div>
            <div class="relative pt-full">
              <div class="absolute inset-0 h-full w-full my-auto mx-auto">
                <img
                  src={s3ImageUrl}
                  alt="product"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
          <div class="h-1" />
          <figcaption class="px-2 py-2 sm:py-4 sm:px-6">
            <div class="text-base font-light text-slate-gray mb-2 uppercase">
              {brandName}
            </div>
            <div class="flex justify-between mb-4 text-slate-gray">
              <div class="text-xs sm:text-lg text-slate-gray tracking-tight">
                {productName}
              </div>
            </div>

            <div class="mb-2 sm:mb-4 flex justify-between w-full">
              {dbg_price}
            </div>
          </figcaption>
        </figure>
      </div>
    );
  }
}

export default ProductCard;
