import { createContext, useContext } from 'react';

/**
 * A React context for sharing the currently highlighted editor element.
 */
export const HighlightedPathContext = createContext(null);

/**
 * Get the path of the currently highlighted editor element from the React context.
 */
export const useHighlightedPath = () => useContext(HighlightedPathContext);
