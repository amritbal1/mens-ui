import { isEmpty } from "../../../utils/objectUtils";

export const getOption = ({
  value,
  imageUrl,
  displayValue,
  isChecked,
  clickHandlerFn,
}) => {
  const selectedOptionStyles = isChecked ? "bg-gray-100" : "";
  const hoverDivStyles = `${selectedOptionStyles} sm:mx-1 md:hover:border md:hover:border-2 rounded-3xl h-110px w-110px sm:h-140px sm:w-140px md:h-160px md:w-160px flex flex-grow flex-col justify-center items-center cursor-pointer md:hover:bg-gray-100`;
  const outerDivStyle = `rounded-full h-110px sm:h-140px md:h-160px mb-8`;
  return (
    <div class={outerDivStyle} key={value}>
      <div class={hoverDivStyles} onClick={() => clickHandlerFn(value)}>
        <img
          src={imageUrl}
          alt="skin"
          class="h-80px w-80px md:h-100px md:w-100px"
        />
        <div class="font-light text-slate-gray pt-1 md:pt-3 justify-self-end text-center text-sm">
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
    });
  });
};
