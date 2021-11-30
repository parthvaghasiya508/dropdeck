import Colors from "./Colors";

const AppThemeUtils = (theme) => ({
  background: {
    // Darker type of background
    top: {
      // Flat color
      normal: {
        background: theme.palette.background.default
      },
      // With a light gradient
      gradient: {
        background: theme.dark() ? Colors.light.base.low : Colors.dark.base.low,
        backgroundImage: `linear-gradient(310deg, ${theme.dark() ? Colors.light.base.medium : Colors.dark.base.low} 3%, ${theme.dark() ? Colors.light.base.low : Colors.dark.base.medium} 100%)`,
      }
    },
    // Lighter type of background
    base: {
      // Flat color
      normal: {
        background: theme.palette.background.main
      },
      // With a light gradient
      gradient: {
        background: theme.palette.background.main,
        backgroundImage: `linear-gradient(310deg, ${theme.dark() ? Colors.dark.base.medium : Colors.light.base.low} 3%, ${theme.dark() ? Colors.dark.base.low : Colors.light.base.medium} 100%)`,
      }
    },
  },
  shadows: {
    topCenter: {
      boxShadow: `${theme.dark() ? Colors.dark.base.top : Colors.secondary(0.2)} 0px 6px 13px -8px, rgba(0, 0, 0, 0.2) 0px 4px 8px -8px, rgba(0, 0, 0, 0.02) 0px -3px 8px -6px`,
    }
  }
});
export default AppThemeUtils;
