export const listSplitOverride = (palette) => ({
  '& .container': {
    width: '100% !important',
    maxWidth: '100% !important',
    position: 'relative',
    zIndex: '2',
    '& * ': {
      textAlign: 'left !important',
    },
  },
  '& .hook': {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='4876px' height='3838px' viewBox='0 0 4876 3838' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1'%3E%3Cpath id='Path' d='M3007.883 3259.232 C2693.503 3339.51 614.701 3525.129 207.649 2479.249 -169.155 1511.088 1960.325 664.352 1960.325 664.352 1960.325 664.352 4412.65 -270.401 4503.959 1194.669 4599.518 2727.947 3322.262 3178.954 3007.883 3259.232 Z' fill='${palette.accent().replace('#', '%23')}' fill-opacity='1' stroke='none'/%3E%3C/svg%3E")`,
    content: '""',
    display: 'block',
    boxSizing: 'border-box',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    opacity: '0.075',
    zIndex: '1',
    backgroundSize: '50em 50em',
    backgroundPosition: '-41em -25em', // right bottom text color
    backgroundRepeat: 'no-repeat',
  },
});
