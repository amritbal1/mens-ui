export const additionalBaseStyle = {
  width: "11rem",
  height: "11rem",
  borderRadius: "9999px",
  border: "1px solid #D1D5DB",
  justifyContent: "center",
};

export const productPageTitleStyle =
  "text-lg text-slate-gray font-light tracking-wider uppercase";

export const getButtonStyle = ({ disabled }) => {
  const disabledStyle = disabled
    ? "opacity-30 cursor-default"
    : "transition-transform md:hover:bg-lilac-200 transform md:hover:-translate-y-1";
  return ` ${disabledStyle} py-2 px-6 shadow-md font-semibold rounded-lg text-white bg-lilac-300 focus:outline-none uppercase tracking-wide text-sm`;
};

export const infiniteScrollText =
  "flex pb-10 justify-center text-base text-slate-gray tracking-wider font-light";
