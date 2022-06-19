import axios from "axios";
//This service returns a list of all the matching products after a product finder search
export const getProductResultsData = async ({ payload }) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL_PREFIX}/products`,
      payload
    );
    return { results: data };
  } catch (e) {
    console.error("Error getting data from ProductFinder service: ", e);
    return null;
  }
};
