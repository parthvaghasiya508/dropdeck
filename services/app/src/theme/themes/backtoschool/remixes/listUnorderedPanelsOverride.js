// haphazard effect on list items
export const listUnorderedPanelsOverride = () => ({
  '& ul li, & ol li': {
    background: 'rgba(255,255,255,0.7) !important',
    '&:nth-child(1)': { transform: 'rotateZ(0.5deg)', },
    '&:nth-child(2)': { transform: 'rotateZ(-0.5deg)', },
    '&:nth-child(3)': { transform: 'rotateZ(1deg)', },
    '&:nth-child(4)': { transform: 'rotateZ(-0.75deg)', },
    '&:nth-child(5)': { transform: 'rotateZ(0.5deg)', },
    '&:nth-child(6)': { transform: 'rotateZ(-0.75deg)', },
    '&:nth-child(7)': { transform: 'rotateZ(-1deg)', },
    '&:nth-child(8)': { transform: 'rotateZ(0.5deg)', },
  },
});
