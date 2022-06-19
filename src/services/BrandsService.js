import axios from "axios";

//This service returns a list of all the brands for the review form page dropdown

export const getBrandsList = async () => {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL_PREFIX}/ref/brands`);
    return data;
  } catch (e) {
    console.error("Error getting data from Brands service: ", e);
    return null;
  }
};

//This service returns a list of all the products for a brand for the review form page dropdown

export const getProductsForBrand = async ({ brand }) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL_PREFIX}/products/brand/${brand}`
    );
    return data;
  } catch (e) {
    console.error("Error getting data from Products service: ", e);
    return null;
  }
};
