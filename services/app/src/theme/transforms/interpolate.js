import chroma from 'chroma-js';

export const interpolate = (rangeRaw, n = 10) => {
  const range = [];
  for (let i = 0; i < rangeRaw.length; i++) {
    if (rangeRaw[i] !== undefined) {
      range.push(rangeRaw[i]);
    }
  }
  try {
    return range.length > 1 ? chroma.bezier(range).scale().correctLightness().colors(n) : chroma.scale(range).correctLightness().colors(n);
  } catch (e) {
    return chroma.brewer.Blues;
  }
};
