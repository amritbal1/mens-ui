import { CURRENCY_LETTERS } from "../utils/currencyEnum";

export const getConvertedCurrency = async ({ amount }) => {
  const userCountry = localStorage.getItem("ipCountry") || "GB";
  const request = await fetch(
    `https://api.exchangerate.host/convert?from=${CURRENCY_LETTERS[userCountry]}&to=GBP&amount=${amount}`
  );
  const response = await request.json();
  return response.result || amount;
};
