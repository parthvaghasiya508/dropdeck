export const clustersTextFixedImageOverride = (palette) => ({
  '& .hook': {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='4876px' height='3838px' viewBox='0 0 4876 3838' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1'%3E%3Cpath id='Path' d='M1686.872 3196.367 C1992.015 3306.67 4043.125 3692.445 4549.409 2690.83 5018.071 1763.645 2980.452 714.95 2980.452 714.95 2980.452 714.95 630.014 -452.568 397.457 996.805 154.073 2513.656 1381.729 3086.064 1686.872 3196.367 Z' fill='${palette.text().replace('#', '%23')}' fill-opacity='1' stroke='none'/%3E%3C/svg%3E")`,
    content: '""',
    display: 'block',
    boxSizing: 'border-box',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    opacity: '0.0325',
    zIndex: '1',
    backgroundSize: '50em 50em',
    backgroundPosition: '-20em -10em',
    backgroundRepeat: 'no-repeat',
  },
});
