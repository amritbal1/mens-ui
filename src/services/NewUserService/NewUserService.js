import axios from "axios";

//Post auth0userId and email address of first time user sign in to Back-end to get back a mongoDb user Id
export const getNewUserId = async ({ auth0UserId, emailAddress }) => {
  try {
    const payload = { auth0UserId, emailAddress };
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL_PREFIX}/users`,
      payload
    );
    return response.data;
  } catch (e) {
    console.error("Error getting new user id", e);
    return {};
  }
};
