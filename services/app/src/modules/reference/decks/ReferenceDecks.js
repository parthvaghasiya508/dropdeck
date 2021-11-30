import { tutorialDeck } from "./tutorial/tutorialDeck";

export default class ReferenceDecks {

  constructor() {
    ReferenceDecks.__singleton = this;
    this.deckMap = {
      tutorial: readOnly(tutorialDeck()),
    };
  }

  decks = () => Object.values(this.deckMap);

  get = (id) => this.deckMap[id];

  static instance() {
    return ReferenceDecks.__singleton === undefined ? new ReferenceDecks() : ReferenceDecks.__singleton;
  }
}

const readOnly = (deck) => {
  deck.readOnly = true;
  deck.isReference = true;
  deck.owner = {
    givenName: 'Dropdeck team',
    familyName: '',
  };
  return deck;
};
