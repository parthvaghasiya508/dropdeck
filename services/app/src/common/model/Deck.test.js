import React from 'react';
import { Deck } from './Deck';

it('create Deck from parameters', () => {
  const cp = new Deck('123', { short: "short" }, 'joe', 'dropdeck', 'My deck', 'Simple', [1, 2, 3]);
});
