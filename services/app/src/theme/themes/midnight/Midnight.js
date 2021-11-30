import AbstractTheme from "../../AbstractTheme";
import { getPalettes } from "./components/palettes";
import { getFonts } from "./components/fonts";
import { textListCenteredRemix } from "../../../common/remix/rules/lists/textListCentered/textListCentered";
import { textListCenteredOverride } from "./remixes/textListCenteredOverride";
import { listUnorderedPanelsRemix } from "../../../common/remix/rules/lists/listUnorderedPanels/listUnorderedPanels";
import { listUnorderedPanelsOverride } from "./remixes/listUnorderedPanelsOverride";
import { olBoldNumberRemix } from "../../../common/remix/rules/lists/olBoldNumber/olBoldNumber";
import { olBoldNumberOverride } from "./remixes/olBoldNumberOverride";
import { clustersPanelFixedImageRemix } from "../../../common/remix/rules/clusters/clustersPanelFixedImage/clustersPanelFixedImage";
import { clustersPanelFixedImageOverride } from "./remixes/clustersPanelFixedImageOverride";
import { clustersPanelLandscapeRemix } from "../../../common/remix/rules/clusters/clustersPanelLandscape/clustersPanelLandscape";
import { clustersPanelLandscapeOverride } from "./remixes/clustersPanelLandscapeOverride";
import { clustersFullPanelRemix } from "../../../common/remix/rules/clusters/clustersFullPanel/clustersFullPanel";
import { clustersFullPanelOverride } from "./remixes/clustersFullPanelOverride";
import { textBlockbusterRemix } from "../../../common/remix/rules/text/textBlockBuster/textBlockbuster";
import { textBlockbusterOverride } from "./remixes/textBlockbusterOverride";
import { textListPanelsRemix } from "../../../common/remix/rules/lists/textListPanels/textListPanels";
import { textListPanelsOverride } from "./remixes/textListPanelsOverride";

export default class Midnight extends AbstractTheme {

  constructor() {
    super('midnight', getPalettes(), "Midnight", false, getFonts());

    /*
     * Custom palette override behaviour:
     */
    const { override } = this;
    override('& h1').with(
      (palette) => ({
        color: `${palette.title()} !important`,
      })
    );
    override('& span.mark').with(
      (palette) => ({
        backgroundColor: palette.accent(),
      })
    );
    override('& strong').with(
      (palette) => ({
        color: palette.text(),
      })
    );
    override('& .slide.clusters-roundedimg, & .slide.clusters-text-fixedimgaspect').with(
      (palette) => ({
        '& .sequence-cluster-numbered-list, & .sequence-cluster-bulleted-list': {
          '& .container.container-bulleted-list li': {
            '&:before': {
              background: palette.accentColor,
            },
          },
          '& .container.container-numbered-list li': {
            '&:before': {
              color: palette.accentColor,
              background: palette.backgroundColor,
            },
            '&:after': {
              background: palette.accentColor,
            },
          },
        },
      })
    );

    // --------------------------------------------------------------------------------------------
    // Theme Specific Remix Overrides
    // Layout and structural (group colour info above)
    // --------------------------------------------------------------------------------------------

    override(textListCenteredRemix).with(textListCenteredOverride);
    override(listUnorderedPanelsRemix).with(listUnorderedPanelsOverride);
    override(olBoldNumberRemix).with(olBoldNumberOverride);
    override(clustersPanelFixedImageRemix).with(clustersPanelFixedImageOverride);
    override(clustersPanelLandscapeRemix).with(clustersPanelLandscapeOverride);
    override(clustersFullPanelRemix).with(clustersFullPanelOverride);
    override(textBlockbusterRemix).with(textBlockbusterOverride);
    override(textListPanelsRemix).with(textListPanelsOverride);

  }

  css() {
    return {
      theme: {

        '& .slide': {
          fontSize: '75%', // 65
          fontWeight: 400,
          lineHeight: '1.25',
          padding: "9%",
          fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
          justifyContent: 'center !important',
          alignItems: 'flex-start !important',
          textAlign: 'left !important',
          '& h1': {
            margin: '0 0 0.5em 0',
            padding: 0,
            fontSize: '2em',
            fontWeight: 700,
            lineHeight: '1',
            letterSpacing: '-0.035em',
            '& span.emphasis': {
              borderRadius: "0.1em",
            },
            '& strong': {
              fontWeight: 900,
            },
          },
          '& h2': {
            margin: '0 0 0.45em 0',
            letterSpacing: '-0.0125rem',
            fontWeight: '600',
            fontSize: '1.6em',
          },
          '& p': {
            margin: '0 0 0.75em 0',
            padding: 0,
            fontSize: '1.3em',
            fontWeight: 400,
            lineHeight: '1.1',
            letterSpacing: '-0.01em',
            '& strong': {
              fontWeight: 700,
            },
          },
          '& ol, & ul': {
            '& li': {
              fontSize: '1.3em',
              lineHeight: '1.1',
              boxSizing: 'border-box',
              '&:before': {
                fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji !important',
                lineHeight: '1.1',
              },
              '& p': {
                lineHeight: '1.1',
              },
            },
          },
          '& blockquote': {
            '& p': {
              fontWeight: 600,
              letterSpacing: '-0.025em',
              '& strong': {
                fontWeight: 900,
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
            marginTop: '1em',
            fontSize: '100%',
            '& h1': {
              marginBottom: '0.25em',
            },
          },
          '& .group-text-before': {
            marginBottom: '1em',
            fontSize: '100%',
            '& h1': {
              marginBottom: '0.25em',
            },
          },
        },

      }
    };
  }
}
