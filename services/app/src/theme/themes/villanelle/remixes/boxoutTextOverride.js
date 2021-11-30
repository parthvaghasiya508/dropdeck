//  .group-text box styling when over images, multiple remixes
import * as culori from "culori";

export const boxoutTextOverride = (palette) => ({
  '& .group-text-after, .group-text-before': {
    background: `${culori.formatRgb({ ...culori.parse(palette.backgroundColor), alpha: 0.9 })} !important`,
    border: `0.01em solid ${culori.formatRgb({ ...culori.parse(palette.backgroundColor), alpha: 0.75 })} !important`,
    borderRadius: '0 !important',
    boxShadow: 'none !important',
  }
});
