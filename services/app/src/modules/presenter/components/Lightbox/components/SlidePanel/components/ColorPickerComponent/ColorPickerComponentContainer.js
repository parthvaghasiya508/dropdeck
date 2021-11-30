import React from "react";
import { logger } from "../../../../../../../../common/util/logger";
import ColorPickerComponent from "./ColorPickerComponent";

class ColorPickerComponentContainer extends React.Component {

  /**
   * Don't re-render the color picker if the palette changes, to avoid interfering with the user interaction.
   *
   * @param nextProps new properties.
   * @param nextState new state (ignored).
   * @param nextContext new context (ignored).
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const thisPalette = this.props.palette;
    const nextPalette = nextProps.palette;
    const paletteChanged = (thisPalette === undefined && nextPalette !== undefined) || (thisPalette.id() !== nextPalette.id());

    const thisColors = this.props.colors;
    const nextColors = nextProps.colors;
    const colorsChanged = (thisColors === undefined && nextColors !== undefined) || (thisColors.join("-") !== nextColors.join("-"));

    const thisComponent = this.props.component;
    const nextComponent = nextProps.component;
    const componentChanged = thisComponent === undefined && nextComponent !== undefined;

    const shouldUpdate = paletteChanged || componentChanged || colorsChanged;

    if (shouldUpdate) {
      logger.debug(`Updating ColorPickerComponent`);
    } else {
      logger.debug(`Not updating ColorPickerComponent`);
    }

    return shouldUpdate;
  }

  render() {
    return (<ColorPickerComponent {...this.props}/>);
  }

}
export default ColorPickerComponentContainer;
