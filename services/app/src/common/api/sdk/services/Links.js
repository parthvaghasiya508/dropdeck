import Dropdeck from "../Dropdeck";

export default class LinkService {

  static resource = "scrape";

  static scrape = (url) => Dropdeck.services.get(
    `${this.resource}/`,
    { url },
  )
    .then((response) => response.data)

  static getHeaders = (url) => Dropdeck.services.get(
    `${this.resource}/headers`,
    { url },
  )
    .then((response) => response.data)
}
