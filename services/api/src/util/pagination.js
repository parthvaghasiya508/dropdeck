/* eslint-disable eqeqeq */

export const getLimitSkip = (page, columnCount) => {
  let limit = Math.max(columnCount * 3, 5);
  let skip = limit * (page - 1) - 1;

  if (page == 1) {
    limit -= 1;
    skip = 0;
  }

  return { limit, skip };
};
