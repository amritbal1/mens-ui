import queryString from "query-string";
import { configValues } from "../config";
import { isEmpty } from "../objectUtils";

export const getValueFromUrl = ({ param }) => {
  const searchParams = queryString.parse(window.location.search);
  const parameterValue = searchParams[param];
  //Number parameters
  if (param === "starRating" || param === "minPrice" || param === "maxPrice") {
    return parameterValue === "null" ? null : Number(parameterValue);
  }
  if (param === "withImages") {
    if (parameterValue === "null") return null;
    if (parameterValue === "true") return true;
  }

  if (param === "brands") {
    if (parameterValue === "all") {
      return configValues.brandValues;
    } else if (parameterValue === "null") {
      return [];
    } else {
      return parameterValue.indexOf(",") > -1
        ? parameterValue.split(",")
        : [parameterValue];
    }
  }
  if (param === "pageNumber") {
    return parameterValue &&
      parameterValue !== "null" &&
      !isNaN(Number(parameterValue))
      ? Number(parameterValue)
      : 1;
  }
  if (!isEmpty(parameterValue)) {
    return parameterValue !== "null"
      ? parameterValue.indexOf(",") > -1
        ? parameterValue.split(",")
        : [parameterValue]
      : [];
  }
  return [];
};
