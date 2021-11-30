export const getSlide = (deck, slideId) => {
  if (!deck || !deck.content || deck.content.length === 0) {
    return undefined;
  }
  for (let i = 0; i < deck.content.length; i++) {
    const node = deck.content[i];
    if (node.id && node.id === slideId) {
      return node;
    }
  }
  return undefined;
};
