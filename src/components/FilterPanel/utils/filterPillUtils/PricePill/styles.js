import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";
import { MAX_PRICE_FILTER } from "../../../../../utils/enums";

const useStylesTooltip = makeStyles(() => ({
  arrow: {
    color: "#BEECE6",
  },
  tooltip: {
    backgroundColor: "#BEECE6",
    color: "#83C4BD",
    fontSize: 11,
    borderRadius: "5px",
  },
}));

const StyledTooltip = (props) => {
  const classes = useStylesTooltip();
  return <Tooltip arrow classes={classes} {...props} />;
};

const getTooltipTitle = (value) => {
  return (
    <div class="flex text-sm">
      {value === MAX_PRICE_FILTER ? `£50 +` : `£${value}`}
    </div>
  );
};

export const ValueLabelComponent = (props) => {
  const { children, open, value } = props;
  return (
    <StyledTooltip
      open={open}
      enterTouchDelay={0}
      placement="top"
      title={getTooltipTitle(value)}
    >
      {children}
    </StyledTooltip>
  );
};
