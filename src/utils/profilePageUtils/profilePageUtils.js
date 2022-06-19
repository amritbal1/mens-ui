import { ETHNICITY_OPTIONS, ETHNICITY_VALUES } from "../enums";

export const getEthnicityOptions = () => {
  return Object.values(ETHNICITY_OPTIONS).map((ethnicityOption) => {
    return { value: ETHNICITY_VALUES[ethnicityOption], label: ethnicityOption };
  });
};

export const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

export const ageGroupOptions = [
  { value: "Under 18", label: "Under 18" },
  { value: "18-24", label: "18-24" },
  { value: "25-29", label: "25-29" },
  { value: "30-40", label: "30-40" },
  { value: "40+", label: "40+" },
];

export const skinTypeOptions = [
  { value: "Normal", label: "Normal" },
  { value: "Oily", label: "Oily" },
  { value: "Dry", label: "Dry" },
  { value: "Sensitive", label: "Sensitive" },
  { value: "Combination", label: "Combination" },
  { value: "Mature", label: "Mature" },
];
