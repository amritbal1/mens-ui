import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

export const getSlider = (props) => {
  const {
    value,
    onChangeCommittedFn,
    filterOptionClickFn,
    ariaLabelledBy,
    step,
    marks,
    min,
    max,
    ref,
  } = props;
  const NewSlider = styled(Slider)({
    color: "#509B95",
    height: 8,
    "& .MuiSlider-track": {
      border: "none",
    },
    "& .MuiSlider-thumb": {
      height: 20,
      width: 20,
      backgroundColor: "#fff",
      border: "2px solid currentColor",
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
      "&:before": {
        display: "none",
      },
    },
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.2,
      fontSize: 13,
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      color: "white",
      borderRadius: "20% 20% 20% 20%",
      backgroundColor: "#83C4BD",
    },
  });
  return (
    <div ref={ref}>
      <NewSlider
        value={value}
        step={step}
        valueLabelDisplay="on"
        getAriaLabel={() => ariaLabelledBy}
        defaultValue={0}
        marks={marks}
        min={min}
        max={max}
        onChangeCommitted={(e, value) =>
          onChangeCommittedFn(e, value, filterOptionClickFn)
        }
      />
    </div>
  );
};
