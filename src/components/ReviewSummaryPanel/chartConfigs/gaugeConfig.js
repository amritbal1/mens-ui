import { BASE_FONT } from "../../../utils/constants";

const topValue = window.screen.width <= 640 ? "17px" : "-8px";
const paddingTopValue = window.screen.width <= 640 ? "0px" : "0.8rem";

export const getGaugeConfig = ({ chartValue, label = "" }) => {
  const roundedChartValue = Math.round(chartValue);
  return {
    solidGaugeBorderColor: "#95CFC9",
    series: [
      {
        type: "solidgauge",
        data: [{ y: roundedChartValue, color: "#95CFC9" }],
        dataLabels: {
          enabled: true,
          align: "center",
          useHTML: true,
          format:
            "<div>" +
            `<div style="text-align:left;font-family:${BASE_FONT};font-weight:300;width:60px;display:flex;justify-content:center;align-items:center;flex-direction:column;position:absolute;top:${topValue};left:-30px;padding-top:${paddingTopValue}">` +
            "<div>" +
            '<span style="font-size:1.3rem;color:#2f3033;font-weight:300">{y}%</span>' +
            "</div>" +
            "</div>" +
            `<div style="display:flex;justify-content:center;">` +
            `<div style="font-size:0.875rem;padding-top:5px;position:absolute;top:57px;text-align:center;font-weight:300;color:#2f3033;font-family:${BASE_FONT};letter-spacing:-0.025em;">${label}</div>` +
            "</div>" +
            "</div>",
        },
      },
    ],
  };
};
