const { screens } = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx}", "./public/index.html"],
  darkMode: false,
  theme: {
    extend: {
      heights: {
        200: "200px",
      },
      screens: {
        xs: "470px",
        ...screens,
      },
      letterSpacing: {
        "wide-x": "0.15em",
      },
      borderWidth: {
        DEFAULT: "1px",
        0: "0",
        0.5: "0.5px",
        2: "2px",
        3: "3px",
        4: "4px",
        6: "6px",
        8: "8px",
      },
      fontSize: {
        xxs: "0.65rem",
      },
      fontFamily: {
        jost: ["Jost", "sans-serif"],
      },
      transitionProperty: {
        visibility: "visibility",
      },
      lineHeight: {
        11: "3rem",
        12: "4rem",
      },
      backgroundImage: {
        "aqua-gradient":
          "linear-gradient(120deg,#b9dcd8 20%,hsla(0, 0%, 100%, 0) 60%), linear-gradient(90deg, hsla(0, 0%, 100%, 0) 60%, #b2cac7 120%)",
      },
      colors: {
        purple: {
          DEFAULT: "#ba93f5",
          dark: "#6b46e5",
          slate: "#32325d",
          washed: "#d2b9f8",
          light: "#faf7ff",
        },
        "score-green": "#77c990",
        "score-red": "#d4665b",
        "light-purple-gradient": "#A770EF",
        "dark-purple-gradient": "#CF8BF3",
        "lilac-10": "#d8f3f1",
        "lilac-50": "#E4FAF7",
        "lilac-70": "#d5f4f0",
        "lilac-100": "#BEECE6",
        "lilac-200": "#ABDAD5",
        "lilac-300": "#95CFC9",
        "lilac-400": "#83C4BD",
        "lilac-500": "#73B8B2",
        "lilac-600": "#60ACA6",
        "lilac-700": "#509B95",
        aqua: "#e6f5f3",
        "aqua-dark": "#36615b",
        "slate-gray": "#231f20",
        "slate-gray-light": "#2f2f2f",
        "slate-teal": "#3a5956",
        "dark-teal": "#195558",
        "light-purple": "#e6d9f8",
        "light-gray": "#f5f5f5",
        stone: "#fafafa",
        darkStone: "#f4f2f0",
        navItem: "#1c1c1f",
        moonlitDark: "#0F2027",
        moonlitMedium: "#203A43",
        moonlitLight: "#5d90a6",
      },
      gridTemplateColumns: {
        // Repeat with a min-width of 200px
        100: "repeat(auto-fill, minmax(100px, 1fr))",
        200: "repeat(auto-fill, minmax(200px, 1fr))",
        250: "repeat(auto-fill, minmax(250px, 1fr))",
        350: "repeat(auto-fill, minmax(350px, 1fr))",
        101: "repeat(auto-fill, minmax(100px, 101px))",
      },
      spacing: {
        full: "100%",
      },
    },
    flex: {
      auto: "1 1 0",
      2: "2 1 0",
      50: "0 1 40%",
      30: "0 1 30%",
      25: "0 1 20%",
      20: "0 1 18%",
    },
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": ["3.75rem", "1.1"],
      "7xl": "5rem",
      "8xl": "6rem",
      "9xl": "8rem",
    },
  },
  variants: {
    extend: { opacity: ["disabled"] },
  },
};
