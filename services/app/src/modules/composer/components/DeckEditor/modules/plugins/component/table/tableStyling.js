export const tableStyling = () => ({
  overflow: 'hidden',
  display: 'flex',
  width: '100%',
  margin: '0',
  padding: '0',
  '& table': {
    margin: '0',
    padding: '0',
    borderCollapse: 'separate',
    borderSpacing: ' 0',
    width: '100%',
    '& thead': {
      display: 'table-header-group',
      verticalAlign: 'middle',
      '& tr': {
        border: '0',
        '& th': {
          border: '0.075em solid',
          borderColor: `rgba(0,0,0,0.1)`,
          borderRightWidth: '0',
          lineHeight: '1.25',
          padding: '0.5em 0.75em',
          fontWeight: 'bold',
          '&:first-child': {
            borderTopLeftRadius: '0em',
          },
          '&:last-child': {
            borderTopRightRadius: '0em',
            borderRightWidth: '0.1em',
          },
        },
      },
    },
    '& tbody': {
      display: 'table-row-group',
      verticalAlign: 'baseline',
      '& tr': {
        border: '0',
        '&:nth-child(even)': {
          background: 'rgba(0,0,0,0.03)',
        },
        '&:last-child td': {
          '&:first-child': {
            borderBottomLeftRadius: '0em',
          },
          '&:last-child': {
            borderBottomRightRadius: '0em',
          },
        },
        '& td': {
          border: '0.075em solid #e8e8e8',
          borderTopWidth: '0',
          borderRightWidth: '0',
          lineHeight: '1.25',
          padding: '0.5em 0.75em',
          '&:last-child': {
            borderRightWidth: '0.1em',
          },
        },
      },
    },
  },
});
