const optionBaseStyleOverrides = {
  padding: "0px",
};

export const getSelectStyles = ({ overrideStyles = {} }) => {
  return {
    placeholder: (provided) => ({
      ...provided,
      fontWeight: 200,
      textOverflow: "ellipsis",
      maxWidth: "95%",
      whiteSpace: "nowrap",
      overflow: "hidden",
      fontSize: "0.875rem",
    }),
    control: (provided) => ({
      ...provided,
      border: "none",
      borderRadius: "3rem",
      boxShadow: "0 1px 6px rgb(32 33 36 / 28%)",
      minHeight: "30px",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: "3px",
      width:
        window.screen.width < 768 && overrideStyles && overrideStyles.menuWidth
          ? overrideStyles.menuWidth
          : provided.width,
      position:
        window.screen.width < 768 && overrideStyles && overrideStyles.position
          ? overrideStyles.position
          : provided.position,
      marginLeft:
        window.screen.width < 768 && overrideStyles && overrideStyles.marginLeft
          ? overrideStyles.marginLeft
          : provided.marginLeft,
    }),
    valueContainer: (provided) => ({
      ...provided,
      height:
        overrideStyles && overrideStyles.valueContainerHeight
          ? overrideStyles.valueContainerHeight
          : provided.height,
      padding: "0.2rem 1rem",
      fontSize: "0.875rem",
      color: "#2f3033",
      fontWeight: 300,
    }),
    option: (provided, state) => {
      return state.data.isHeader
        ? {
            ...provided,
            ...optionBaseStyleOverrides,
            backgroundColor: "white",
            color: "#2f3033",
          }
        : {
            ...provided,
            ...optionBaseStyleOverrides,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#E4FAF7",
              color: "#37514f",
            },
            backgroundColor: state.isSelected ? "#E4FAF7" : "white",
            color: state.isSelected ? "#36615b" : "#2f3033",
          };
    },
  };
};
