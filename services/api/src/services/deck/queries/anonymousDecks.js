import Cookies from "cookies";

export const ANONYMOUS_USER_DECKS_COOKIE = "dropdeck-anonymous-decks";

export const setAnonymousDecks = (res, decks = []) => {
  if (!Array.isArray(decks)) {
    decks = [decks];
  }
  res.cookie(ANONYMOUS_USER_DECKS_COOKIE, JSON.stringify(decks));
};

export const clearAnonymousDecks = (res) => {
  res.clearCookie(ANONYMOUS_USER_DECKS_COOKIE);
};

export const getAnonymousDecks = (req, res) => {
  const cookies = new Cookies(req, res);
  if (cookies.get(ANONYMOUS_USER_DECKS_COOKIE) !== undefined) {
    const anonymousDecks = JSON.parse(decodeURIComponent(cookies.get(ANONYMOUS_USER_DECKS_COOKIE)));
    return anonymousDecks || [];
  }
  return [];
};

export const removeClaimedDeckFromAnonymous = (id, req, res) => {
  const decks = getAnonymousDecks(req, res);
  if (decks && Array.isArray(decks) && decks.length > 0) {
    setAnonymousDecks(res, decks.filter((el) => el.localeCompare(id) !== 0));
  }
};
