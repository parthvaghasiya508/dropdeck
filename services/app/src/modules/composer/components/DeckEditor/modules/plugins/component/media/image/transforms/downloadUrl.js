import { config } from "../../../../../../../../../../config";

export const downloadUrl = (deckId, fileName) => `${config.api.host}/assets/${deckId}/${fileName}`;
