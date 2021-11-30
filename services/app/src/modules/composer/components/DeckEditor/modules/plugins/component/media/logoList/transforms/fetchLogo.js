import { apiHost } from "../../../../../../../../../../App";
import { logger } from "../../../../../../../../../../common/util/logger";

export const fetchLogo = (domain) => {
  const serviceUrl = `${apiHost()}/services/logo/${encodeURI(domain)}`;
  return fetch(serviceUrl, { credentials: 'include' })
    .then((res) => res.json())
    .then(
      (result) => ((result && result.logo) ? result.logo.image : null),
      (error) => { logger.error(error); }
    );
};
