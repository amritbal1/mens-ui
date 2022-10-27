import queryString from "query-string";
import { isEmpty } from "../objectUtils";

export const getValueFromUrl = ({ param }) => {
  const searchParams = queryString.parse(window.location.search);
  const parameterValue = searchParams[param];
  if (param === "minPrice" || param === "maxPrice") {
    return parameterValue === "null" ? null : Number(parameterValue);
  } else if (!isEmpty(parameterValue)) {
    return parameterValue !== "null"
      ? parameterValue.indexOf(",") > -1
        ? parameterValue.split(",")
        : [parameterValue]
      : [];
  } else return [];
};

export const getArrayValue = ({ parameterValue }) => {
  return parameterValue !== "null"
    ? parameterValue.indexOf(",") > -1
      ? parameterValue.split(",")
      : [parameterValue]
    : [];
};

export const splitArray = ({ arr }) => {
  if (isEmpty(arr)) return "";
  if(arr.length === 1) return arr[0];
  if(arr.length > 1) return arr.join(",")
};
