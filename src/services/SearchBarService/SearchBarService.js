import axios from "axios";

export const getSearchBarData = async ({ payload }) => {
  const { searchTerm } = payload;
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL_PREFIX}/search?searchTerm=${searchTerm}`
    );
    return data[0];
  } catch (e) {
    console.error("Error getting data from SearchBar service: ", e);
    return null;
  }
};
