import axios from "axios";
//This service returns the MongoDB generated userId & profile settings for an existing user, provided with their auth0userId

export const getExistingUserData = async ({ auth0UserId }) => {
  try {
    const result = await axios.get(
      `${process.env.REACT_APP_API_URL_PREFIX}/users/${auth0UserId}`
    );
    return result.data;
  } catch (e) {
    console.error("Error getting userId for existing user: ", e);
    return null;
  }
};
