import React from "react";
import uuid from "react-uuid";

/**
 * Display a particular ColorSwatch.
 *
 * @param settingsForSlide
 * @param swatch
 * @returns {*}
 * @constructor
 */
const ColorSwatchComponent = ({ settingsForSlide, swatch }) => {

  const swatchToUse = swatch || settingsForSlide.ColorSwatchAnalyzer.canonical; // TODO this needs to be rewritten

  const palette = () => {
    const colors = swatchToUse.map((component) => component.color);
    return colors.map((c) => (
      <div key={uuid()} style={{
        display: "inline-block",
        height: 10,
        width: 10,
        marginRight: 2,
        backgroundColor: c
      }}/>
    ));
  };

  return (
    <div style={{ top: 2, position: "relative", display: "inline-block" }}>
      {palette()}
    </div>
  );
};
export default ColorSwatchComponent;
