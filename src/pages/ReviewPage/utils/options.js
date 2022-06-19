export const wouldRepurchaseOptions = [
  { displayValue: "", value: "wouldRepurchaseValue" },
];

export const getWizardLabels = ({ handleClick, screenNumberToRender }) => {
  return [
    {
      label: "Product Overview",
      onClick: () => {
        handleClick({ screenNumberToRender: 1 });
      },
      cursorHover: true,
    },
    {
      label: "Skin Details",
      onClick: () => {
        screenNumberToRender > 1 && handleClick({ screenNumberToRender: 2 });
      },
      cursorHover: screenNumberToRender > 1,
    },
    {
      label: "Text and Photos",
      onClick: () => {
        screenNumberToRender > 2 && handleClick({ screenNumberToRender: 3 });
      },
      cursorHover: screenNumberToRender > 2,
    },
  ];
};
