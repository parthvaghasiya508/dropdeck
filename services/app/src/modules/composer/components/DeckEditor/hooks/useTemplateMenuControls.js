import { createContext, useContext } from 'react';

/**
 * A React context for sharing controls for toggling context menu.
 */
export const TemplateMenuContext = createContext(null);

/**
 * Get a setter for toggling the template menu on or off.
 */
export const useTemplateMenuControls = () => useContext(TemplateMenuContext);
