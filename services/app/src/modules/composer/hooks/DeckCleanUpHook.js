import { useEffect } from "react";
import { apiHost } from "../../../App";
import { verifyDeckCover } from "../transforms/verifyDeckCover";

const useBeforeUnload = (handler, ...deps) => {
  useEffect(() => {
    window.addEventListener("beforeunload", handler);
    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, [...deps]);
};

/**
 * Delete decks that have not been saved.
 *
 * @param shouldCleanUp
 * @param id
 */
const useCleanUp = (presentation, content, shouldCleanUp) => {
  useBeforeUnload(() => {
    if (shouldCleanUp) {
      const payload = {
        coverId: verifyDeckCover(presentation, content).coverId,
        content
      };
      const headers = { type: "application/json" };
      const blob = new Blob([JSON.stringify(payload)], headers);
      navigator.sendBeacon(`${apiHost()}/decks/${presentation.id}/exit`, blob);
    }
  }, shouldCleanUp);
};
export { useBeforeUnload, useCleanUp };
