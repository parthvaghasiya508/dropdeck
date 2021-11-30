import { Deck } from '../../common/model/Deck';
import ReferenceDecks from "../reference/decks/ReferenceDecks";
import Dropdeck from "../../common/api/sdk/Dropdeck";
import InitData from "../InitData";
import { logger } from "../../common/util/logger";

const KEY = "deck";

export default class PlayModule {
  static load = (id, isReference) => {
    if (InitData.get(KEY)) {
      logger.debug(`Read data object for deck ${id} from window._initData`);
      return new Promise((resolve) => {
        const payload = InitData.get(KEY);
        resolve(Deck.fromDataObject(payload));
      });
    }
    if (isReference) {
      return new Promise((resolve, reject) => {
        const deck = ReferenceDecks.instance().get(id);
        if (deck) {
          resolve(deck);
        } else {
          reject(Error("Not found"));
        }
      });
    }
    return Dropdeck.Decks.play(id)
      .then((payload) => Deck.fromDataObject(payload.data));
  };

}
