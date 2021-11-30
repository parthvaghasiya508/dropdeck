export const evaluateRules = (slide, rules) => {
  if (rules === undefined) {
    return [0,];
  }
  if (!Array.isArray(rules)) {
    rules = [rules];
  }
  if (rules.length === 0) {
    return [0,];
  }
  let maxScore = 0;
  let maxLabels;
  for (let i = 0; i < rules.length; i++) {
    const [score, labels] = rules[i].evaluate(slide);
    if (score > maxScore) {
      maxScore = score;
      maxLabels = labels;
    }
  }
  return [maxScore, maxLabels];
};
