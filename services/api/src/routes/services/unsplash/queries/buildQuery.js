/**
 * Construct a short search for Unsplash based on an NLP report.
 *
 * @param nlpAnalysis
 */
export const buildQuery = (nlpAnalysis) => {
  if (nlpAnalysis) {
    const { keyphrases, keywords } = nlpAnalysis;
    if (keywords) {
      let keywordsFiltered = keywords.filter(({ score }) => score === 1);
      if (keywordsFiltered.length > 2) {
        keywordsFiltered = keywordsFiltered.slice(0, 2);
      }
      if (keywordsFiltered.length > 0) {
        return keywordsFiltered.map(({ word }) => word).join(' ');
      }
    }
    if (keyphrases && keyphrases.length > 0) {
      return keyphrases[0].phrase;
    }
  }
};
