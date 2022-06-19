import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

const useStylesStar = makeStyles(() => ({
  arrow: {
    color: "#E4FAF7",
  },
  tooltip: {
    backgroundColor: "#E4FAF7",
    color: "#509B95",
    fontSize: 12,
    borderRadius: "5px",
    zIndex: "0",
  },
}));

const StarTooltip = (props) => {
  const classes = useStylesStar();
  return <Tooltip arrow classes={classes} {...props} />;
};

const getTooltipTitle = (value) => {
  return (
    <div class="flex">
      {value}
      <span class="ml-1">&#9733;</span>
    </div>
  );
};

export const ValueLabelComponent = (props) => {
  const { children, open, value } = props;
  return (
    <StarTooltip
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={getTooltipTitle(value)}
      disableFocusListener={true}
    >
      {children}
    </StarTooltip>
  );
};
