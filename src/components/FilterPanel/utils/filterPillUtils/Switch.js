import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";

const useStylesSwitch = makeStyles(() => ({
  thumb: {
    color: "#83C4BD",
  },
  switchBase: {
    color: "#abdad5",
    "&.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#85dfd5",
    },
  },
  track: {
    opacity: 0.2,
    backgroundColor: "rgb(0, 30, 60)",
    "$checked$checked + &": {
      // Controls checked color for the track
      opacity: 0.7,
      backgroundColor: "#fff",
    },
  },
}));

const StyledSwitch = (props) => {
  const { checked, onChangeFn, context } = props;
  const classes = useStylesSwitch();
  return (
    <Switch
      classes={{
        thumb: classes.thumb,
        switchBase: classes.switchBase,
        track: classes.track,
      }}
      {...props}
      checked={checked}
      onChange={() => onChangeFn({ context, isSelected: checked })}
      size="medium"
    />
  );
};

export const getSwitch = (props) => {
  return <StyledSwitch {...props} />;
};