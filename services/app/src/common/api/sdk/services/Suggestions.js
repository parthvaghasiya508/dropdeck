import Dropdeck from "../Dropdeck";

export default class Suggestions {

  static resource = "nlp";

  static forSlide = async (query, perPage) => Dropdeck.services.get(
    `${this.resource}/suggest`,
    { keyword: query, perPage },
  );
}
