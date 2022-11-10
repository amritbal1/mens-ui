import { CURRENCIES } from "../utils/currencyEnum";

export const getUserLocation = async () => {
  const request = await fetch("https://ipinfo.io/json?token=46a3658e040600");
  const jsonResponse = await request.json();
  const userCountry = jsonResponse.country || "GB";
  localStorage.setItem("ipCountry", userCountry);
  localStorage.setItem("localCurrency", CURRENCIES[userCountry]);
  return userCountry;
};
