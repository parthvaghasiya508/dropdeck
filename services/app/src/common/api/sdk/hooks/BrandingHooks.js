import { useEffect, useState } from "react";
import Dropdeck from "../Dropdeck";

/**
 * Update branding.
 *
 * @returns {[(value: unknown) => void, {deck: *[], error: unknown}]}
 */
const useUpdateBranding = (progress) => {
  const [updateBranding, setUpdateBranding] = useState(undefined);
  const [branding, setBranding] = useState(undefined);
  const [error, setError] = useState(undefined);

  const setUpdate = (id, data) => {
    setUpdateBranding([id, data]);
  };

  useEffect(() => {
    if (updateBranding) {
      Dropdeck.Branding.update(updateBranding[0], updateBranding[1], progress)
        .then((payload) => {
          setBranding(payload.data);
        })
        .catch((e) => setError(e));
    }
  }, [updateBranding]);

  return [setUpdate, {
    branding,
    error
  }];
};
export { useUpdateBranding };
