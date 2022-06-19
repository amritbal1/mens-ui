import axios from "axios";
import { isEmpty } from "../../../../utils/objectUtils";

//This service POSTS a new review to the endpoint
export const postNewReview = async ({ payload }) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL_PREFIX}/reviews/new-review`,
      payload
    );
    if (isEmpty(data)) return null;
    const { reviewId } = data;
    if (isEmpty(reviewId)) return null;
    return reviewId;
  } catch (e) {
    console.error("Error posting data to NewReview service: ", e);
    return null;
  }
};

//This service PUTS the S3 imageUrls for a new review to the endpoint
export const postNewReviewImages = async ({ reviewId, payload }) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_API_URL_PREFIX}/reviews/new-review/${reviewId}`,
      payload
    );
  } catch (e) {
    console.error("Error posting data to NewReview service: ", e);
  }
};
