// Default text alignment is left for this remix
export const textDefaultOverride = (palette) => ({
  '& .container': {
    '& h1, & h2, & p': { textAlign: 'left', },
    '&.container-numbered-list, &.container-bulleted-list': { width: '78%', },
  },
});
