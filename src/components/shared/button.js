export const FinderButton = ({ text, onClick, disabled, styles }) => {
  const disabledStyle = disabled
    ? "disabled:opacity-30 cursor-default"
    : "transition-transform md:hover:bg-lilac-600 md:hover:text-white transform md:hover:-translate-y-1";
  const cssStyles = ` ${disabledStyle} py-2 px-5 sm:px-8 shadow-md font-normal rounded-lg text-white border border-lilac-600 text-lilac-600 uppercase focus:outline-none tracking-wide text-sm flex-shrink-0 ${styles}`;
  return (
    <button class={cssStyles} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};
