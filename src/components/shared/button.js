export const FinderButton = ({ text, onClick, disabled, styles }) => {
  const disabledStyle = disabled
    ? "disabled:opacity-30 cursor-default"
    : "transition-transform md:hover:bg-lilac-200 transform md:hover:-translate-y-1";
  const cssStyles = ` ${disabledStyle} py-3 px-8 shadow-md font-normal rounded-lg text-white bg-lilac-500 focus:outline-none tracking-wide text-sm flex-shrink-0 ${styles}`;
  return (
    <button class={cssStyles} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};
