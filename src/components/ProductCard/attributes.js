export const ATTRIBUTES = {
  absorb: "Absorption",
  scent: "Scent",
  irritate: "Irritation",
  moisturise: "Moisturising",
  breakout: "Breakouts",
  oiliness: "Oiliness",
  pigment: "Pigmentation",
  aging: "Aging",
  dryness: "Dryness",
  "oily skin": "Oily Skin",
  "sensitive skin": "Sensitive Skin",
  "dry skin": "Dry Skin",
  "combination skin": "Combination Skin",
};

export const ATTRIBUTE_LABELS_POSITIVE = {
  ...ATTRIBUTES,
  absorb: "Absorbs well",
  scent: "Smells pleasant",
  irritate: "Gentle",
  moisturise: "Moisturises well",
  breakout: "Helps with breakouts",
};

export const ATTRIBUTE_LABELS_NEGATIVE = {
  ...ATTRIBUTES,
  absorb: "Absorbs poorly",
  scent: "Smells unpleasant",
  irritate: "Irritating",
  moisturise: "Moisturises poorly",
  breakout: "Causes breakouts",
};

export const SKIN_TYPE_ATTRIBUTES = {
  Oily: "oily skin",
  Dry: "dry skin",
  Combination: "combination skin",
  Sensitive: "sensitive skin",
};

export const SKIN_CONCERN_ATTRIBUTES = {
  Breakout: "breakout",
  Pigmentation: "pigment",
  Aging: "aging",
  Dryness: "dryness",
  Oiliness: "oiliness",
};
