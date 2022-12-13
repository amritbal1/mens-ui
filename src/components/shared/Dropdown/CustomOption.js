import { components } from "react-select";
import { SEARCH_BAR_OPTIONS } from "../../../utils/enums";
import { REGION, S3_BUCKET } from "../../../aws-config";

const getLabelSpan = ({ data }) => {
  const label = data.label;
  return (
    <div class="mb-1">
      <span class="ml-3 block truncate text-xs">{label}</span>
    </div>
  );
};

export const CustomOption = (props) => {
  const s3ImageUrl = `https://s3.${REGION}.amazonaws.com/${S3_BUCKET}/${props.data.mainImageUrl}`;
  const {
    data: { isHeader },
  } = props;
  const optionStyle = isHeader
    ? "pt-6 pb-4 border-b border-gray-300 pl-3 font-light text-base"
    : "py-1 pl-3 font-light text-base";
  return (
    <components.Option {...props}>
      <div class={optionStyle}>
        <div class="flex items-center">
          {props.data.type === SEARCH_BAR_OPTIONS.PRODUCT && (
            <img
              class="mr-2 w-10 h-10 rounded-full flex-shrink-0"
              src={s3ImageUrl}
              alt="product"
            />
          )}
          {getLabelSpan({
            data: props.data,
          })}
        </div>
      </div>
    </components.Option>
  );
};
