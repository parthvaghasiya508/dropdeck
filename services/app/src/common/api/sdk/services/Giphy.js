import Dropdeck from "../Dropdeck";

export default class Giphy {

  static resource = "giphy";

  static search = async (query, page, perPage) => Dropdeck.services.get(
    `${this.resource}/search`,
    { keyword: query, page, perPage },
  );

}
