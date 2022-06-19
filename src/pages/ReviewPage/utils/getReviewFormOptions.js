import { skinTypeOptions } from "../../../utils/config";
import { LOCAL_STORAGE_ITEM } from "../../../utils/enums";
import { isEmpty } from "../../../utils/objectUtils";

export const getSkinTypeOptions = () => {
  const userProfileInformation = localStorage.getItem(
    LOCAL_STORAGE_ITEM.USER_PROFILE_INFORMATION
  );
  if (!userProfileInformation) return skinTypeOptions;
  const parsedInformation = JSON.parse(userProfileInformation);
  if (isEmpty(parsedInformation)) return skinTypeOptions;
  const { skinTypes } = parsedInformation;
  return skinTypeOptions.filter(({ value }) => {
    return skinTypes.some((skinType) => skinType === value);
  });
};