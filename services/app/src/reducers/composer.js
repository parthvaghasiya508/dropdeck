import {
  ACTION_CHANGE_DECK_NAME, ACTION_SET_ASPECT_RATIO, ACTION_SET_PERMISSIONS,
  ACTION_SET_PRESENTATION,
  ACTION_SET_SLIDES,
  ACTION_SET_THEME, ACTION_SET_WORKFLOW_STEP,
} from "../actions/presentation";
import { ACTION_SET_ACTIVE_SLIDE } from "../actions/editor";

export const composerReducer = (state = { deck: null }, action) => {
  const { presentation } = state;
  switch (action.type) {
    case ACTION_SET_PRESENTATION:
      return {
        presentation: action.presentation.toDataObject(),
        slides: state.slides,
        activeSlide: state.activeSlide,
      };
    case ACTION_SET_SLIDES:
      return {
        presentation: state.presentation,
        slides: action.slides,
        activeSlide: state.activeSlide,
      };
    case ACTION_SET_THEME:
      presentation.theme = action.theme;
      if (action.branding) {
        presentation.branding = action.branding;
      }
      return {
        presentation,
        slides: state.slides,
        activeSlide: state.activeSlide,
      };
    case ACTION_SET_ACTIVE_SLIDE:
      return {
        presentation: state.presentation,
        slides: state.slides,
        activeSlide: action.slideId,
      };
    case ACTION_CHANGE_DECK_NAME:
      presentation.name = action.deckName;
      return {
        presentation,
        slides: state.slides,
        activeSlide: state.slideId,
      };
    case ACTION_SET_PERMISSIONS:
      presentation.permissions = action.permissions;
      return {
        presentation,
        slides: state.slides,
        activeSlide: state.slideId
      };
    case ACTION_SET_ASPECT_RATIO:
      presentation.aspect = action.aspect;
      return {
        presentation,
        slides: state.slides,
        activeSlide: state.slideId
      };
    case ACTION_SET_WORKFLOW_STEP:
      presentation.settings.workflow = { step: action.step };
      return {
        presentation,
        slides: state.slides,
        activeSlide: state.slideId
      };
    default:
      return state;
  }
};
