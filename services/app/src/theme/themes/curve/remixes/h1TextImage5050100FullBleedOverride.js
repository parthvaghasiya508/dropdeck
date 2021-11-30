export const h1TextImage5050100FullBleedOverride = (palette) => ({
  '& .container-image': {
    '&:before': {
      display: 'block',
      position: 'absolute',
      left: '-1%',
      right: '-1%',
      content: '""',
      backgroundSize: 'contain',
      backgroundPosition: 'top right',
      backgroundRepeat: 'no-repeat',
      zIndex: '2',
      height: '15%',
      top: '-0.4%',
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='2097px' height='89px' viewBox='0 0 2097 89' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1'%3E%3Cpath id='Path' d='M2097 0 C-1 0 0 0 0 0 L0 66 C0 66 738.75 -23.836 2097 8.713' fill='${palette.background().replace('#', '%23')}' fill-opacity='1' stroke='none'/%3E%3C/svg%3E")`,
    },
  },
});
