export const FinderButton = ({ text, onClick, disabled, styles }) => {
  const disabledStyle = disabled
    ? "disabled:opacity-30 cursor-default"
    : "transition-transform md:hover:bg-lilac-200 transform md:hover:-translate-y-1";
  const cssStyles = ` ${disabledStyle} py-2 px-4 shadow-md font-semibold rounded-lg text-white bg-lilac-300 focus:outline-none uppercase tracking-wide text-sm ${styles}`;
  return (
    <button class={cssStyles} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};
