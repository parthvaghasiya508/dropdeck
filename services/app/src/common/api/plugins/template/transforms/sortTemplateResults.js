const compareTemplates = (position) => (a, b) => {
  const rankingA = a.ranking(position);
  const rankingB = b.ranking(position);
  if (rankingA > rankingB) {
    return -1;
  }
  if (rankingA < rankingB) {
    return 1;
  }
  return 0;
};

export const sortTemplateResults = (matchingTemplates, position) => matchingTemplates.sort(compareTemplates(position));
