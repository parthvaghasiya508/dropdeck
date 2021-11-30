import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { image, label, plainText, text, paragraph } from "../../../match/Matchers";
import { atLeast, once } from "../../../match/expressions/Occurring";

/**
 * i3:   Single image, full bleed. Text appears against white bg.
 */
export const imageFullBleedCaptionRemix = new Remix('image-1-fullbleedcaption', (colorChart) => ({
  padding: '0',
  justifyContent: 'flex-end !important',
  '& .group-text-after': {
    width: '100%',
    padding: '1em 4.5%',
    margin: '0 !important',
    background: `${colorChart.background()}`,
    boxSizing: 'border-box',
    zIndex: '1',
    maxHeight: '20%',
    overflow: 'hidden',
    '& .container-paragraph': {
      textAlign: 'center',
      width: '100%',
      '& p': {
        width: 'auto',
        margin: '0 0 0.322em 0',
        fontSize: '0.9em',
      },
    },
    '& .container:last-child *:last-child': { margin: '0', },
    '& .group-text-after': {
      padding: '0',
      boxShadow: 'none',
    },
  },
  '& .container-image': {
    zIndex: '0',
    flex: '1',
    margin: '0 !important',
    height: '100% !important',
    '& .element': {
      margin: '0',
      overflow: "hidden",
      padding: '0',
    },
    '& .imgWrap img': {
      margin: '0',
      padding: '0',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center center',
      position: "absolute",
    },
  },
}),
when(
  image(once),
  label(paragraph(atLeast(1)), "group-text-after"),
).score(56),{
  scalingSelector: '.group-text-after',
});
