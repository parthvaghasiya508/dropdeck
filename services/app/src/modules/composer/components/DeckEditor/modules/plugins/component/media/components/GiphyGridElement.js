/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import React from 'react';

export default ({ img, classes, additionalClass }) => (
  <img
    className={`${classes.image} image-grid-item ${additionalClass}`}
    src={img.images['480w_still'].url}
    onMouseOver={(e) => { e.currentTarget.src = img.images.downsized.url; }}
    onMouseOut={(e) => { e.currentTarget.src = img.images['480w_still'].url; }}
    alt=""
  />
);
