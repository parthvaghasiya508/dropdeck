import { quoteSimpleImageOverride } from "./quoteSimpleImageOverride";

export const clustersQuoteRoundedImageOverride = (palette) => {
  const inherited = quoteSimpleImageOverride(palette);
  const override = {
    '& .sequence[data-length="2"]': {
      '& .cluster .container.container-image': {
        width: '7em',
        height: '7em',
      },
      '& blockquote:after': {
        left: '30%',
        right: '30%',
      },
    },
    '& .sequence[data-length="3"]': {
      '& .cluster .container.container-image': {
        width: '5.5em',
        height: '5.5em',
      },
      '& blockquote:after': {
        left: '30%',
        right: '30%',
      },
    },
    '& .sequence[data-length="4"]': {
      '& .cluster .container.container-image': {
        width: '5.5em',
        height: '5.5em',
      },
      '& blockquote:after': {
        left: '20%',
        right: '20%',
      },
    },
    '& .container-block-quote': {
      marginTop: '1em !important',
    },
  };
  return { ...inherited, ...override };
};
