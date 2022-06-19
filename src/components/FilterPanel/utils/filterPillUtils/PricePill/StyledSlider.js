import Slider from "@material-ui/core/Slider";
import { makeStyles } from "@material-ui/core/styles";

const useStylesSlider = makeStyles(() => ({
  track: {
    backgroundColor: "#509B95",
  },
  rail: {
    backgroundColor: "#509B95",
  },
  thumb: {
    color: "#509B95",
  },
}));

const StyledSlider = (props) => {
  const classes = useStylesSlider();
  const {
    value,
    ValueLabelComponent,
    onChangeCommittedFn,
    filterOptionClickFn,
    ariaLabelledBy,
    step,
    defaultValue,
    marks,
    min,
    max,
    ref,
  } = props;
  return (
    <div ref={ref}>
      <Slider
        classes={classes}
        value={value}
        ValueLabelComponent={ValueLabelComponent}
        aria-labelledby={ariaLabelledBy}
        step={step}
        defaultValue={defaultValue}
        marks={marks}
        valueLabelDisplay="on"
        min={min}
        max={max}
        onChangeCommitted={(e, value) =>
          onChangeCommittedFn(e, value, filterOptionClickFn)
        }
      />
    </div>
  );
};

export const getSlider = (props) => {
  return <StyledSlider {...props} />;
};
