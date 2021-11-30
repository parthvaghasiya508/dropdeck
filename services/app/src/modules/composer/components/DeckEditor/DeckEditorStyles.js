import { makeStyles } from '@material-ui/styles';
import chroma from "chroma-js";
import { NewSlideButtonStyling } from "./modules/plugins/component/slide/components/NewSlideButtonStyling";
import './DeckEditor.scss';

export const DeckEditorStyles = () => makeStyles((theme) => ({

  root: {
    minHeight: '94vh',
    padding: theme.spacing(0),
    '& :focus': {
      outline: 'none',
    },
    '& ::selection': {
      color: theme.palette.text.selected,
      backgroundColor: theme.palette.text.selectedbg,
      textShadow: 'none',
    },
    '& [data-pseudo-content]::before': {
      content: 'attr(data-pseudo-content)',
    }
  },

  paper: {
    // Counter for showing slide numbers.
    counterReset: "slideCounter",
    // editorSlide wraps every slide
    // editorElement contains an individual element + options popover
    // elementOptions may be empty of contain an icon which launches popover
    // elementContent contains the markup for the element
    borderRadius: 0,
    minHeight: '93vh',
    width: '100%',
    fontSize: '0.95em',
    background: theme.dark() ? theme.palette.background.main : `linear-gradient(90deg, ${theme.palette.background.elev02} -45%, #FFFFFF 50%)`,
    color: theme.palette.text.primary,
    "& .topFade": {
      position: "absolute",
      zIndex: 1,
      height: 20,
      background: theme.dark() ? theme.palette.background.main : `linear-gradient(90deg, ${theme.palette.background.elev02} -45%, #FFFFFF 50%)`,
      top: '0',
      left: '-1em',
      right: '0',
    },
    "& .bottomFade": {
      position: "sticky",
      zIndex: 5,
      bottom: '1.5vh',
      width: "105%",
      marginLeft: '-5%',
      background: theme.dark() ? `linear-gradient(0deg, ${theme.palette.background.main} 60%, ${theme.palette.background.main}00 100%), linear-gradient(0deg, ${theme.palette.background.main} 40%, ${theme.palette.background.main}00 110%)` : 'url(../bottomfade.png)',
      backgroundSize: theme.dark() ? "unset" : "cover",
      height: "2em", // 1.5
      [theme.breakpoints.down('xs')]: {
        bottom: 0,
        left: 0,
        position: 'fixed',
      },
    },
    '& .editorInner': {
      margin: '0 auto 0 -16px',
      // maxWidth: '565px',
      userSelect: 'none',
      position: 'relative',
      [theme.breakpoints.down('xs')]: {
        top: 104,
        margin: '8px auto 0 -2px',
        paddingBottom: '2.5em',
      }
    },

    '& .editorSlide': {
      counterIncrement: 'slideCounter',
      position: 'relative',
      '&:first-of-type': {
        marginTop: '132px',
        [theme.breakpoints.down('xs')]: {
          marginTop: '0',
        },
      },
      transition: "margin-bottom 150ms ease-in",
      "&.magic-drawer-open .slide-area": {
        // Pushes elements down to make way for the magic drawer
        transition: "margin-bottom 150ms ease-out",
        marginBottom: 150
      },
      "& .slide-area": {
        position: "relative",
        marginLeft: 6,
        display: "flex",
        flexDirection: "row",
        background: theme.dark() ? `linear-gradient(90deg, #393939 0%, ${theme.palette.background.border03} 40%)` : '#ffffff',
        fontFeatureSettings: '"tnum"',
        borderRadius: 6,

        // Match up the two bottom and top drop lines
        "& .slide-edge": {
          "& .dropLine.bottom": {
            bottom: -9,
          },
          "& .dropLine.top": {
            top: -9,
          },
        },

        // Pulls up when drawer closes
        transition: "margin-bottom 100ms ease-in",
        "&.control-mode-full": {
          minHeight: 90,
        },

        "&:hover .slide-controls, &.show-controls": {
          // Hovering slide area should show controls!
          "&.control-mode-compact": {
            "& .slide-number": {
              display: "none"
            },
            "& .options": {
              // Options cog styled when hovering over slide
              display: "inline",
              position: "absolute",
              left: 0,
              zIndex: 2,
              "& button": {
                background: "transparent",
                // opacity: 0.8,
                // transition: "opacity 250ms ease-out",
                color: theme.dark() ? '#7a7a7a' : '#b6bcc5',
              },
              "& .notification.has-matches": {
                transitionDelay: 250,
                transition: "background-color 250ms ease-out",
                backgroundColor: theme.palette.primary.main
              },
            }
          },
          "& .control-actions-outer.control-mode-full": {
            opacity: 1,
            "& .control-actions-inner": {
              opacity: 0.7,
              transition: "opacity 250ms ease-out"
            }
          }
        },

        "& .slide-controls.control-mode-compact.compact-mode-open": {
          // In compact mode controls should stay if toggled open
          "& .slide-number": {
            display: "none"
          },
          "& .options": {
            // Options cog styled when hovering over slide
            display: "inline",
            // zIndex: 2,
            "& button": {
              transition: "opacity 250ms ease-out",
              color: theme.dark() ? '#7a7a7a' : '#b6bcc5',
              opacity: 0.9,
            }
          },
          "& .control-actions-outer": {
            opacity: 1,
            "& .control-actions-inner": {
              opacity: 0.9,
              transition: "opacity 250ms ease-out"
            }
          }
        },

        '& .slide-controls': {
          cursor: "grab",
          position: "relative",
          "&:hover .options button": {
            opacity: "1 !important",
          },
          "&:hover .control-actions-outer, &.active .control-actions-outer": {
            opacity: 1,
            "& .control-actions-inner": {
              opacity: "1 !important",
              transition: "opacity 150ms ease-out",
            }
          },
          "&:not(.active), &.control-mode-full": {
            "& .options": {
              // The options cog, not shown when we have enough space for the controls!
              // display: "none"
              left: -500
            }
          },
          '&.active.control-mode-compact.compact-mode-open .options button': {
            // Showing options cog when 1) slide is active and 2) compact mode open
            transition: "color 250ms ease-out, opacity 250ms ease-out",
            color: theme.palette.text.primary,
            opacity: 0.7
          },
          '&.active.control-mode-compact:not(.compact-mode-open) .notification.has-matches': {
            transition: "background-color 250ms ease-out",
            backgroundColor: theme.palette.primary.main
          },
          '&.active.control-mode-compact .slide-number, &.control-mode-compact.compact-mode-open .slide-number': {
            display: "none"
          },
          color: "#313131",
          background: theme.dark() ? "#2e2e2e" : "#e7eaed",
          borderRight: theme.dark() && `1px solid ${theme.palette.background.border02}`,
          borderTopLeftRadius: 6,
          borderBottomLeftRadius: 6,
          display: "flex",
          // flexDirection: "column",
          width: 40,
          transition: "width 100ms ease-in",

          "&.control-mode-compact": {
            "& .control-actions-outer": {
              transition: "opacity 150ms ease-in",
              opacity: 0
            },
            // Width of control actions when we have only one component on the slide and user hovers over controls
            "&.compact-mode-open": {
              transition: "width 250ms ease-out",
              width: 160,
              "& .control-actions-outer": {
                transition: "opacity 350ms ease-in",
                opacity: 1
              },
              "& .options": {
                display: "inline",
                left: 0,
                transition: "color 250ms ease-out",
                color: theme.dark() ? theme.palette.button.selected : "#b6bcc5",
                "& .notification.has-matches": {
                  // Hide notification if the compacted menu is open! Even if hovering.
                  transition: "background-color 250ms ease-out",
                  backgroundColor: "transparent !important"
                },
              }
            }
          },
          '& .slide-number': {
            position: "relative",
            width: "100%",
            display: "block",
            marginTop: 15,
            color: theme.dark() ? '#7a7a7a' : '#b6bcc5',
            transition: "color 250ms ease-out",
            '&.active': {
              transition: "color 250ms ease-out",
              color: theme.palette.text.primary
            },
            fontWeight: '600',
            fontSize: '12px',
            textAlign: 'center',
            userSelect: 'none',
            '&:before': {
              content: 'counter(slideCounter)',
            }
          },
          "& .options": {
            position: "absolute",
            display: "inline",
            "& button": {
              opacity: 0.8,
              color: theme.dark() ? theme.palette.button.selected : "#b6bcc5",
              "&:hover": {
                color: theme.palette.icon.primary,
              }
            },
            "& .notification": {
              position: "absolute",
              top: 4,
              right: 1,
              height: 4,
              width: 4,
              borderRadius: 2,
              transition: "background-color 250ms ease-out",
              backgroundColor: "transparent",
            },
            marginTop: 9,
            marginLeft: 6,
          },
          '& .control-actions-outer': {
            cursor: "pointer",
            right: 5,
            opacity: 0,
            position: "absolute",
            bottom: 0,
            paddingTop: 7,
            paddingBottom: 8,
            "&.control-mode-compact": {
              background: "none",
              top: 10,
              paddingTop: 0,
              "& .control-actions-inner": {
                flexDirection: "row",
                paddingBottom: 0,
                marginRight: 2
              }
            },
            background: theme.dark() ? "linear-gradient(180deg, rgba(46,46,46,0) 0%, rgba(46,46,46,1) 10%)" : "linear-gradient(180deg, rgba(231,234,237,0) 0%, rgba(231,234,237,1) 10%)",

            "& .control-actions-inner": {
              position: "relative",
              opacity: 0,
              transition: "opacity 250ms ease-in",
              background: theme.dark() ? "linear-gradient(180deg, rgba(46,46,46,0) 0%, rgba(46,46,46,1) 10%)" : "linear-gradient(180deg, rgba(231,234,237,0) 0%, rgba(231,234,237,1) 10%)",
              "&:hover": {
                opacity: 1
              },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& button": {
                background: "transparent",
                color: theme.dark() ? theme.palette.button.selected : "#b6bcc5",
                "&.magic-wand": {
                  // Styling of the Magic Wand Button
                  opacity: 1,
                  transition: "all 200ms ease-in",
                  textShadow: `0px 1px 1px ${theme.dark() ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,1)"}`,
                  // background: `${theme.dark() ? "linear-gradient( 0deg, #3d3d3f 3%, #363637 100%)" : "linear-gradient( 0deg, #F7FAFC 3%, #FFFFFF 100%)"}`,
                  "&.active, &.open": {
                    boxShadow: `${theme.dark() ? "0px 1px 1px 0px rgb(0 0 0 / 8%), 0px 2px 3px 0px rgb(0 0 0 / 8%), inset 0px 1px 0px rgb(255 255 255 / 10%)" : "rgb(50 50 93 / 25%) 0px 1px 2px 0px, rgb(0 0 0 / 25%) 0px 1px 3px -1px"}`,
                    color: chroma(theme.palette.primary.main).alpha(0.75).hex(),
                    background: `${theme.dark() ? "linear-gradient( 0deg, #3d3d3f 3%, #363637 100%)" : "linear-gradient( 0deg, #F7FAFC85 3%, #FFFFFF85 100%)"}`,
                    "&.open": {
                      boxShadow: `${theme.dark() ? "inset 0px 1px 1px 0px rgb(0 0 0 / 8%), 0px 2px 3px 0px rgb(0 0 0 / 8%), inset 0px -1px 0px rgb(255 255 255 / 10%)" : "inset rgb(50 50 93 / 25%) 0px 0px 1px 0px, inset rgb(0 0 0 / 15%) 0px 0px 1px 1px"}`,
                      background: `${theme.dark() ? "linear-gradient( 0deg, #252525 3%, #333 100%)" : "linear-gradient( 0deg, #eeeeee85 3%, #efefef85 100%)"}`,
                    }
                  },
                  "&:hover": {
                    color: theme.palette.primary.main,
                    transition: "all 200ms ease-in",
                    textShadow: `0px 1px 1px ${theme.dark() ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,1)"}`,
                    background: `${theme.dark() ? "linear-gradient( 0deg, #353535 3%, #464647 100%)" : "linear-gradient( 0deg, #F7FAFC 3%, #FFFFFF 100%)"}`,
                    boxShadow: `${theme.dark() ? "0px 1px 1px 0px rgb(0 0 0 / 8%), 0px 2px 3px 0px rgb(0 0 0 / 8%), inset 0px 1px 0px rgb(175 175 175 / 10%)" : "rgb(50 50 93 / 20%) 0px 3px 2px 0px, rgb(0 0 0 / 20%) 0px 1px 1px 0px"}`,
                  },
                  "&:active": {
                    transition: "all 200ms ease-in",
                    textShadow: `0px 1px 1px ${theme.dark() ? "rgba(0,0,0,0.9)" : "rgba(255,255,255,1)"}`,
                    background: `${theme.dark() ? "linear-gradient( 0deg, #4d4d4f55 3%, #46464755 100%)" : "linear-gradient( 0deg, #F7FAFC 3%, #FFFFFF 100%)"}`,
                    boxShadow: `${theme.dark() ? "0inset 0px 1px 3px 0px rgb(0 0 0 / 25%), 0px 1px 0px 0px rgb(255 255 255 / 8%)" : "rgb(50 50 93 / 15%) 0px 0px 0px 1px, rgb(0 0 0 / 30%) 0px 1px 2px -1px"}`,
                  },
                  // "&.active": {
                  //   color: chroma(theme.palette.primary.main).alpha(0.75).hex(),
                  //   boxShadow: theme.dark() ? `0 0 2px 0px ${chroma(theme.palette.primary.main).alpha(0.9).hex()}` : `0 0 3px 1px ${chroma(theme.palette.primary.main).alpha(0.6).hex()}`,
                  //   "&:hover": {
                  //     color: theme.palette.primary.main,
                  //     backgroundColor: theme.dark() ? "#2e2e2e" : "#edeff1",
                  //     boxShadow: theme.dark() ? `0 0 15px -4px ${theme.palette.primary.main}` : `0 0 10px -1px ${theme.palette.primary.main}`,
                  //   }
                  // }
                },
                "&:hover": {
                  color: theme.palette.icon.primary,
                }
              },
            },

          }
        },

        // This is a wrapper for the elements on a slide
        "& .slide-content": {
          position: "relative",
          width: "100%",
          padding: 7,
          overflow: 'hidden',
          border: '0px solid blue',
          "box-shadow": "-3px 0px 5px -5px rgba(0,0,0,0.5)",
          "-webkit-box-shadow": "-3px 0px 5px -5px rgba(0,0,0,0.5)",
          "-moz-box-shadow": "-3px 0px 5px -5px rgba(0,0,0,0.5)",

          // Group support
          '& .editor-group-collection': {
            backgroundColor: theme.dark() ? "rgba(30,31,32,0.1)" : "rgb(231, 234, 237, 0.4)",
            boxShadow: `inset ${theme.dark() ? "rgba(20,20,20,0.25)" : "rgba(20,20,20,0.07)"} 2px 2px 1px -1px, inset ${theme.dark() ? "rgba(45,46,47,0.7)" : "rgb(244, 244, 244)"} -2px -2px 1px 0px`,
            position: "relative",
            margin: "6px 0 6px 0",
            borderRadius: 6,
            padding: "1px 6px 1px 6px",
            paddingLeft: 27,

            "& .dragBarCollection": {
              opacity: 0.7,
              transition: "opacity 150ms ease-in",
              "&:hover": {
                transition: "opacity 250ms ease-out",
                opacity: 1
              },
              cursor: "grab",
              display: "block",
              position: "absolute",
              top: 11,
              left: 9,
              width: 10,
              borderRadius: 5,
              height: "calc(100% - 22px)",
              margin: "auto 0",
              backgroundColor: theme.dark() ? "rgba(20,21,22,0.12)" : "rgb(231, 234, 237, 0.55)",
              boxShadow: `inset ${theme.dark() ? "rgba(20,20,20,0.35)" : "rgba(20,20,20,0.07)"} 2px 2px 1px -1px, inset ${theme.dark() ? "rgba(45,46,47,0.8)" : "rgba(200, 200, 200, 0.5)"} -1px -1px 1px 0px`,
            },

            // Alignment of the drop line around collection
            '& .editor-group-collection-edge': {
              "& .dropLine.bottom": {
                bottom: -6,
              },
              "& .dropLine.top": {
                top: -6,
              },
            },

            '& .editor-group-collection-controls': {
              position: "absolute",
              cursor: "grab",
              top: 0,
              left: 0,
              width: 40,
              height: '100%',
              '& .group-icon': {
                marginTop: 22,
                marginLeft: 13,
                color: theme.dark() ? '#7a7a7a' : '#bbb',
              },
              '&.selected .group-icon': {
                color: theme.palette.primary.main
              },
            },
            "& .editor-group": {

              // Match up the two bottom and top drop lines
              "& .editor-group-edge": {
                "& .dropLine.bottom": {
                  bottom: -4,
                },
                "& .dropLine.top": {
                  top: -4,
                },
              },

              "& .dragBar": {
                opacity: 0.7,
                transition: "opacity 150ms ease-in",
                "&:hover": {
                  transition: "opacity 250ms ease-out",
                  opacity: 1
                },
                cursor: "grab",
                display: "block",
                position: "absolute",
                width: 8,
                left: 7,
                borderRadius: 5,
                height: "calc(100% - 13px)",
                margin: "auto 0",
                backgroundColor: theme.dark() ? "rgba(30,31,32,0.1)" : "rgb(231, 234, 237, 0.4)",
                boxShadow: `inset ${theme.dark() ? "rgba(20,20,20,0.25)" : "rgba(20,20,20,0.07)"} 2px 2px 1px -1px, inset ${theme.dark() ? "rgba(45,46,47,0.7)" : "rgb(244, 244, 244)"} -2px -2px 1px 0px`,
              },

              position: "relative",
              margin: "7px 0 7px 0",
              "&:first-of-type": {
                margin: "6px 0 7px 0"
              },
              "&:last-of-type": {
                margin: "7px 0 6px 0"
              },
              background: theme.dark() ? "linear-gradient(90deg, #393939 0%, #323234 40%)" : "#fff",
              boxShadow: `${theme.dark() ? "rgba(20,20,20,0.2)" : "rgba(20,20,20,0.05)"} 1px 1px 1px 0px, ${theme.dark() ? "rgba(20,20,20,0.2)" : "rgba(20,20,20,0.05)"} -1px -1px 1px 0px`,
              padding: 6,
              borderRadius: 6,
              "&:hover .editor-group-controls, &.selected .editor-group-controls": {
                transition: "opacity 350ms ease-out",
                opacity: 1,
              },
              "& .editor-group-controls": {
                transition: "opacity 250ms ease-out",
                opacity: 0,
                position: "absolute",
                bottom: 0,
                right: 0,
                height: 25,
                width: 60,
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                color: theme.dark() ? '#5a5959' : '#bbb',
                background: theme.dark() ? "rgba(30,31,32,0.1)" : "rgb(249, 249, 249)",
                borderTopLeftRadius: 6,
                borderBottomRightRadius: 6,
                boxShadow: `inset ${theme.dark() ? "rgba(20,20,20,0.35)" : "rgba(20,20,20,0.05)"} 1px 1px 1px 0px`,
                "& button": {
                  opacity: 0.9,
                  transition: "opacity 150ms ease-out",
                  padding: 2,
                  color: theme.dark() ? theme.palette.button.selected : "#bbb",
                  backgroundColor: "transparent",
                  "& svg": {
                    height: 16,
                    width: 16
                  },
                  "&:hover": {
                    transition: "color 150ms ease-out",
                    color: theme.palette.icon.primary,
                  }
                },
              }
            },
          },
          '& .editorElement': {
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '46px auto',
            width: '100%',
            border: '0px solid purple',
            // boxSizing:'border-box',
            // overflow: 'scroll',

            padding: '0.25rem 0 0.25rem 0.25rem',
            borderRadius: '6px',
            background: "transparent",
            "&:first-of-type .elementOptions button.type-paragraph svg": {
              visibility: "visible !important",
              opacity: "1 !important",
            },
            "&:hover": {
              transition: "background 300ms ease-out",
              background: theme.dark() ? `linear-gradient(90deg, ${theme.palette.background.elev04} 0%, ${theme.palette.background.border03} 40%)` : `linear-gradient(90deg, ${theme.palette.background.elev04} 0%, #ffffff 40%)`,
              "& .elementOptions button.type-paragraph svg": {
                visibility: "visible",
                opacity: 1,
                transition: "opacity 300ms ease-in",
              },
            },

            // 01 Element Options: Drag and Drop, Mime Icon, Lightning Bolt ===v===
            '& .elementOptions': {
              textAlign: 'left',
              padding: '0 0 0 3px',
              height: '20px',
              '& button': {
                background: 'transparent',
                fontWeight: '100',
                color: theme.palette.text.secondary,
                padding: '4px',
                borderRadius: '4px',
                margin: '-2px 0 0 0',
                "&:active.regular": {
                  cursor: "grab"
                },
                position: 'relative',
                '&:hover': {
                  color: theme.palette.gradient.stop03,
                },
                '& svg': {
                  fontSize: '1.2rem',
                  margin: '0',
                  padding: '0',
                },
              },
            },
            '& .elementOptions.selected': {
              position: 'relative',
              '& button.icon': {
                opacity: 1,
                color: theme.palette.primary.main,
                transition: "opacity 300ms ease-in, transform 300ms ease-in",
                transform: "scale(1.1)",
                "&:hover": {
                  transition: "opacity 200ms ease-in, transform 200ms ease-in",
                  transform: "scale(1.3)",
                  opacity: 1,
                  color: theme.palette.primary.main,
                }
              },
            },
            "& .elementOptions:not(.clicked) button.type-paragraph svg": {
              visibility: "hidden",
              opacity: 0,
              transition: "opacity 300ms ease-in"
            },

            // 02 Element Content: User entered text
            '& .elementContent': {
              padding: '0',
              userSelect: 'text'
            },
          },

          // Highlight - pulse bg to draw attention
          '& .editorElement.highlighted': {
            animation: theme.dark() ? "pulse-bg 1.75s 1 ease-out" : "pulse-bg-lm 1.75s 1 ease-out",
            '& button:before ': {
              content: '""',
              position: 'absolute',
              width: '1px',
              height: '1px',
              margin: '-1px 0 0 0',
              borderRadius: '50%',
              animation: 'pulse-out 0.8s 1 ease-out',
            },
          },
        },
      },

      // When dragging elements, show destination as line
      // ===============================================
      '& .dropLine': {
        position: 'absolute',
        margin: '0 auto',
        left: '-0.42rem',
        right: '-0.75rem',
        width: '95%',
        height: 2,
        opacity: 1,
        background: theme.palette.events.drop,
        borderRadius: '0px',
        zIndex: '5',
        bottom: -1,
      },
      '& .dropLine.inactive': {
        display: 'none',
      },
      '& .dropLine.top': {
        top: -1,
      },
      '& .dropLine.bottom': {
        bottom: -1,
      },

      // New slide break button system
      ...NewSlideButtonStyling.main(theme),

      '&:last-of-type': {
        // paddingBottom: 50,
        marginBottom: '62px',
        [theme.breakpoints.down('xs')]: {
          marginBottom: '0',
        },

        // This is to make sure I can treat the last slide break suggestion separately
        ...NewSlideButtonStyling.last(theme)
      },

      // New slide button between slides
      '& .inter-slide-buttons': {
        position: "relative",
        cursor: "default",
        opacity: 0,
        left: -100,
        margin: "-6px 0",
        transition: "opacity 200ms ease-in, margin 200ms ease-in",
        "&.first-slide-buttons": {
          top: -6,
          margin: "-14px 0"
        }
      },
      '& .inter-slide-buttons:hover:not(.hide)': {
        left: 0,
        cursor: "pointer",
        opacity: 1,
        margin: "6px 0",
        transition: "opacity 350ms ease-out, margin 350ms ease-out",
        transitionDelay: 500
      },
      '&.selected .inter-slide-buttons:not(.hide):not(.first-slide-buttons)': {
        left: 0,
        cursor: "pointer",
        opacity: 1,
        margin: "6px 0",
        transition: "opacity 350ms ease-out, margin 350ms ease-out",
        transitionDelay: 0
      }
    },

    '& .editor': {
      backgroundColor: "transparent",
      padding: theme.spacing(0, 2, 0, 4),
      fontWeight: theme.dark() ? 300 : 400,
      minHeight: '99vh',
      marginBottom: 0,
      '& .editable::-webkit-scrollbar': {
        display: "none"
      },
      '& .editable': {
        "-ms-overflow-style": "none",
        scrollbarWidth: "none",
        minHeight: '98vh',
        lineHeight: '1.4',
        marginLeft: -20,
        paddingBottom: 72,
        // Phone size should not scroll within the editor
        [theme.breakpoints.up('sm')]: {
          height: '82vh',
          overflow: 'scroll',
          marginLeft: 0,
          padding: theme.spacing(0),
          paddingRight: theme.spacing(2),
        },
        '& .elementContent': {
          '& span.link': {
            cursor: "pointer",
            display: "inline",
            overflowWrap: "wrap",
            userSelect: "none",
            boxShadow: `${theme.dark() ? "rgb(65,65,65)" : "rgb(240,240,240)"} -2px 0px 0px 2px, ${theme.dark() ? "rgb(65,65,65)" : "rgb(240,240,240)"} 2px 0px 0px 2px`,
            backgroundColor: theme.dark() ? "rgb(65,65,65)" : "rgb(240,240,240)",
            borderRadius: 3,
            // padding: "0 6px 0 6px",
            margin: "0 2px 0 2px",
            color: theme.dark() ? "#fff" : "#000",
            textDecoration: "none",
            boxDecorationBreak: "clone",
            "-webkit-box-decoration-break": "clone",
            "& button": {
              position: "relative",
              marginLeft: 2,
              top: -1,
              backgroundColor: "transparent",
              color: theme.dark() ? "rgb(150,150,150)" : "rgb(100,100,100)",
              "& svg": {
                height: "0.65em",
                width: "0.65em"
              },
              '&:hover': {
                color: theme.dark() ? "rgb(220,220,220)" : "rgb(30,30,30)"
              }
            },
          },
          '& h1': {
            fontSize: '1.1em',
            fontWeight: theme.dark() ? 500 : 600,
            margin: '0',
          },
          '& h2': {
            fontSize: '1em',
            fontWeight: theme.dark() ? 400 : 500,
            margin: 0
          },
          '& blockquote': {
            color: theme.palette.text.primary,
            margin: '0 0 0 2px',
            padding: theme.spacing(0, 0, 0, 0),
            borderLeft: '0',
          },
          '& figure': {
            padding: 0,
            margin: 0,
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
          },
          '& hr': {
            borderWidth: 1,
            borderStyle: 'solid',
          },
          '& ul, & ol': {
            margin: '0 0 0 -1.25rem',
          },
          '& span.emphasis': {
            color: theme.palette.primary.main,
          },
          '& span.inlineCode': {
            border: '1px solid',
            borderColor: theme.dark() ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            backgroundColor: theme.dark() ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
            borderRadius: '4px',
            margin: '0',
            padding: '1px 3px',
            color: theme.palette.primary.main,
            fontFamily: '"Fira Code"',
            fontSize: '0.925em',
            letterSpacing: '-0.05em',
          },
          '& .emptyP': {
            border: '1px red solid',
            '& [data-slate-length="0"]': {
              display: 'inline',
            },
            '& br': {
              display: 'none', // Slate adds a <br> for empty leaves
            },
          },
        },
        caretColor: "#f31139"
      },
    }
  }
}), { meta: 'DeckEditor' });
