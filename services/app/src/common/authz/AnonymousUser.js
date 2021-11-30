import Cookies from "js-cookie";

const ANONYMOUS_USER_DECKS = "dropdeck-anonymous-decks";

/**
 * Anonymous User object.
 *
 */
class AnonymousUser {

  constructor() {
    if (Cookies.get(ANONYMOUS_USER_DECKS) === undefined) {
      Cookies.set(ANONYMOUS_USER_DECKS, []);
    }
  }

  getDecks = () => Cookies.getJSON()[ANONYMOUS_USER_DECKS];

}
export default AnonymousUser;
