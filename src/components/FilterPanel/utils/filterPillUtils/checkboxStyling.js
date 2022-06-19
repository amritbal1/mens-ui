export const getCheckboxStyle = ({ isSelected }) => {
  const selectedStyling = isSelected ? "bg-lilac-50" : "bg-white";
  return `${selectedStyling} rounded-md border w-27px h-27px mr-2 flex-shrink-0`;
};

export const checkIconStyle = "h-6 w-6 text-aqua-dark";
