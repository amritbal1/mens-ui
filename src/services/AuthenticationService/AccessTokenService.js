export const getAccessToken = async ({ getAccessTokenSilently }) => {
  const domain = process.env.REACT_APP_AUTHO_DOMAIN;
  const audienceUrl = `https://${domain}/api/v2/`;
  try {
    const accessToken = await getAccessTokenSilently({
      audience: audienceUrl
    });
    return accessToken;
  } catch (e) {
    console.error(`Error getting access token: ${e}`);
  }
};
