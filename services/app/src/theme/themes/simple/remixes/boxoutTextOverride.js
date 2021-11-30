// boxout text
export const boxoutTextOverride = () => ({
  '& .group.group-text-after, .group.group-text-before': {
    textShadow: 'none !important',
    border: '0',
    borderRadius: '0.75em',
    boxShadow: '0.08em 0.24em 0.8em 0.12em rgb(0 0 0 / 9%)',
    padding: '1.75em',
  },
  // Bring closer to subsequent text elements
  '& .container-heading-one h1': {
    marginBottom: '0.325em !important',
  },
});
