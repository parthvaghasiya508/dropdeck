import { createContext, useContext } from 'react';

/**
 * A React context for sharing suggestions menu controls.
 */
export const EditorOperationsContext = createContext({});

/**
 * Get a setter for the current editor operations.
 */
export const useEditorOperations = () => useContext(EditorOperationsContext);
