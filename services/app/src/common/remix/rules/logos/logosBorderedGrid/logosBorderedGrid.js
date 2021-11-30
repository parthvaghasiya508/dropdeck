import { Remix } from "../../../Remix";
import { when } from "../../../match/RemixRule";
import { label, logo, logoList, plainText } from "../../../match/Matchers";
import { anyNumber, once } from "../../../match/expressions/Occurring";

export const MAX_LOGOS = 27;

/**
 * Logos in a bordered grid.
 */
export const logosBorderedGridRemix = new Remix('logos-bordered-grid', {

  justifyContent: 'center !important',
  // Containers
  '& .container': {
    margin: '0 auto',
    '& h1, & h2, & p': { textAlign: 'center', },
    '& .container': { width: '100%', },
  },
  // Logo
  '& .container-logo': {
    margin: '0 0 1em 0',
    '& img': {
      width: 'auto',
      height: '100%',
      padding: '3%',
      boxSizing: 'border-box',
      maxHeight: '6em',
    },
  },
  // Logos
  '& .container-logo-list': {
    width: '100%',
    '& .element .logos': {
      '& *': { boxSizing: 'border-box', },
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(55%, 1fr))',
      padding: '0 30%',
      boxSizing: 'border-box',
      gridGap: '0',
      margin: '0.75em 0',
      width: '100%',
      height: 'fit-content',
      '& .imgWrap': {
        margin: '0',
        padding: '0',
        placeItems: 'center',
        background: '#fff',
        border: 'solid #e4e4e4',
        borderWidth: '0.05em',
        borderRightWidth: '0',
        borderTopWidth: '0',
        height: 'auto',
        overflow: 'hidden',
        '&:last-child': {
          borderRightWidth: '0.05em',
        },
        '&:first-child:nth-last-child(1), &:first-child:nth-last-child(1) ~ .imgWrap': {
          borderTopWidth: '0.05em',
        },
        '&:before': {
          content: '""',
          display: 'block',
          paddingBottom: '75%',
          gridArea: '1 / 1 / 2 / 2',
        },
        '& img': {
          width: '100%',
          height: '50%',
          maxWidth: '65%',
          maxHeight: '6em',
          gridArea: '1 / 1 / 2 / 2',
          objectFit: 'contain',
          margin: '0',
          padding: '0',
          transform: 'scale(0.8)',
        },
      },

      //    2 per row
      '&[data-length="2"]': {
        gridTemplateColumns: 'repeat(auto-fill, minmax(35%, 1fr))',
        padding: '0 15%',
        boxSizing: 'border-box',
      },
      //    3 per row
      '&[data-length="3"]': {
        gridTemplateColumns: 'repeat(auto-fill, minmax(33.33334%, 1fr))',
        padding: '0',
      },
      //    4 per row: groups of 4 / 7 / 8
      '&[data-length="4"], &[data-length="7"], &[data-length="8"]': {
        gridTemplateColumns: 'repeat(auto-fill, minmax(25%, 1fr))',
        padding: '0',
        '& .imgWrap:nth-child(1), & .imgWrap:nth-child(2), & .imgWrap:nth-child(3), & .imgWrap:nth-child(4)': { borderTopWidth: '0.05em', },
        '& .imgWrap:nth-child(5), & .imgWrap:nth-child(6)': { borderTopWidth: '0', },
        '& img': {
          width: '90%',
          height: '60%',
          maxWidth: '50%',
          maxHeight: '3em !important',
        },
      },
      //    5 per row: groups of 5 / 9 / 10 / 13 / 14 / 15
      '&[data-length="5"], &[data-length="9"], &[data-length="10"], &[data-length="13"], &[data-length="14"], &[data-length="15"]': {
        gridTemplateColumns: 'repeat(auto-fill, minmax(20%, 1fr))',
        padding: '0',
        '& .imgWrap:nth-child(1), & .imgWrap:nth-child(2), & .imgWrap:nth-child(3), & .imgWrap:nth-child(4), & .imgWrap:nth-child(5)': { borderTopWidth: '0.05em', },
        '& .imgWrap:nth-child(6)': { borderTopWidth: '0', },
        '& img': {
          width: '90%',
          height: '60%',
          maxWidth: '50%',
          maxHeight: '3em !important',
        },
      },
      //    6 per row: groups of 6 / 11 / 12 / 16 / 17 / 18
      '&[data-length="6"], &[data-length="11"], &[data-length="12"], &[data-length="16"], &[data-length="17"], &[data-length="18"]': {
        gridTemplateColumns: 'repeat(auto-fill, minmax(16.66667%, 1fr))',
        padding: '0',
        '& .imgWrap:nth-child(1), & .imgWrap:nth-child(2), & .imgWrap:nth-child(3), & .imgWrap:nth-child(4), & .imgWrap:nth-child(5), & .imgWrap:nth-child(6)': { borderTopWidth: '0.05em', },
        '& img': {
          width: '90%',
          height: '60%',
          maxWidth: '50%',
          maxHeight: '3em !important',
        },
      },
      //    7 per row: groups of 19 - 21
      '&[data-length="19"], &[data-length="20"], &[data-length="21"]': {
        gridTemplateColumns: 'repeat(auto-fill, minmax(14.28571%, 1fr))',
        padding: '0',
        '& .imgWrap:nth-child(1), & .imgWrap:nth-child(2), & .imgWrap:nth-child(3), & .imgWrap:nth-child(4), & .imgWrap:nth-child(5), & .imgWrap:nth-child(6), & .imgWrap:nth-child(7)': { borderTopWidth: '0.05em', },
        '& img': {
          width: '100%',
          height: '60%',
          maxWidth: '50%',
          maxHeight: '3em !important',
        },
      },
      //    8 per row: groups of 22 - 24
      '&[data-length="22"], &[data-length="23"], &[data-length="24"]': {
        gridTemplateColumns: 'repeat(auto-fill, minmax(12.5%, 1fr))',
        padding: '0',
        '& .imgWrap:nth-child(1), & .imgWrap:nth-child(2), & .imgWrap:nth-child(3), & .imgWrap:nth-child(4), & .imgWrap:nth-child(5), & .imgWrap:nth-child(6), & .imgWrap:nth-child(7), & .imgWrap:nth-child(8)': { borderTopWidth: '0.05em', },
        '& img': {
          width: '90%',
          height: '60%',
          maxWidth: '50%',
          maxHeight: '3em !important',
        },
      },
      //    9 per row: groups of 25 - 27
      '&[data-length="25"], &[data-length="26"], &[data-length="27"]': {
        gridTemplateColumns: 'repeat(auto-fill, minmax(11.111%, 1fr))',
        padding: '0',
        '& .imgWrap:nth-child(1), & .imgWrap:nth-child(2), & .imgWrap:nth-child(3), & .imgWrap:nth-child(4), & .imgWrap:nth-child(5), & .imgWrap:nth-child(6), & .imgWrap:nth-child(7), & .imgWrap:nth-child(8), & .imgWrap:nth-child(9)': { borderTopWidth: '0.05em', },
        '& .imgWrap:nth-child(9), & .imgWrap:nth-child(18)': { borderRightWidth: '0.05em', },
        '& img': {
          width: '90%',
          height: '60%',
          maxWidth: '50%',
          maxHeight: '3em !important',
        },
      },
      // n image specific styling
      // -------------------------

      '&[data-length="1"], &[data-length="2"], &[data-length="3"], &[data-length="4"], &[data-length="5"], &[data-length="6"]': {
        '& .imgWrap': { borderTopWidth: '0.05em', },
      },
      '&[data-length="7"]': {
        '& .imgWrap:nth-child(4)': { borderRightWidth: '0.05em', },
        '& .imgWrap:nth-child(5), & .imgWrap:nth-child(6), & .imgWrap:nth-child(7)': { marginLeft: '4.5em', },
      },
      '&[data-length="8"]': {
        '& .imgWrap:nth-child(4)': { borderRightWidth: '0.05em', },
      },
      '&[data-length="9"]': {
        '& .imgWrap:nth-child(5)': { borderRightWidth: '0.05em', },
        '& .imgWrap:nth-child(6), & .imgWrap:nth-child(7), & .imgWrap:nth-child(8), & .imgWrap:nth-child(9)': { marginLeft: '3.5em', },
      },
      '&[data-length="10"]': {
        '& .imgWrap:nth-child(5)': { borderRightWidth: '0.05em', },
      },
      '&[data-length="11"]': {
        '& .imgWrap:nth-child(6)': { borderRightWidth: '0.05em', },
        '& .imgWrap:nth-child(7), & .imgWrap:nth-child(8), & .imgWrap:nth-child(9), & .imgWrap:nth-child(10), & .imgWrap:nth-child(11)': { marginLeft: '2.5em', borderTopWidth: '0', },
      },
      '&[data-length="12"]': {
        '& .imgWrap:nth-child(6)': { borderRightWidth: '0.05em', },
      },
      '&[data-length="13"]': {
        '& .imgWrap:nth-child(5), & .imgWrap:nth-child(10)': { borderRightWidth: '0.05em', },
        '& .imgWrap:nth-child(11), & .imgWrap:nth-child(12), & .imgWrap:nth-child(13)': { marginLeft: '7.2em', },
      },
      '&[data-length="14"]': {
        '& .imgWrap:nth-child(5), & .imgWrap:nth-child(10)': { borderRightWidth: '0.05em', },
        '& .imgWrap:nth-child(11), & .imgWrap:nth-child(12), & .imgWrap:nth-child(13), & .imgWrap:nth-child(14)': { marginLeft: '3.6em', },
      },
      '&[data-length="15"]': {
        '& .imgWrap:nth-child(5), & .imgWrap:nth-child(10)': { borderRightWidth: '0.05em', },
      },
      '&[data-length="16"]': {
        '& .imgWrap:nth-child(6), & .imgWrap:nth-child(12)': { borderRightWidth: '0.05em', },
        '& .imgWrap:nth-child(5), & .imgWrap:nth-child(6)': { borderTopWidth: '0.05em', },
        '& .imgWrap:nth-child(13), & .imgWrap:nth-child(14), & .imgWrap:nth-child(15), & .imgWrap:nth-child(16)': { marginLeft: '6em', },
      },
      '&[data-length="17"]': {
        '& .imgWrap:nth-child(6), & .imgWrap:nth-child(12)': { borderRightWidth: '0.05em', },
        '& .imgWrap:nth-child(13), & .imgWrap:nth-child(14), & .imgWrap:nth-child(15), & .imgWrap:nth-child(16), & .imgWrap:nth-child(17)': { marginLeft: '3em', },
      },
      '&[data-length="18"]': {
        '& .imgWrap:nth-child(6), & .imgWrap:nth-child(12), & .imgWrap:nth-child(18)': { borderRightWidth: '0.05em', },
      },
      '&[data-length="19"]': {
        '& .imgWrap:nth-child(7), & .imgWrap:nth-child(14)': { borderRightWidth: '0.05em', },
        '& .imgWrap:nth-child(15), & .imgWrap:nth-child(16), & .imgWrap:nth-child(17), & .imgWrap:nth-child(18), & .imgWrap:nth-child(19)': { marginLeft: '5.115em', },
      },
      '&[data-length="20"]': {
        '& .imgWrap:nth-child(7), & .imgWrap:nth-child(14)': { borderRightWidth: '0.05em', },
        '& .imgWrap:nth-child(15), & .imgWrap:nth-child(16), & .imgWrap:nth-child(17), & .imgWrap:nth-child(18), & .imgWrap:nth-child(19), & .imgWrap:nth-child(20)': { marginLeft: '2.5575em', },
      },
      '&[data-length="21"]': {
        '& .imgWrap:nth-child(7), & .imgWrap:nth-child(14), & .imgWrap:nth-child(21)': { borderRightWidth: '0.05em', },
      },
      '&[data-length="22"]': {
        '& .imgWrap:nth-child(8), & .imgWrap:nth-child(16)': { borderRightWidth: '0.05em', },
        '& .imgWrap:nth-child(17), & .imgWrap:nth-child(18), & .imgWrap:nth-child(19), & .imgWrap:nth-child(20), & .imgWrap:nth-child(21), & .imgWrap:nth-child(22)': { marginLeft: '4.5em', },
      },
      '&[data-length="23"]': {
        '& .imgWrap:nth-child(8), & .imgWrap:nth-child(16)': { borderRightWidth: '0.05em', },
        '& .imgWrap:nth-child(17), & .imgWrap:nth-child(18), & .imgWrap:nth-child(19), & .imgWrap:nth-child(20), & .imgWrap:nth-child(21), & .imgWrap:nth-child(22), & .imgWrap:nth-child(23)': { marginLeft: '2.25em', },
      },
      '&[data-length="24"]': {
        '& .imgWrap:nth-child(8), & .imgWrap:nth-child(16), & .imgWrap:nth-child(24)': { borderRightWidth: '0.05em', },
      },
      '&[data-length="25"]': {
        '& .imgWrap:nth-child(19), & .imgWrap:nth-child(20), & .imgWrap:nth-child(21), & .imgWrap:nth-child(22), & .imgWrap:nth-child(23), & .imgWrap:nth-child(24), & .imgWrap:nth-child(25)': { marginLeft: '4em', },
      },
      '&[data-length="26"]': {
        '& .imgWrap:nth-child(19), & .imgWrap:nth-child(20), & .imgWrap:nth-child(21), & .imgWrap:nth-child(22), & .imgWrap:nth-child(23), & .imgWrap:nth-child(24), & .imgWrap:nth-child(25), & .imgWrap:nth-child(26)': { marginLeft: '2em', },
      },
      '&[data-length="27"]': {
        '& .imgWrap:nth-child(27)': { borderRightWidth: '0.05em', },
      },
    },
  },
  // GROUP TEXT
  '& .group-text-after, & .group-text-before, & .group-text-before-logo': {
    overflow: 'hidden',
    fontSize: '95%',
    marginTop: '0.5em',
    width: '100%',
    boxSizing: 'border-box',
    textAlign: 'center',
    '& .container': {
      width: '100%',
      textAlign: 'center',
      '&:first-of-type': {
        '& .element': {
          '& h1, & h2, & p': {
            paddingTop: '0.25em',
          },
        },
      },
      '&:last-of-type': {
        '& .element': {
          '& h1, & h2, & p': {
            paddingBottom: '0.25em',
            marginBottom: '0',
          },
        },
      },
    },
    '& h1': { marginBottom: '0.25em', },
  },
  '& .group-text-before, & .group-text-before-logo': {
    marginTop: '0',
    marginBottom: '0.5em',
  },

},[

  when(
    label(plainText(anyNumber), "group-text-before-logo"),
    logo(once),
    label(plainText(anyNumber), "group-text-before"),
    logoList(),
    label(plainText(anyNumber), "group-text-after"),
  ).score(100),

  when(
    label(plainText(anyNumber), "group-text-before"),
    logoList(),
    label(plainText(anyNumber), "group-text-after"),
  ).score(100),

], {
  scalingSelector: '.group-text-before-logo, .group-text-before, .group-text-after',
});
