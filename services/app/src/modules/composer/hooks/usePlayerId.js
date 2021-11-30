import { createContext, useContext } from 'react';

/**
 * A React context for sharing an ID of a slide player instance.
 */
export const PlayerContext = createContext(null);

/**
 * Retrieve the current Player instance ID.
 */
export const usePlayerId = () => useContext(PlayerContext);
