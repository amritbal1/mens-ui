const isMobile = window.screen.width <= 640;

export const getGaugeChartOptions = ({ config }) => {
  return {
    chart: {
      type: "solidgauge",
      height: "90%",
      backgroundColor: "transparent",
      margin: [10, 0, 20, 0],
    },
    tooltip: { enabled: false },
    credits: {
      enabled: false,
    },
    title: null,
    pane: {
      size: "100%",
      center: ["50%", "50%"],
      startAngle: 0,
      endAngle: 360,
      background: {
        borderWidth: 1,
        backgroundColor: "#DBDBDB",
        shape: "arc",
        borderColor: "#DBDBDB",
        outerRadius: "97%",
        innerRadius: "98%",
      },
    },

    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      minorTickLength: 0,
      minTickInterval: 500,
      labels: {
        enabled: false,
      },
      tickPositions: [],
    },

    plotOptions: {
      solidgauge: {
        borderColor: config.solidGaugeBorderColor,
        borderWidth: 1,
        radius: 99,
        innerRadius: "97%",
        dataLabels: {
          borderWidth: 0,
          useHTML: true,
          y: isMobile ? -35 : -23,
        },
      },
    },
    series: config.series,
  };
};
