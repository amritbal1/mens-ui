import axios from "axios";
import { isEmpty } from "../utils/objectUtils";

//This service returns the pricing information for 1 product
export const getPricingData = async ({ productId, country }) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL_PREFIX}/products/price/productId/${productId}/${country}`
    );
    return !isEmpty(data) &&
      !isEmpty(data[0].pricingData) &&
      !isEmpty(data[0].pricingData.filter((el) => el.country === country))
      ? data[0].pricingData.filter((el) => el.country === country)[0]
      : null;
  } catch (e) {
    console.error("Error getting data from PricingData service: ", e);
    return [];
  }
};
