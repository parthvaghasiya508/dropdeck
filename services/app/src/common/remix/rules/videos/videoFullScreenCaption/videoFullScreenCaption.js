import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { video, label, paragraph } from "../../../match/Matchers";
import { once, atLeast } from "../../../match/expressions/Occurring";

/**
 * v1: Full Screen Video
 */
export const videoFullScreenCaptionRemix = new Remix('video-full-caption', (colorChart) => ({
  background: '#000',
  padding: '0',
  justifyContent: 'flex-end !important',
  '& .container': {
    width: '100%',
    textAlign: 'center',
  },
  // video
  '& .videoContainer': {
    flexFlow: 'row',
    zIndex: '0',
    flex: '1',
    margin: '0 !important',
    height: '100% !important',
    '& iframe': {
      width: '100%',
    },
  },
  '& .videoThumbnail img': {
    borderBottom: '0.025em solid rgba(255,255,255,0.125)',
    boxSizing: 'border-box',
  },
  // text
  '& .group-text-after': {
    width: '100%',
    padding: '1em 4.5%',
    boxSizing: 'border-box',
    zIndex: '1',
    margin: '0',
    '& .container-paragraph': {
      textAlign: 'center',
      width: '100%',
      '& p': { 
        width: 'auto', 
        margin: '0 0 0.322em 0',
        fontSize: '0.9em',
        color: `${colorChart.background()}`,
      },
    },
    '& .container:last-child *:last-child': { margin: '0', },
    '& .group-text-after': {
      padding: '0',
      boxShadow: 'none',
    },
  },
}),
when(
  video(once),
  label(paragraph(atLeast(1)), "group-text-after"),
).score(1.3));
