import React from 'react';

export default ({ img, classes, additionalClass }) => (
  <img
    className={`${classes.image} image-grid-item ${additionalClass}`}
    src={img.urls.small}
    alt=""
  />
);
