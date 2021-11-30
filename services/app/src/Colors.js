const Colors = {
  primary: (alpha = 1) => `rgba(243, 17, 56, ${alpha})`,
  secondary: (alpha = 1) => `rgba(0, 93, 166, ${alpha})`,
  tertiary: "#999999",
  green: (alpha = 1) => `rgba(23, 128, 18, ${alpha})`,
  dark: {
    base: {
      top: "#000",
      medium: "#262628",
      low: "#323234"
    }
  },
  light: {
    base: {
      top: "#FFFFFF", // seems unused
      medium: "#D1D5DB", // seems unused
      low: "#EDEDEF" // page background light grey
    }
  },
};
export default Colors;
