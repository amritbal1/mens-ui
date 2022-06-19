export const ReviewFormTitle = ({ title, styles, isRequired = true }) => {
  const styleClass = `text-sm font-normal text-slate-gray ${styles}`;
  return (
    title && (
      <div class={styleClass}>
        {title}
        {isRequired && <span class="text-red-600">* </span>}
      </div>
    )
  );
};
