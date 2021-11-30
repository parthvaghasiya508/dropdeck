export const ACTION_SET_PRESENTATION = 'SET_PRESENTATION';
export const ACTION_SET_SLIDES = 'SET_SLIDES';
export const ACTION_SET_THEME = 'SET_THEME';
export const ACTION_CHANGE_DECK_NAME = 'UPDATE_DECK_NAME';
export const ACTION_SET_PERMISSIONS = 'SET_PERMISSIONS';
export const ACTION_SET_ASPECT_RATIO = 'ACTION_SET_ASPECT_RATIO';
export const ACTION_SET_WORKFLOW_STEP = 'ACTION_SET_WORKFLOW_STEP';

/**
 * Action to dispatch updated slides to all components.
 *
 * @param slides
 * @returns {{deck: *, type: string}}
 */
export function setSlides(slides) {
  return {
    type: ACTION_SET_SLIDES,
    slides
  };
}

/**
 * Action to dispatch an updated presentation to all components.
 *
 * @param deck
 * @returns {{deck: *, type: string}}
 */
export function setPresentation(presentation) {
  return {
    type: ACTION_SET_PRESENTATION,
    presentation,
  };
}

/**
 * Dispatch a new theme selection.
 *
 * @param name
 * @returns {{name: *, type: string}}
 */
export function setTheme(name, branding) {
  return {
    type: ACTION_SET_THEME,
    theme: name,
    branding
  };
}

/**
 * Trigger name change.
 *
 * @param deckName
 * @param implicitNameUpdate whether or not the new name was derived implicitly from the user typing in content.
 * @returns {{deckName: *, type: string}}
 */
export function setDeckName(deckName) {
  return {
    type: ACTION_CHANGE_DECK_NAME,
    deckName,
  };
}

/**
 * Set permissions for a deck.
 *
 * @param permissions
 * @returns {{permissions: *, type: string}}
 */
export function setPermissions(permissions) {
  return {
    type: ACTION_SET_PERMISSIONS,
    permissions
  };
}

/**
 * Set aspect ratio as a string definition.
 *
 * @param aspect
 * @returns {{aspect: *, type: string}}
 */
export function setAspectRatio(aspect) {
  return {
    type: ACTION_SET_ASPECT_RATIO,
    aspect
  };
}

/**
 * Set the workflow step.
 *
 * @param step
 * @returns {{step: *, type: string}}
 */
export function setWorkflowStep(step) {
  return {
    type: ACTION_SET_WORKFLOW_STEP,
    step
  };
}
