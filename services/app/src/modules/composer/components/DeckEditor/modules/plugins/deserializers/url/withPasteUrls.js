import React from 'react';
import { SelectionTransforms } from "../../../../services/transforms/SelectionTransforms";
import { isURL } from "./transforms/isUrl";
import { logger } from "../../../../../../../../common/util/logger";
import { processUrlPaste } from "./processUrlPaste";
import { hasActivePrompt } from "../../../prompt/transforms/hasActivePrompt";
import { UrlSmartPasteComponent } from "./components/UrlSmartPasteComponent";
import LinkService from "../../../../../../../../common/api/sdk/services/Links";

export const withPasteUrls = (plugins, setPasteHandler) => (editor) => {
  const { insertData } = editor;

  editor.insertData = async (data) => {

    const [targetNode, targetPath] = SelectionTransforms.componentElement(editor);

    // If active prompt session then we just insert plain text.
    const { promptSession } = editor;
    if (promptSession && promptSession !== null) {
      if (hasActivePrompt(targetNode, targetPath, promptSession)) {
        logger.debug(`Active prompt session - don't parse clipboard`);
        insertData(data);
        return;
      }
    }

    const url = data.getData('text/plain');
    if (url) {
      const validUrl = isURL(url);
      if (validUrl) {

        const urlContentType = await LinkService.getHeaders(url)
          .then((headers) => headers['content-type']);

        const setPasteComponent = (component) => {
          setPasteHandler({
            component,
            data: {
              url,
              contentType: urlContentType
            },
            targetRange: editor.selection,
          });
        };
        if (processUrlPaste(plugins)(url, urlContentType ,setPasteComponent)) {
          return; // success
        }

        // We didn't find a specific plugin to process the URL, so we try to scrape the link.
        // Only, if the content type is text/html.
        // const mimeType = new MimeTypes(urlContentType);
        setPasteComponent(UrlSmartPasteComponent);

      }
    }
    insertData(data);
  };

  return editor;
};
