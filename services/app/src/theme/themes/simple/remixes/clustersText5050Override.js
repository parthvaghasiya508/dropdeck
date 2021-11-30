// maintain smaller h2 size inside this remix
export const clustersText5050Override = () => ({
  '& .cluster .container.container-block-quote blockquote': {
    width: '100% !important',
  },
  '& .container.container-heading-one, & .container.container-heading-two': {
    '& h1': {
      fontSize: '2.55em',
      margin: '0 0 0.2em 0', 
    },
    '& h2': { margin: '0 0 0.4em 0', },
  },
  // all images
  '& .container.container-image': {
    margin: '0 0 1em 0',
    borderRadius: '0.25em',
  },
});
