import { LOGO_LIST } from "./type";

export const MARK_LOGO_NODE = "logoNode";
export const MARK_LOGO_STATUS = "logoStatus";
export const decorateLogoDomain = () => ([node, path]) => {
  const decorations = [];
  if (node && node.type && node.type === LOGO_LIST) {
    node.children.forEach((liNode, i) => {
      const liPath = path.concat(i);
      liNode.children.forEach((pNode, j) => {
        const pPath = liPath.concat(j);
        if (pNode.children && Array.isArray(pNode.children)) {
          pNode.children.forEach((leafNode, k) => {
            const leafPath = pPath.concat(k);
            const leafValue = leafNode.text;
            decorations.push({
              [MARK_LOGO_NODE]: true,
              [MARK_LOGO_STATUS]: pNode.settings && pNode.settings.logo !== undefined ? pNode.settings.logo.status : undefined,
              anchor: {
                path: leafPath,
                offset: 0
              },
              focus: {
                path: leafPath,
                offset: leafValue ? leafValue.length : 0,
              },
            });
          });
        }
      });
    });
  }
  return decorations;
};
