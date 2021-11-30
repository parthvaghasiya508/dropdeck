export const imageH1text1005050FullBleedOverride = (palette) => ({
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
      height: '9%',
      bottom: '-0.4%',
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='2097px' height='77px' viewBox='0 0 2097 77' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1'%3E%3Cpath id='Path' d='M4671.783 412.181 C4661.692 123.236 3031.31 -54.351 1030.221 15.528 -970.867 85.408 -2584.89 376.292 -2574.8 665.237 -2564.71 954.182 -934.327 1131.77 1066.761 1061.89 3067.85 992.011 4681.873 701.126 4671.783 412.181 Z' fill='${palette.background().replace('#', '%23')}' fill-opacity='1' stroke='none'/%3E%3C/svg%3E")`,
    },
  },
});
