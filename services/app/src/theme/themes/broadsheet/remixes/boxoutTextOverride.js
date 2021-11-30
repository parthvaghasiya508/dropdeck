// boxout text
export const boxoutTextOverride = () => ({
  '& .group-text-after, .group-text-before': {
    textShadow: 'none !important',
    border: '0 !important',
    borderRadius: '0 !important',
    '& p:after': {
      top: '0.3em',
      marginLeft: '0',
    },
  }
});
