import Dropdeck from "../Dropdeck";

/**
 * Methods for handling branding.
 *
 * @type {Dropdeck.Decks}
 */
export default class Logos {

  static resource = "branding/logo";

  static get = async (domain) => Dropdeck.services.get(
    `${this.resource}/${encodeURIComponent(domain)}`,
    {},
  );
}
