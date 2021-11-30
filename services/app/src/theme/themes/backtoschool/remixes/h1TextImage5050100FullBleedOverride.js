import { imageH1text1005050FullBleedOverride } from "./imageH1Text1005050FullBleedOverride";

export const h1TextImage5050100FullBleedOverride = () => {
  const inherited = imageH1text1005050FullBleedOverride();
  const override = {
    '& .container.container-image': {
      padding: '0.25em 1.55em 1.47em 1.55em',
      '&:before': {
        top: '12em',
        right: '0.45em',
        left: 'unset',
        transform: 'rotate(90deg)',
      },
      '& img': {
        animation: 'none',
        border: '0.5em solid #ffffff',
        boxShadow: '0 0.08em 0.075em rgba(0,0,0,.1)',
      },
    },
  };
  return { ...inherited, ...override };
};
