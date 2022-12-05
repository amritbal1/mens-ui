import axios from "axios";
//This service returns all the data for 1 product - e.g. price, name, overall review metrics

export const getTrendingProducts = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL_PREFIX}/products/trending`
    );
    return data;
  } catch (e) {
    console.error("Error getting data from Trending Products service: ", e);
    return null;
  }
};
