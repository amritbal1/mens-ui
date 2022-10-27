import queryString from "query-string";
import { isEmpty } from "../objectUtils";

export const getValueFromUrl = ({ param }) => {
  const searchParams = queryString.parse(window.location.search);
  const parameterValue = searchParams[param];
  if (!isEmpty(parameterValue)) {
    return parameterValue !== "null"
      ? parameterValue.indexOf(",") > -1
        ? parameterValue.split(",")
        : [parameterValue]
      : [];
  }
  return [];
};

export const getArrayValue = ({ parameterValue }) => {
  return parameterValue !== "null"
    ? parameterValue.indexOf(",") > -1
      ? parameterValue.split(",")
      : [parameterValue]
    : [];
};
