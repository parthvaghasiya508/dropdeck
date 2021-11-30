import { listStyling } from "../listStyling";

export const numberedListStyling = () => ({

  // Common list styling.
  ...listStyling("ol"),

  // ordered list bullet
  '& ol li:before': {
    content: 'counter(listcounter) "."',
  },
  '& ol ol li': {
    marginLeft: '2em !important',
    '&:before': {
      content: 'counters(listcounter,".") ". " ',
      marginLeft: '-2em',
    },
  },
  '& ol ol ol li': {
    marginLeft: '2.8em !important',
    '&:before': {
      marginLeft: '-2.8em',
    },
  },
});
