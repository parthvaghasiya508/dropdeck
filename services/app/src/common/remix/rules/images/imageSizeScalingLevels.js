/**
 * Sets minimum image height, after which the text will scale down. This will vary based on the scaling threshold.
 */
export const imageSizeScalingLevels = () => ({
  '&.scaling-none': {
    '& .grid-container .container-image': { minHeight: '15em', },
  },
  '&.scaling-1, &.scaling-2, &.scaling-3, &.scaling-4, &.scaling-5': {
    '& .grid-container .container-image': { height: '16em' },
    '& .grid-container .container-logo .imgWrap': { maxWidth: '35%' },
  },
  '&.scaling-6, &.scaling-7, &.scaling-8, &.scaling-9, &.scaling-10': {
    '& .grid-container .container-image': { height: '17em' },
    '& .grid-container .container-logo .imgWrap': { maxWidth: '30%' },
  },
  '&.scaling-11, &.scaling-12, &.scaling-13, &.scaling-14, &.scaling-15': {
    '& .grid-container .container-image': { height: '18em' },
    '& .grid-container .container-logo .imgWrap': { maxWidth: '25%' },
  },
  '&.scaling-16, &.scaling-17, &.scaling-18, &.scaling-19, &.scaling-20': {
    '& .grid-container .container-image': { height: '19em' },
    '& .grid-container .container-logo .imgWrap': { maxWidth: '20%' },
  },
  '&.scaling-max': {
    '& .grid-container .container-image': { height: '20em' },
    '& .grid-container .container-logo .imgWrap': { maxWidth: '20%' },
  },
});
