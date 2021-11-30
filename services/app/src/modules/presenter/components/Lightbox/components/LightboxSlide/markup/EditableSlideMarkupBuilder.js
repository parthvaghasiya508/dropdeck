import React from 'react';
import SlideMarkupBuilder from "../../../../Slide/builder/SlideMarkupBuilder";
import { DraggableSlideComponent } from "../components/DraggableSlideComponent";

const settingsFor = (path, editor) => (editor !== undefined ? editor.settings(path) : undefined);

const draggableElement = (onDrop, remix, editor) => (type, path, element) => (
  <DraggableSlideComponent remix={remix} onDrop={onDrop} type={type} path={path}>
    {Array.isArray(element) ? element : React.cloneElement(element, { editor, editable: true, settingsEditor: settingsFor(path, editor), remix })}
  </DraggableSlideComponent>
);

export default class EditableSlideMarkupBuilder extends SlideMarkupBuilder {
  constructor(onDrop, remix, editor) {
    super(draggableElement(onDrop, remix, editor));
  }
}
