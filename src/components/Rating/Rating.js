import React from "react";
import Rating from "@material-ui/lab/Rating";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledRating = withStyles({
  iconFilled: {
    color: "#95CFC9",
    fontSize: "1.2rem"
  },
  iconEmpty: {
    color: "#e8e8e8",
    fontSize: "1.2rem"
  },
})(Rating);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  }
}));

export default function RatingStar({ value }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StyledRating value={value} precision={0.1} readOnly />
    </div>
  );
}
