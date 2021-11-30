import axios from "axios";
import { apiHost } from "../../../../../../../../../../App";
import { logger } from "../../../../../../../../../../common/util/logger";
import { FROM_UPLOAD } from "./insertImage";
import { browserExtractImageColorsWorker } from "../../../../../../../../../../common/slide/analysis/analyzers/ColorSwatch/BrowserExtractImageColors.worker";
import { downloadUrl } from "./downloadUrl";

export const uploadFiles = (
  deckId,
  files,
  {
    process,
    processMany,
    onSuccess = () => {},
    onError = () => {},
    clearTimeout = () => {},
    progress = () => {}
  },
) => {
  const data = new FormData();
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    data.append("files", file);
  }
  axios.post(`${apiHost()}/decks/${deckId}/files`, data,
    {
      withCredentials: true,
      onUploadProgress: (data) => {
        const value = Math.round((100 * data.loaded) / data.total);
        progress(value);
        logger.debug(`Upload progress: ${value}%`);
      }
    }).then((response) => {
    const fileResults = response.data ? response.data : data;
    if (processMany) {
      Promise.all(fileResults.map(async (file) => {
        const { name } = file;
        const fullUrl = downloadUrl(deckId, name);
        return {
          name,
          from: FROM_UPLOAD,
          swatch: await browserExtractImageColorsWorker(fullUrl, false),
        };
      }))
        .then((fileElements) => {
          processMany(fileElements);
          progress(0);
          onSuccess();
        });
    } else if (process) {
      Promise.all(fileResults.map(async (file) => {
        const { name } = file;
        const fullUrl = downloadUrl(deckId, name);
        return {
          name,
          from: FROM_UPLOAD,
          swatch: await browserExtractImageColorsWorker(fullUrl, false),
        };
      }))
        .then((fileElements) => {
          fileElements.forEach(({ name, url, from, swatch }) => {
            process(url, name, { from, swatch });
          });
          progress(0);
          onSuccess();
        });
    }

    setTimeout(() => {
      clearTimeout();
    }, 2000);

  })
    .catch((e) => {
      logger.error(`Error when uploading file:`);
      logger.error(e);
      onError();
      setTimeout(() => {
        clearTimeout();
      }, 2000);
    });
};
