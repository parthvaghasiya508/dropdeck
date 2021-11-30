export const textQuote5050FullBleedOverride = (palette) => ({
  '& .img-quote': {
    margin: 'auto 0',
    width: '48%',
    '& p': {
      margin: '0.5em 0 0 0',
      padding: '0',
    },
  },
  '& .container-image:last-of-type': {
    '&:before': {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='305px' height='2097px' viewBox='0 0 305 2097' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1'%3E%3Cpath id='Path' d='M2 2097 C2 -1 2 0 2 0 L305 0 C305 0 -107.427 738.75 42 2097' fill='${palette.background().replace('#', '%23')}' fill-opacity='1' stroke='none'/%3E%3C/svg%3E")`,
      transform: 'scaleY(-1)',
      display: 'block',
      position: 'absolute',
      left: '-0.5%',
      top: '0',
      bottom: '0',
      width: '40%',
      content: '""',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'top left',
      zIndex: '2',
    },
  },
});
