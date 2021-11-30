import { createContext, useContext } from 'react';

/**
 * A React context for sharing the current deck ID.
 */
export const DeckIdContext = createContext(null);

/**
 * Retrieve the current deck ID.
 */
export const useDeckId = () => useContext(DeckIdContext);
