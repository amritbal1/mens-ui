import React, { PureComponent } from "react";
import {
  getBrandsList,
  getProductsForBrand,
} from "../../services/BrandsService";
import { SEARCH_BAR_OPTIONS } from "../../utils/enums";
import { Dropdown } from "../shared/Dropdown/Dropdown";

class ProductSelector extends PureComponent {
  state = {
    brandOptions: [],
    productOptions: [],
    isProductDropdownDisabled: true,
    selectedBrand: null,
    selectedProductId: null,
    selectedProductName: null,
  };

  async componentDidMount() {
    const { selectedBrand, selectedProduct: selectedProductName } = this.props;
    const brandsList = await getBrandsList();
    if (!brandsList) return;
    const brandOptions = brandsList.map((brand) => {
      return { value: brand, label: brand };
    });
    this.setState({
      brandOptions,
      selectedBrand,
      selectedProductName,
    });
  }

  handleProductChange = (selectedOption) => {
    const { productSelectorHandler } = this.props;
    const { productId, label, productNameS3 } = selectedOption;
    this.setState({ selectedProductId: productId });
    productSelectorHandler({ productId, productName: label, productNameS3 });
  };

  handleBrandChange = async (selectedOption) => {
    const { brandSelectorHandler } = this.props;
    const { value: brand } = selectedOption;
    const productList = await getProductsForBrand({ brand });
    if (!productList) return;
    const productOptions = productList.map((option) => {
      const { productName, productId, mainImageUrl, productNameS3 } = option;
      return {
        productId,
        label: productName,
        type: SEARCH_BAR_OPTIONS.PRODUCT,
        mainImageUrl,
        productNameS3,
      };
    });
    this.setState({
      selectedBrand: brand,
      productOptions,
      isProductDropdownDisabled: false,
    });
    brandSelectorHandler({ brand });
  };

  render() {
    const { brandOptions, productOptions, isProductDropdownDisabled } =
      this.state;
    const { selectedBrand, selectedProduct } = this.props;
    return (
      <div>
        <div class="flex flex-col space-y-4 mt-2">
          <div>
            <Dropdown
              key={"brand-dropdown"}
              value={selectedBrand}
              options={brandOptions}
              handleChange={this.handleBrandChange}
              placeholder={"Search Brands"}
            />
          </div>
          <div>
            <Dropdown
              key={"product-dropdown"}
              value={selectedProduct}
              options={productOptions}
              handleChange={this.handleProductChange}
              isDisabled={isProductDropdownDisabled}
              placeholder={"Search Products"}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductSelector;
