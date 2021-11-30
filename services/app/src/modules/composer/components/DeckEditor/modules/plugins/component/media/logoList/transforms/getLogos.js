export const getLogos = (node) => {
  const logos = [];
  node.children.forEach((liNode) => {
    liNode.children.forEach((pNode) => {
      const logo = pNode.settings ? pNode.settings.logo : undefined;
      if (logo && logo.url) {
        logos.push({ url: logo.url, whiteOnTransparent: logo.whiteOnTransparent, bgColor: logo.bgColor, colors: logo.colors });
      }
    });
  });
  return logos;
};
