import { LOCAL_STORAGE_ITEM } from "../../../../utils/enums";
import { isEmpty } from "../../../../utils/objectUtils";
import { getValueInDays } from "../../../../utils/speedOfResultsUtils/speedOfResultsUtil";

export const createNewReviewPayload = ({
  starRating,
  productId,
  wouldRepurchaseValue,
  skinConcerns,
  skinTypes,
  productCharacteristics,
  reviewTextDetails,
  speedOfResults,
}) => {
  const submitDate = new Date();
  const isoDate = submitDate.toISOString();
  const userProfileInfo = localStorage.getItem(
    LOCAL_STORAGE_ITEM.USER_PROFILE_INFORMATION
  );

  let { ethnicity, displayName, profileImage } =
    !isEmpty(userProfileInfo) && userProfileInfo !== "null"
      ? JSON.parse(userProfileInfo)
      : { ethnicity: null, displayName: null, profileImage: null };

  const payloadSkinTypes = Object.keys(skinTypes).map((skinType) => {
    return { skinType, response: skinTypes[skinType] };
  });
  const payloadSkinConcerns = Object.keys(skinConcerns).map((skinConcern) => {
    return { skinConcern, response: skinConcerns[skinConcern] };
  });
  const productCharacteristicsArray = Object.keys(productCharacteristics).map(
    (productCharacteristic) => {
      return {
        productCharacteristic: productCharacteristic,
        response: productCharacteristics[productCharacteristic],
      };
    }
  );
  const userId = localStorage.getItem(LOCAL_STORAGE_ITEM.USER_ID);
  const { value, unit } = speedOfResults;
  const numberValue = !isNaN(Number(value)) ? Number(value) : null;
  const valueInDays = getValueInDays({ value: numberValue, unit });
  return {
    userId,
    userData: {
      ethnicity,
      displayName,
      profileImage,
    },
    productId,
    reviewDate: isoDate,
    starRating,
    wouldRepurchase: wouldRepurchaseValue,
    reviewTextDetails,
    productCharacteristicData: productCharacteristicsArray,
    skinConcernData: payloadSkinConcerns,
    skinTypeData: payloadSkinTypes,
    speedOfResults: { ...speedOfResults, value: numberValue, valueInDays },
    hasImages: false,
    reviewImages: [],
  };
};
