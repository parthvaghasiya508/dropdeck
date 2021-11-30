// Encapsulated list remix panel text color
export const listUnorderedPanelsOverride = (palette) => ({
  '& .container-numbered-list ol li p': {
    color: `${palette.background()} !important`,
  },
  '& .container-bulleted-list ol li p': {
    color: `${palette.background()} !important`,
  },
});
