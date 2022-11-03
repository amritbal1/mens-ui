import axios from "axios";
import { isEmpty } from "../utils/objectUtils";

//This service returns the pricing information for 1 product
export const getPricingData = async ({ productId }) => {
  const country = localStorage.getItem("ipCountry") || "GB";
  try {
    const { data } = await axios.get(
      `${
        process.env.REACT_APP_API_URL_PREFIX
      }/products/price/productId/${productId}/${country}`
    );
    return !isEmpty(data) &&
      !isEmpty(data[0].pricingData) &&
      !isEmpty(data[0].pricingData[0])
      ? data[0].pricingData[0]
      : null;
  } catch (e) {
    console.error("Error getting data from PricingData service: ", e);
    return null;
  }
};
