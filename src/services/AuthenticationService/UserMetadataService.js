export const getUserMetadata = async ({ auth0UserId, accessToken }) => {
  const domain = process.env.REACT_APP_AUTHO_DOMAIN;
  const userDetailsByIdUrl = `https://${domain}/api/v2/users/${auth0UserId}`;
  try {
    const metadataResponse = await fetch(userDetailsByIdUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { user_metadata } = await metadataResponse.json();
    return user_metadata;
  } catch (e) {
    console.error(
      `Error getting user metadata from ${userDetailsByIdUrl}. Error received: ${e}`
    );
    return null;
  }
};
