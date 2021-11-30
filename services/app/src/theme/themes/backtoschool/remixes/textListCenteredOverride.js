// textlist-centered - book bg
export const textListCenteredOverride = (palette) => ({
  backgroundImage: 'url(/themes/b2s/theme-b2s-bg.png)',

  '& .group-text': {
    boxSizing: 'border-box',
    marginRight: '14%',
  },
  '& .group-list': {
    position: 'relative',
    zIndex: '1',
    '& ol li:before': {
      lineHeight: '1.2',
    },
  },

  '& .hook': {
    position: 'absolute',
    background: 'url(/themes/b2s/theme-b2s-book.png) center left no-repeat',
    backgroundSize: 'cover',
    width: '55%',
    height: '100%',
    right: '0',
    top: '0',
    zIndex: '0',
    display: 'block',
  },

});
