import Dropdeck from "../Dropdeck";

export default class Unsplash {

  static resource = "unsplash";

  static search = async (query, page, perPage) => Dropdeck.services.get(
    `${this.resource}/search`,
    { keyword: query, page, perPage },
  );

  static trackDownload = async (urls) => Dropdeck.services.post(
    `${this.resource}/track`,
    { urls }
  );
}
