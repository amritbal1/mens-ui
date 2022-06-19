import { SEARCH_BAR_OPTIONS } from "../../../utils/enums";
import { isEmpty } from "../../../utils/objectUtils";
import {
  BRAND_HEADER_OPTION,
  CATEGORIES_HEADER_OPTION,
  PRODUCTS_HEADER_OPTION,
} from "./constants";

export const getFormattedOptions = ({ searchResults }) => {
  if (isEmpty(searchResults)) {
    return [];
  }
  const { results } = searchResults;
  const {
    brandData: brands,
    productCategoryData: categories,
    productData: products,
  } = results;
  const brandOptions = getBrandsOptions({ brands });
  const categoryOptions = getCategoriesOptions({ categories });
  const productOptions = getProductsOptions({ products });
  return [...brandOptions, ...categoryOptions, ...productOptions];
};

const getBrandsOptions = ({ brands }) => {
  if (isEmpty(brands)) {
    return [];
  }
  const brandOptions = brands.map((brand) => {
    return { value: brand, label: brand, type: SEARCH_BAR_OPTIONS.BRAND };
  });
  return [BRAND_HEADER_OPTION, ...brandOptions];
};

const getCategoriesOptions = ({ categories }) => {
  if (isEmpty(categories)) {
    return [];
  }
  const categoriesOptions = categories.map((category) => {
    return {
      value: category,
      label: category,
      type: SEARCH_BAR_OPTIONS.CATEGORY,
    };
  });
  return [CATEGORIES_HEADER_OPTION, ...categoriesOptions];
};

const getProductsOptions = ({ products }) => {
  if (isEmpty(products)) {
    return [];
  }
  const productsOptions = products.map((product) => {
    const { productName, brandName, productId, mainImageUrl } = product;
    return {
      value: productName,
      label: productName,
      brandName,
      type: SEARCH_BAR_OPTIONS.PRODUCT,
      productId,
      mainImageUrl,
    };
  });
  return [PRODUCTS_HEADER_OPTION, ...productsOptions];
};
