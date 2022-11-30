import "./slider.css";
import Slider from "@mui/material/Slider";
import { MAX_PRICE_FILTER } from "../../../../../utils/enums";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const finalTheme = createTheme({
  components: {
    MuiSlider: {
      styleOverrides: {
        valueLabel: ({ ownerState, theme }) => ({
          backgroundColor: "transparent",
          color: "black",
          padding: "0.25rem 0.55rem",
        }),
      },
    },
  },
});

export const getSlider = (props) => {
  const {
    value,
    onChangeCommittedFn,
    filterOptionClickFn,
    ariaLabelledBy,
    min,
    max,
    ref,
    onChangeFn,
  } = props;
  return (
    <div ref={ref}>
      <ThemeProvider theme={finalTheme}>
        <Slider
          value={value}
          valueLabelDisplay="on"
          getAriaLabel={() => ariaLabelledBy}
          defaultValue={[0, MAX_PRICE_FILTER]}
          min={min}
          max={max}
          onChangeCommitted={(e, value) =>
            onChangeCommittedFn(e, value, filterOptionClickFn)
          }
          onChange={(e, value) => onChangeFn(e, value)}
        />
      </ThemeProvider>
    </div>
  );
};
