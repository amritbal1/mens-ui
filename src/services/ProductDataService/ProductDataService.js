import axios from "axios";
//This service returns all the data for 1 product - e.g. price, name, overall review metrics

export const getProductData = async ({ productId, skinType, skinConcern }) => {
  const payload = { skinType: skinType, skinConcern: skinConcern };
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL_PREFIX}/products/productId/${productId}`,
      payload
    );
    return data[0];
  } catch (e) {
    console.error("Error getting data from ProductData service: ", e);
    return null;
  }
};
