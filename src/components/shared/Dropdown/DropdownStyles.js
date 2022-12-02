const optionBaseStyleOverrides = {
  padding: "0px",
};

export const getSelectStyles = ({ overrideStyles = {} }) => {
  return {
    placeholder: (provided) => ({
      ...provided,
      textOverflow: "ellipsis",
      maxWidth: "95%",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textTransform: "uppercase",
      fontWeight: overrideStyles.menuBarStyles ? 500 : 400,
      fontSize: overrideStyles.menuBarStyles ? "0.875rem" : "0.875rem",
      fontStyle: overrideStyles.menuBarStyles ? "italic" : "normal",
      letterSpacing: overrideStyles.menuBarStyles ? "0.1em" : "normal",
      paddingLeft: overrideStyles.menuBarStyles ? "1rem" : provided.marginLeft,
      color: "#231f20",
    }),
    control: (provided) => ({
      ...provided,
      border: "transparent",
      backgroundColor: "transparent",
      minHeight: "30px",
      cursor: "pointer",
      borderColor: "transparent",
      boxShadow: "0 0 0 1px transparent",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      padding: "0px",
      display: "none",
    }),
    menuList: (provided) => ({
      ...provided,
      overflowX: "hidden",
      paddingTop: overrideStyles.menuBarStyles ? "0.5rem" : "1.2rem",
      paddingBottom: "4px",
      border: "none",
      backgroundColor: overrideStyles.menuBarStyles
        ? "#f7f7f7"
        : provided.backgroundColor,
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0px",
      border: "none",
      marginTop: "3px",
      boxShadow:
        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      backgroundColor: overrideStyles.menuListBackgroundColor
        ? overrideStyles.menuListBackground
        : provided.backgroundColor,
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
      padding: overrideStyles.menuBarStyles ? "0rem 0rem" : "0.2rem 0.5rem",
      fontSize: "0.875rem",
      color: "#2f3033",
      fontWeight: 300,
      justifyContent: overrideStyles.menuBarStyles ? "start" : "center",
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
            transition: "transform .1s ease-out",
            cursor: "pointer",
            "&:hover": {
              transform: "translate(5px, 0px)",
            },
            backgroundColor: overrideStyles.menuBarStyles
              ? overrideStyles.menuBarStyles
              : "white",
            color: state.isSelected ? "#36615b" : "#2f3033",
          };
    },
  };
};
