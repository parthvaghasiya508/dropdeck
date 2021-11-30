import { makeStyles } from "@material-ui/styles";
import ComponentService from "../../../../common/api/plugins/ComponentService";

export const defaultSlideStyles = {
  slideRoot: {
    width: '100%',
    position: 'relative',

    "& .slide > *": {
      "-webkit-transform": "translateZ(0)",
    },

    // @todo this is technically just Lightbox styling so should be moved out of here
    '& .overflow:after': {
      background: 'repeating-linear-gradient(-55deg, rgb(212 11 0 / 0.9) 0, rgb(212 11 0 / 0.9) 8px, rgb(88 0 11 / 0.8) 8px, rgb(88 0 11 / 0.8) 16px)',
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      height: '4px',
      zIndex: '2',
    },

    '& .slide': {
      display: 'flex', // flex
      flexDirection: 'column', // default to columns
      justifyContent: 'center', // default to centered vertically
      alignItems: 'flex-start', // default to left-aligned horizontally
      textAlign: 'left', // default to left-aligned text
      height: '100%',
      width: '100%',
      boxSizing: 'border-box',
      textShadow: 'none',
      cursor: 'default',
      position: 'relative',

      //  Slide Header
      '& .slideHeader.show': {
        display: 'block',
      },

      // Hook
      '& .hook': {
        display: 'none',
      },

      //  Component Containers
      '& .container': {

        // Merge in all default component styling:
        ...ComponentService.instance().styling(),

        // Chart Container
        // @todo Depends on https://linear.app/dropdeck/issue/DD-1168/charts-should-have-the-same-component-type
        '&.container-chart': {
          height: '100%',
          width: '100%',
          padding: '0',
          overflow: 'hidden',
          display: 'flex',
        },

        // Inline Code
        // @todo move this into a plugin
        '& span.inlineCode': {
          borderRadius: '0.125em',
          margin: '0',
          padding: '0 0.25em',
          fontFamily: '"Fira Code"',
          fontSize: '0.95em',
          letterSpacing: '-0.05em',
          lineHeight: '1.425',
          wordSpacing: '-0.25em',
          border: '0.075em solid',
        },
      },

      // Drag and Drop Containers
      // ------------------------

      // Wrapper around each container's component-specific markup. 1/2
      '& .container .element': {
        width: '100%',
        // background:'#66ffff44',
      },

      //  Single Image alone on a slide should be centered
      // @todo move this into a plugin
      '& .element .imgWrap': {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        '& img': {
          maxHeight: '100%',
          objectFit: 'contain',
        },
      },

      //  Text styling is minimal here, so not as to override themes
      '& h1, & h2, & p': {
        zIndex: '1',
      },

      // @todo when we remove this it breaks the layout for many list remixes
      '& ol, & ul': {
        '& li': {
          '& p': {
            margin: "0",
          },
        },
      },

      '& span.mark': {
        zIndex: '1',
        padding: "0.5%",
        margin: "-0.5%",
      },

      // clusters
      // @todo move this into a plugin
      '& .cluster': {
        marginBottom: "1em",
        '& h2': {
          marginBottom: '0.166em',
        },
        '& > .cluster': {
          marginBottom: "0",
        },
        '&:last-child': {
          marginBottom: "0",
        },
      },

    },

  }
};

export const getDefaultSlideStyles = (deterministic = false) => makeStyles(() => (defaultSlideStyles), { deterministic, meta: 'DefaultSlideStyles' });
