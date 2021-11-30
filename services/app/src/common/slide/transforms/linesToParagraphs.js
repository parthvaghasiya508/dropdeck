import React from 'react';

export const linesToParagraphs = (text) => {
  const terms = text.split('\n');
  return terms.map((s, index) => (
    index < terms.length - 1 ?
      <React.Fragment key={index}>{s}<br/></React.Fragment> :
      <React.Fragment key={index}>{s}</React.Fragment>));
};
