//This service is called either when 1) new user sets up new profile information or 2) existing user edits existing profile information.
//Params = mongoDb user Id and profile setting information
import axios from "axios";

export const postUserProfileInformation = async ({ userId, payload }) => {
  try {
    await axios.put(`${process.env.REACT_APP_API_URL_PREFIX}/users/${userId}`, payload);
  } catch (e) {
    console.error("Error posting user profile information", e);
  }
};
