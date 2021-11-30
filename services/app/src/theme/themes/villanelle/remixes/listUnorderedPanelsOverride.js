import * as culori from "culori";

// unordered panels
export const listUnorderedPanelsOverride = (palette) => ({
  '& li': {
    border: `0.01em solid ${culori.formatRgb({ ...culori.parse(palette.textColor), alpha: 0.05 })} !important`,
    '& p': {
      color: `${palette.textColor} !important`,
      fontWeight: '400',
    },
  }
});
