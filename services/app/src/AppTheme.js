import { useMemo } from "react";
import { createMuiTheme } from '@material-ui/core/styles';
import { useMediaQuery } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import Colors from "./Colors";
import breakpoints from './Breakpoints';

export const AppTheme = (lightingMode) => {

  const typography = {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.8rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.4rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.1rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 500,
    },
  };

  const themeName = 'Default';

  const props = {
    MuiButtonBase: {
      disableRipple: true,
    }
  };

  // const prefersDarkMode = true;
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const modePreference = () => {
    switch (lightingMode) {
      case "dark":
        return true;
      case "light":
        return false;
      default:
        return prefersDarkMode;
    }
  };

  return useMemo(() => createMuiTheme({
    palette: {
      type: modePreference() ? 'dark' : 'light',

      // Links and Buttons
      primary: {
        main: Colors.primary(),
        contrastText: modePreference() ? '#292931' : '#fff', // 292931 / fff
      },
      secondary: {
        main: blue[600],
        contrastText: modePreference() ? Colors.dark.base.medium : Colors.light.base.top
      },
      tertiary: {
        main: Colors.tertiary,
        contrastText: '#ffffff',
      },
      events: {
        warn: "#ff7800",
        drop: "#09cc39",
      },

      // Text
      text: {
        primary: modePreference() ? '#d4d4d6' : '#323234',
        secondary: modePreference() ? '#7a7a7c' : '#9CA3AF',
        selected: modePreference() ? '#FFFFFF' : '#323234',
        selectedbg: modePreference() ? '#4a4a4c' : '#e1f4ff',
      },

      // Button
      button: {
        disabled: modePreference() ? '#262628' : '#F9F9FA',
        selected: modePreference() ? '#4a4a4c' : '#e8eaed',
        selected02: modePreference() ? '#474749' : '#ffffff',
        selected03: modePreference() ? '#575759' : '#9CA3AF',
      },

      // Icons
      icon: {
        primary: modePreference() ? '#7a7a7c' : '#9CA3AF',
        primaryHover: modePreference() ? '#FFFFFF' : '#9CA3AF',
        primaryHoverBg: modePreference() ? '#323234' : '#e2e2e4',
        primaryInset: modePreference() ? '#1D1D1F' : '#e2e2e4', // Editor toolbar selected btn
        secondaryHoverBg: modePreference() ? '#1e1e20' : '#e2e2e4',
      },

      // Inputs
      input: {
        primaryBG: modePreference() ? '#262628' : '#FFFFFF', // Deck Rename active bg
        secondary: modePreference() ? '#FFFFFF' : '#262628', // Image Search
      },

      // Gradient Stops
      gradient: {
        stop00: modePreference() ? '#1D1D1Fbb' : '#eaeaec', //
        stop01: modePreference() ? '#262628' : '#F7FAFC', //
        stop02: modePreference() ? '#323234' : '#FFFFFF', //
        stop03: modePreference() ? '#ffffff' : '#323234', //
        stop04: modePreference() ? '#262628' : '#FFFFFF', //
      },

      label: {
        dark: modePreference() ? '#262628' : '#d3d3d6', //
        light: modePreference() ? '#2e2e30' : '#eaeaec', //
      },

      // Panel Backgrounds + Borders
      background: {
        // BGs
        main: modePreference() ? Colors.dark.base.low : Colors.light.base.low,
        default: modePreference() ? '#262628' : '#fff', // page bg
        elev00: modePreference() ? '#1D1D1F' : '#FFFFFF', // Directory Top Bar, Cards BG, Editor Toolbar Borders
        elev01: modePreference() ? '#262628' : '#FFFFFF', // Editor Toolbar BG
        elev02: modePreference() ? '#28282a' : '#eaeaec', // Deck Options BG
        elev03: modePreference() ? '#1D1D1F' : '#e2e2e4', // Slide Panel Drawer BG
        elev04: modePreference() ? '#3C3C3E' : '#fbfbfb', // editor drag hover BG
        paper: modePreference() ? '#262628' : '#ffffff', // page bg
        portfolio: modePreference() ? '#212224' : '#ededef', // portfolio bg
        panel01: modePreference() ? '#2e2e30' : '#f9f9fa', // brand panel
        panel02: modePreference() ? '#1e1e20' : '#dee3e8', // brand panel
        
        // Borders
        border00: modePreference() ? '#1D1D1F99' : '#DEE3EA', // Editor Toolbar
        border01: modePreference() ? '#1D1D1F' : '#DEE3EA', // Editor Toolbar Bottom
        border02: modePreference() ? '#262628' : '#F7FAFC', // Rename
        border03: modePreference() ? '#323234' : '#FFFFFF99', // Side Panel A
        border04: modePreference() ? '#1D1D1F' : '#dee3e9', // Side Panel B d1d5db
        border05: modePreference() ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)', // Dividers in menus

        chessboard: {
          background: modePreference() ? '#00000016' : '#00000008',
          square: modePreference() ? '#00000020' : '#00000015',
        },
      },

      // Popovers
      popover: {
        label: modePreference() ? '#DEE3EA' : '#323234',
        border: modePreference() ? '#1D1D1F' : '#eaeaec',
        chevron: modePreference() ? '#323234' : '#ffffff',
        chevronAlt: modePreference() ? '#1D1D1F' : '#dee3e9', // editor component popover
        select: modePreference() ? '#323234' : '#dee3e9',
      },

      // -----------

    },
    typography,
    spacing: 8,
    themeName,
    breakpoints,
    props,
    overrides: {
      MuiButton: {
        label: {
          fontFamily: '"Inter Var", "Helvetica", "Arial", sans-serif',
          textTransform: 'none',
        },
        containedPrimary: {
          color: '#FFFFFF'
        }
      },
      MuiTooltip: {
        tooltip: {
          top: 6,
          backgroundColor: '#1D1D1F',
        },
        arrow: {
          "&::before": {
            backgroundColor: '#1D1D1F',
          }
        }
      }
    },
    dark: () => modePreference()
  }), [prefersDarkMode, lightingMode]);

};

export default AppTheme;
