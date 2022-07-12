export const CONTEXT = {
  RESULTS: "ResultsContext",
  REVIEWS_LIST: "ReviewsListContext",
};

export const PILL_TYPE = {
  POSITIVE: "Positive",
  NEGATIVE: "Negative",
};

export const FILTER_PILL_NAME = {
  RATING: "Rating",
  WITH_IMAGES: "With Images",
  SKIN_CONCERNS: "Skin Concerns",
  SKIN_TYPES: "Skin Types",
  BRANDS: "Brands",
  PRODUCT_CHARACTERISTICS: "Product Characteristics",
  PRICE: "Price",
  PRODUCT_CATEGORIES: "Product Category",
};

export const SKIN_CONCERNS = {
  ACNE: "Acne, Blemishes",
  PIGMENTATION: "Pigment",
  BLACKHEADS: "Blackheads",
  FINE_LINES: "Fine Lines & Wrinkles",
  REDNESS: "Redness",
  PORES: "Pores",
};

export const SKIN_TYPES = {
  NORMAL: "Normal",
  OILY: "Oily",
  DRY: "Dry",
  SENSITIVE: "Sensitive",
  COMBINATION: "Combination",
};

export const CRITERIA = {
  SKIN_TYPES: "Skin Types",
  SKIN_CONCERNS: "Skin Concerns",
  PRODUCT_CHARACTERISTICS: "Product Characteristics",
};

export const SEARCH_BAR_OPTIONS = {
  BRAND: "Brand",
  PRODUCT: "Product",
  CATEGORY: "Category",
};

export const QUESTIONNAIRE_OPTIONS = {
  YES: "Yes",
  NO: "No",
};

export const QUESTIONNAIRE_RESPONSE_VALUES = {
  Yes: "Y",
  No: "N",
};

export const QUESTIONNAIRE_BOOLEAN_RESPONSE_VALUES = {
  Yes: true,
  No: false,
};

export const SCREEN = {
  SIGN_UP: "Sign up",
  LOGIN: "Login",
};

export const SPEED_OF_RESULTS_UNIT_DISPLAY = {
  DAY: "Day",
  WEEK: "Week",
  MONTH: "Month",
};

export const SPEED_OF_RESULTS_UNIT = {
  DAY: "Day",
  WEEK: "Week",
  MONTH: "Month",
};

export const SORTING_FIELD = {
  MOST_RECENT: "Most Recent",
  HIGHEST_STAR_RATING: "Highest Star Rating",
  LOWEST_STAR_RATING: "Lowest Star Rating",
  HIGHEST_PRICE: "Highest Price",
  LOWEST_PRICE: "Lowest Price",
  RECOMMENDED: "Recommended",
};

export const SORTING_FIELD_BOOLEAN = {
  MOST_RECENT: "reviewDate",
  STAR_RATING: "starRating",
  PRICE: "price",
  RECOMMENDED: "recommendationScore",
};

export const ETHNICITY_OPTIONS = {
  UNIDENTIFIED: "Decline to self identify",
  WHITE: "White",
  SOUTH_ASIAN: "Asian (Indian subcontinent)",
  EAST_ASIAN: "Asian (Far East Asia)",
  BLACK: "Black or African American",
  HISPANIC: "Hispanic or Latino",
  POLYNESIAN: "Polynesian",
  MULTIPLE: "Two or more races",
};

export const ETHNICITY_VALUES = {
  "Decline to self identify": "unidentified",
  White: "white",
  "Asian (Indian subcontinent)": "southAsian",
  "Asian (Far East Asia)": "eastAsian",
  "Black or African American": "black",
  "Hispanic or Latino": "hispanic",
  Polynesian: "polynesian",
  "Two or more races": "multipleRaces",
};

export const ETHNICITY_OPTION_OBJECTS = {
  unidentified: { label: "Decline to self identify", value: "unidentified" },
  white: { label: "White", value: "white" },
  southAsian: { label: "Asian (Indian subcontinent)", value: "southAsian" },
  eastAsian: { label: "Asian (Far East Asia)", value: "eastAsian" },
  black: { label: "Black", value: "black" },
  hispanic: { label: "Hispanic or Latino", value: "hispanic" },
  polynesian: { label: "Polynesian", value: "polynesian" },
  multiple: { label: "Two or more races", value: "multipleRaces" },
};

export const PAGE_SIZE = {
  REVIEWS_LIST: 10,
  PRODUCT_RESULTS: 50,
};

export const MAX_PRICE_FILTER = 50;

export const LOCAL_STORAGE_ITEM = {
  USER_ID: "userId",
  USER_PROFILE_INFORMATION: "userProfileInformation",
  IS_USER_LOGGED_IN: "isUserLoggedIn",
  IS_USER_SIGNED_UP: "isUserSignedUp",
};

export const AGE_GROUP_CODE = {
  "Under 18": 1,
  "18-24": 2,
  "25-29": 3,
  "30-40": 4,
  "40+": 5,
};

export const AGE_GROUP = {
  1: "Under 18",
  2: "18-24",
  3: "25-29",
  4: "30-40",
  5: "40+",
};
