import { isEmpty } from "../../../utils/objectUtils";
import { ThumbUpIcon } from "@heroicons/react/solid";
import { ThumbDownIcon } from "@heroicons/react/solid";
import { PRODUCT_CHARACTERISTICS_MAP } from "../../../utils/config";
import { PILL_TYPE } from "../../../utils/enums";

export const getAttributePills = ({ attributes, pillType }) => {
  if (isEmpty(attributes)) return null;
  return Object.keys(attributes).map((attribute) => {
    const attributeValue = attributes[attribute];
    let mappedValues = attributeValue;
    if (attribute === "productCharacteristicData") {
      mappedValues = attributeValue.map((value) => {
        return PRODUCT_CHARACTERISTICS_MAP[value];
      });
    } else if (attribute === "skinTypeData") {
      mappedValues = attributeValue.map((value) => {
        return `${value} skin`;
      });
    }
    const pillColour =
      pillType === PILL_TYPE.POSITIVE
        ? "bg-green-50 text-green-700 border-green-300"
        : "bg-red-50 text-red-700 border-red-300";
    const style = `${pillColour} flex mr-2 rounded-full shadow-md px-2 py-1 flex-shrink-0 border border-opacity-20 mb-2 text-xs font-extralight`;

    return mappedValues.map((value, index) => {
      return (
        <div class={style} key={index}>
          {pillType === PILL_TYPE.POSITIVE ? (
            <ThumbUpIcon class="h-14px w-14px my-auto mr-2" />
          ) : (
            <ThumbDownIcon class="h-14px w-14px my-auto mr-2" />
          )}
          {value}
        </div>
      );
    });
  });
};
