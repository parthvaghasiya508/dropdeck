import { Node } from "slate";
import { EditorTransforms } from "../../../../../services/transforms/EditorTransforms";
import Logos from "../../../../../../../../../common/api/sdk/services/Logos";
import { LOGO_LIST } from "./type";
import { logoToUse } from "../logo/configuration/logoConfigurationBuilder";

export const onKeyDownLogoList = (event, editor) => {
  if (event.key === 'Enter') {
    const [element,] = EditorTransforms.containerAncestor(editor);
    if (element && element.type && element.type === LOGO_LIST) {
      const node = EditorTransforms.activeNode(editor);
      if (node) {
        const domain = Node.string(node).trim();
        if (domain.length > 0) {
          const path = EditorTransforms.activeElementPath(editor);
          editor.settings(path).set('logo', {
            status: "processing",
          });
          Logos.get(domain)
            .then((payload) => {
              const logo = logoToUse(payload.data);
              const allColors = payload.data?.colors || {}; // only store the "featured" colours
              const { accent, light, dark } = allColors;
              if (logo && logo.url) {
                editor.settings(path).set('logo', {
                  ...logo,
                  colors: { accent, light, dark },
                  status: "found",
                });
              } else {
                editor.settings(path).set('logo', {
                  status: "not-found",
                });
              }
            })
            .catch((e) => {
              editor.settings(path).set('logo', {
                status: "not-found",
              });
            });
        }
      }
    }
  }
};
