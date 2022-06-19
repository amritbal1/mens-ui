import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiStepIcon-root.Mui-active": { color: "#60ACA6" },
    "& .MuiStepIcon-root.Mui-completed": { color: "#60ACA6" },
    "& .Mui-disabled .MuiStepIcon-root": { color: "#BEECE6" },
    "& .MuiStepLabel-alternativeLabel": {
      color: "#2f3033",
      fontWeight: 300,
      fontSize: "0.875rem",
    },
    "& .MuiStepLabel-label.Mui-active": {
      color: "#2f3033",
      fontWeight: 400,
      fontSize: "0.875rem",
    },
  },
}));

const Wizard = ({ steps, activeStep }) => {
  const classes = useStyles();
  return (
    <Box>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        className={classes.root}
      >
        {steps.map((step) => {
          const { label, onClick, cursorHover } = step;
          return (
            <Step key={label} onClick={onClick}>
              <StepLabel
                style={{ cursor: cursorHover ? "pointer" : "default" }}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default Wizard;
