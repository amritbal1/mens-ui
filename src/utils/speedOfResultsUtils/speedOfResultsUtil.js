import { SPEED_OF_RESULTS_UNIT, SPEED_OF_RESULTS_UNIT_DISPLAY } from "../enums";

export const getValueInDays = ({ value, unit }) => {
  if (unit === SPEED_OF_RESULTS_UNIT.DAY) return value;
  else if (unit === SPEED_OF_RESULTS_UNIT.WEEK) return value * 7;
  else if (unit === SPEED_OF_RESULTS_UNIT.MONTH) return value * 30;
};

export const getValueFromDays = ({ valueInDays }) => {
  if (valueInDays === null) return null;
  if (valueInDays <= 7)
    return {
      value: valueInDays,
      unit: getUnit({
        value: valueInDays,
        unit: SPEED_OF_RESULTS_UNIT_DISPLAY.DAY,
      }),
    };
  else if (valueInDays > 7 && valueInDays <= 30) {
    const valueInWeeks = Math.round(valueInDays / 7.0);
    return {
      value: valueInWeeks,
      unit: getUnit({
        value: valueInWeeks,
        unit: SPEED_OF_RESULTS_UNIT_DISPLAY.WEEK,
      }),
    };
  } else if (valueInDays > 30) {
    const valueInMonths = Math.round(valueInDays / 30.0);
    return {
      value: valueInMonths,
      unit: getUnit({
        value: valueInMonths,
        unit: SPEED_OF_RESULTS_UNIT_DISPLAY.MONTH,
      }),
    };
  }
};

const getUnit = ({ value, unit }) => {
  return value === 1 ? unit : `${unit}s`;
};
