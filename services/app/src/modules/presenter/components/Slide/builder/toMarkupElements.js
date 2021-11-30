import React from "react";
import SlideMarkupBuilder from "./SlideMarkupBuilder";

const markupBuilder = new SlideMarkupBuilder();

/**
 * Transform a list of markup nodes to JSX elements.
 *
 * @param nodes
 * @param hasContainer
 * @returns {[]}
 */
export const toMarkupElements = (slide, onClick) => markupBuilder.build(slide, onClick);
