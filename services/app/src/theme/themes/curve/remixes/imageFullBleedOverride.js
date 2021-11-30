// Fullbleed image with pinned text, rounded right edge
export const imageFullBleedOverride = () => ({
  '& .group': {
    marginLeft: '-6%',
    padding: '1em 4em !important',
    borderRadius: '0',
    borderTopRightRadius: '50em !important',
    borderBottomRightRadius: '50em !important',
    '& .sequence, & .group': {
      margin: '0',
      padding: '0 !important',
      borderRadius: '0 !important',
    },
    '& .container-block-quote': { paddingLeft: '0 !important', },
    '& .container-heading-one h1': { margin: '0 0 0.125em 0', },
    '& .container-heading-two h2': { marginBottom: '0.4em', },
    '& .container-paragraph p': { marginBottom: '0.25em', },
    '& .container-heading-two + .container-heading-one h1': { marginTop: '-0.175em', },
    '& .container-paragraph + .container-heading-one h1': { marginTop: '-0.125em', },
  },
});
