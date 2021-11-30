// Clusters
export const clustersPanelFixedImageOverride = () => ({
  '& .sequence .cluster': {
    '& .cluster': {
      background: `none !important`,
      border: `none !important`,
    },
    '& .container': {
      '& p': {
        textAlign: 'center !important',
      },
    },
    '& .container-block-quote': {
      '& blockquote': {
        width: '100% !important',
        '& p': {
          textAlign: 'center !important',
        },
      },
    },
  }
});
