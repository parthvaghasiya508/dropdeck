import { listStyling } from "../listStyling";

export const bulletedListStyling = () => ({

  // Common list styling
  ...listStyling("ul"),

  // unordered list DOT
  '& ul li:before': {
    content: '"•"',
  },
  '& ul ul li:before': {
    content: '"◦"',
    fontWeight: '700',
  },
  '& ul ul ul li:before': {
    content: '"•"',
  },
  // unordered list bullet: TICK
  '& ul.display-tick, ul.display-cross, ul.display-arrow, ul.display-plus': {
    '& li:before': {
      content: '" "',
      backgroundRepeat: "no-repeat",
      backgroundSize: '90%',
      backgroundPosition: 'center center',
      width: '1.1em',
      height: '1.1em',
    },
  },
});
