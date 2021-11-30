import { createContext, useContext } from 'react';

/**
 * A React context for sharing the active prompt session object.
 */
export const PromptSessionContext = createContext(null);

/**
 * Get the current prompt session object from the React context.
 */
export const usePromptSession = () => useContext(PromptSessionContext);
