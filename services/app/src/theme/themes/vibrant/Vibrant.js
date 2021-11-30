import Simple from "../simple/Simple";
import { getPalettes } from "./components/palettes";
import { getFonts } from "./components/fonts";

import { textSuperTitleRemix } from "../../../common/remix/rules/text/textSuperTitle/textSuperTitle";
import { superTitleOverride } from "./remixes/superTitleOverride";

export default class vibrant extends Simple {

  constructor() {
    super('vibrant', getPalettes(), "Vibrant", false, getFonts());

    const { override } = this;
    override(textSuperTitleRemix).with(superTitleOverride);
  }

  css() {
    return {
      theme: {
        '& .slide': {
          fontSize: '75%',
          fontWeight: 400,
          lineHeight: '1.1',
          padding: "9%",
          justifyContent: 'center !important',
          alignItems: 'flex-start !important',
          textAlign: 'left !important',
          fontFamily: '"DM Sans","Helvetica Neue","Helvetica","Arial",sans-serif',
          letterSpacing: '-0.01em !important',
          '& h1': {
            margin: '0 0 0.45em 0',
            padding: 0,
            fontSize: '2em',
            fontWeight: 500,
            '& strong': {
              fontWeight: 700,
            },
            '& span.emphasis': {
              padding: '0',
              borderRadius: "0.1em",
            },
          },
          '& h2': {
            margin: '0 0 0.5em 0',
            padding: 0,
            fontSize: '1.55em',
            fontWeight: 500,
            letterSpacing: '-0.0125em !important',
            '& strong': {
              fontWeight: 700,
            },
          },
          '& p': {
            margin: '0 0 0.75em 0',
            padding: 0,
            fontSize: '1.3em',
            fontWeight: 400,
            '& strong': {
              fontWeight: 700,
            },
          },
          '& ol, & ul': {
            '& li': {
              fontSize: '1.3em',
              margin: '0 0 0.5em 1.5em !important',
              boxSizing: 'border-box',
              '&:before': {
                lineHeight: '1.1',
              },
              '& p': {
                lineHeight: '1.1',
              },
            },
          },
          '& blockquote': {
            '& p': {
              fontWeight: 400,
              '& strong': {
                fontWeight: 700,
              },
            },
          },
          '& code': {
            boxSizing: 'border-box',
            fontSize: '1.1em',
          },
          '& img': {
            width: '100%'
          },
          '& .group-text-after': {
            marginTop: '1.5em',
            fontSize: '100%',
          },
          '& .group-text-before': {
            marginBottom: '1.5em',
            fontSize: '100%',
          },
        },

      },
    };
  }

}
