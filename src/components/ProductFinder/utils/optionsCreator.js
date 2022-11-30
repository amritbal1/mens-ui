import { isEmpty } from "../../../utils/objectUtils";

export const getOption = ({
  value,
  imageUrl,
  displayValue,
  isChecked,
  clickHandlerFn,
  screenValue
}) => {
  const selectedOptionStyles = isChecked ? "bg-lilac-50" : "";
  const hoverDivStyles = `${selectedOptionStyles} sm:mx-1 md:hover:border md:hover:border-2 flex flex-grow flex-col justify-center items-center cursor-pointer md:hover:bg-gray-100 py-2 mx-4 sm:p-2 w-90px h-50px`;
  const outerDivStyle = `rounded-lg w-90px h-50px sm:mx-1 py-2 mx-4 ${screenValue === "skinType" ? "flex-50 xs:flex-25" : "flex-30 xs:flex-20"}`;
  return (
    <div class={outerDivStyle} key={value}>
      <div class={hoverDivStyles} onClick={() => clickHandlerFn(value)}>
        {/* <img
          src={imageUrl}
          alt="skin"
          class="h-60px sm:h-80px w-60px sm:w-80px md:h-100px md:w-100px"
        /> */}
        <div class="font-light text-slate-gray justify-self-end text-center text-sm">
          {displayValue}
        </div>
      </div>
    </div>
  );
};

export const getSelectableOptions = ({
  options,
  selectedOptions,
  clickHandlerFn,
  screenValue
}) => {
  if (isEmpty(options)) return null;
  return options.map((option) => {
    const { displayValue, value, imageUrl } = option;
    const isChecked = !!selectedOptions.find((item) => item === value);
    return getOption({
      value,
      imageUrl,
      displayValue,
      isChecked,
      clickHandlerFn,
      screenValue
    });
  });
};
