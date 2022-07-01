export const FinderButton = ({ text, onClick, disabled, styles }) => {
  const disabledStyle = disabled
    ? "disabled:opacity-30 cursor-default"
    : "transition-transform md:hover:bg-lilac-300 md:hover:text-white transform md:hover:-translate-y-1";
  const cssStyles = ` ${disabledStyle} py-3 px-8 shadow-md font-normal rounded-lg text-white border border-lilac-400 text-slate-teal uppercase focus:outline-none tracking-wide text-sm flex-shrink-0 ${styles}`;
  return (
    <button class={cssStyles} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};
