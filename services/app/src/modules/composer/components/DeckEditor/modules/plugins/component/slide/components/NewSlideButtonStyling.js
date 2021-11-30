import Colors from "../../../../../../../../../Colors";

/**
 * Styling to be included in {@link DeckEditorStyles}.
 *
 * @type {{last: {"& .new-slide-container": {"& .new-slide-button": {opacity: number}}}, main: {"& .new-slide-container.scaling .new-slide-button, .new-slide-container.scaling .new-slide-message": {color: string, position: string, opacity: string}, "& .new-slide-container.scaling .new-slide-message": {transform: string, transition: string}, "& .new-slide-container .new-slide-button": {opacity: number}, "& .new-slide-container .new-slide-message": {transform: string, left: number, position: string, opacity: number}}}}
 */
export const NewSlideButtonStyling = {
  main: (theme) => ({
    "&:not(.selected) .new-slide-container": {
      position: "absolute",
      opacity: 1,
      left: -300,
    },
    "& .new-slide-container:not(.scaling)": {
      position: "absolute",
      opacity: 0,
      left: -150,
      "& .new-slide-button": {
        opacity: 0.1,
      },
      "& .new-slide-message": {
        position: "absolute",
        left: -100,
        transform: "translate(-30%)",
        opacity: 0,
      }
    },

    "&.selected .new-slide-container.scaling": {
      // 01 Scaling limit reached - Urgent suggestion
      "&.scaling .new-slide-label": {
        display: "none"
      },
      "&.max": {
        "& .new-slide-label": {
          display: 'none',
        },
        "& .new-slide-button": {
          background: `${Colors.primary(0.2)} !important`,
          border: `1px solid ${Colors.primary(0.1)}`,
          opacity: "1 !important",
          color: `${Colors.primary(1)}`,
        },
        "& .new-slide-message": {
          color: `${Colors.primary(1)} !important`,
          opacity: "1 !important",
        },
        "& .new-slide-group:hover": {
          "& .new-slide-button": {
            opacity: theme.dark() ? "1 !important" : "1 !important", // 0.2 1
            border: `1px solid ${Colors.primary(0.1)}`,
            background: `${Colors.primary(1)} !important`,
            color: "#ffffff !important",
            transform: "scale(0.75)",
            transition: "transform 300ms ease",
          },
          "& .new-slide-message": {
            opacity: theme.dark() ? "1 !important" : "1 !important", // 0.2 1
            color: theme.palette.text.primary,
            transition: "transform 300ms ease",
          },
        },
      },
      // 02 Slide content scaling - subtle suggestion
      "&:not(.max)": {
        "& .new-slide-button": {
          opacity: "1 !important",
          border: theme.dark() ? `1px solid ${theme.palette.background.border02}` : `1px solid ${theme.palette.background.elev00}`,
          background: theme.dark() ? `linear-gradient(top, ${theme.palette.button.selected} 25%, ${theme.palette.button.selected02} 100%)` : `${theme.palette.button.selected02}`,
          boxShadow: theme.dark() ? "0px 1px 1px 0px rgb(0 0 0 / 8%), 0px 2px 3px 0px rgb(0 0 0 / 8%), inset 0px 1px 0px rgb(255 255 255 / 10%)" : "rgb(50 50 93 / 25%) 0px 1px 3px 1px",
          color: theme.dark() ? `${theme.palette.background.border01}` : `${theme.palette.button.selected03}`,
          // +
          '& span': {
            transition: "transform 300ms ease",
            transform: 'scale(1.1)',
          },
        },
        "& .new-slide-group:hover": {
          "& .new-slide-button": {
            opacity: theme.dark() ? "1 !important" : "1 !important",
            transform: "scale(0.75)",
            transition: "transform 300ms ease",
            border: theme.dark() ? `1px solid ${theme.palette.background.border02}` : `1px solid ${theme.palette.background.elev00}`,
            background: theme.dark() ? `linear-gradient(top, ${theme.palette.button.selected} 25%, ${theme.palette.button.selected02} 100%)` : `${theme.palette.button.selected02}`,
            boxShadow: theme.dark() ? "0px 1px 1px 0px rgb(0 0 0 / 8%), 0px 2px 3px 0px rgb(0 0 0 / 8%), inset 0px 1px 0px rgb(255 255 255 / 10%)" : "rgb(50 50 93 / 25%) 0px 1px 3px 1px",
            // +
            '& span': {
              transition: "transform 300ms ease",
              transform: 'scale(1.2)',
            },
            // lighten bg on btn:hover
            '&:hover': {
              transition: "all 150ms ease",
              border: theme.dark() ? `1px solid ${theme.palette.background.border02}` : `1px solid ${theme.palette.background.elev00}`,
              background: theme.dark() ? `linear-gradient(top, ${theme.palette.button.selected03} 25%, ${theme.palette.button.selected03} 100%)` : `${theme.palette.button.selected02}`,
            },
            // push down on active
            '&:active': {
              transition: "transform 125ms ease",
              transform: 'scale(0.6)',
            },
          },
          "& .new-slide-message": {
            opacity: theme.dark() ? "1 !important" : "1 !important",
            color: theme.palette.text.primary,
            transition: "transform 300ms ease",
          },
        },
      },
      "& .new-slide-button, .new-slide-message": {
        position: "static",
        opacity: "0.5 !important",
      },
      "& .new-slide-message": {
        transform: "translate(10%)",
        transition: "transform 1000ms ease, opacity 500ms ease"
      },
    },
  }),
  last: (theme) => ({
    // 03 End of Deck prompt
    "& .new-slide-container:not(.scaling)": {
      position: "static",
      opacity: 1,
      "& .new-slide-button": {
        opacity: "1 !important",
        border: theme.dark() ? `1px solid ${theme.palette.background.border02}` : `1px solid ${theme.palette.background.elev00}`,
        background: theme.dark() ? `linear-gradient(top, ${theme.palette.button.selected} 25%, ${theme.palette.button.selected02} 100%)` : `${theme.palette.button.selected02}`,
        boxShadow: theme.dark() ? "0px 1px 1px 0px rgb(0 0 0 / 8%), 0px 2px 3px 0px rgb(0 0 0 / 8%), inset 0px 1px 0px rgb(255 255 255 / 10%)" : "rgb(50 50 93 / 25%) 0px 1px 3px 1px",
        color: theme.dark() ? `${theme.palette.background.border01}` : `${theme.palette.button.selected03}`,
        // +
        '& span': {
          transition: "transform 300ms ease",
          transform: 'scale(1.1)',
        },
      },
      "& .new-slide-label": {
        opacity: theme.dark() ? "0.8 !important" : "0.6 !important",
        marginLeft: 5,
        marginRight: -4,
      },
      "& .new-slide-group:hover": {
        "& .new-slide-button": {
          opacity: theme.dark() ? "1 !important" : "1 !important",
          transform: "scale(0.7)", // 0.75
          transition: "all 300ms ease",
          border: theme.dark() ? `1px solid ${theme.palette.background.border02}` : `1px solid ${theme.palette.background.elev00}`,
          background: theme.dark() ? `linear-gradient(top, ${theme.palette.button.selected} 25%, ${theme.palette.button.selected02} 100%)` : `${theme.palette.button.selected02}`,
          boxShadow: theme.dark() ? "0px 1px 1px 0px rgb(0 0 0 / 8%), 0px 2px 3px 0px rgb(0 0 0 / 8%), inset 0px 1px 0px rgb(255 255 255 / 10%)" : "rgb(50 50 93 / 25%) 0px 1px 3px 1px",
          // +
          '& span': {
            transition: "transform 300ms ease",
            transform: 'scale(1.2)',
          },
          // lighten bg on btn:hover
          '&:hover': {
            transition: "all 150ms ease",
            border: theme.dark() ? `1px solid ${theme.palette.background.border02}` : `1px solid ${theme.palette.background.elev00}`,
            background: theme.dark() ? `linear-gradient(top, ${theme.palette.button.selected03} 25%, ${theme.palette.button.selected03} 100%)` : `${theme.palette.button.selected02}`,
          },
          // push down on active
          '&:active': {
            transition: "transform 125ms ease",
            transform: 'scale(0.6)',
          },
        },
        "& .new-slide-label": {
          opacity: theme.dark() ? "1 !important" : "0.6 !important",
          transition: "transform 300ms ease",
        },

      },
    }
  })
};
