import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { PRODUCT_CHARACTERISTICS_MAP } from "../../utils/config";

const FIELD = {
  skinTypeData: "skinType",
  skinConcernData: "skinConcern",
  productCharacteristicData: "productCharacteristic",
};

export const CriteriaData = ({ criteriaData }) => {
  const rows = Object.keys(criteriaData).map((criteria) => {
    const criteriaValues = criteriaData[criteria];
    return criteriaValues.map((data, i) => {
      const fieldToGet = FIELD[criteria];
      const { percentage } = data;
      const field = data[fieldToGet];
      const displayValue =
        criteria === "skinTypeData"
          ? `${field} skin`
          : criteria === "productCharacteristicData"
          ? PRODUCT_CHARACTERISTICS_MAP[field]
          : field;
      return (
        <div key={i} class="flex justify-between">
          <span>{displayValue}</span>
          <span>{getRatingIconToDisplay({ percentage })}</span>
        </div>
      );
    });
  });
  return <div class="w-4/5 mx-auto text-sm">{rows}</div>;
};

const getRatingIconToDisplay = ({ percentage }) => {
  //TODO: decide on rating cut off to display tick or cross
  return percentage > 70 ? (
    <CheckIcon class="h-5 w-5 text-green-600" />
  ) : (
    <XIcon class="h-5 w-5 text-red-600" />
  );
};
