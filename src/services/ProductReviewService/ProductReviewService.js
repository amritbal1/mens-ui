import axios from "axios";

export const getProductReviews = async ({ payload }) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL_PREFIX}/reviews`,
      payload
    );
    return data;
  } catch (e) {
    console.error("Error getting data from ProductReview service: ", e);
    return null;
  }
};
