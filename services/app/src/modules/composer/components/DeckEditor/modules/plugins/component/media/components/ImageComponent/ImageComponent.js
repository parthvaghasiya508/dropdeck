/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useEffect, useRef, useState } from "react";
import useDimensions from "react-cool-dimensions";
import "./ImageComponent.scss";
import { getFocalPoint } from "./queries/getFocalPoint";

export const IMAGE_DROP_TARGET = 'img-drop-target';
export const CLASS_HAS_TRANSFORM = "has-transform";

const getTransformStyles = (focalPoint) => {
  const { x, y } = focalPoint;
  if (x !== undefined && y !== undefined) {
    return { objectPosition: `${x * 100}% ${y * 100}%` };
  }
};

const ImageElement = ({ url, onLoad, onError, label, onMouseOver, onMouseOut, additionalClasses = '', styles = {}, dropTarget = false }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current?.complete) {
      onLoad(undefined, ref.current);
    }
  }, [onLoad]);

  if (url === null) {
    return null;
  }
  if (onMouseOver && onMouseOut) {
    return <img className={`${dropTarget ? IMAGE_DROP_TARGET : ''} ${additionalClasses}`} ref={ref} onLoad={onLoad} onError={onError} src={url} alt={label} onMouseOver={onMouseOver} onMouseOut={onMouseOut} crossOrigin="anonymous" style={styles} />;
  }
  return (<img className={`${dropTarget ? IMAGE_DROP_TARGET : ''} ${additionalClasses}`} ref={ref} onLoad={onLoad} onError={onError} src={url} alt={label} style={styles} />);
};

/**
 * Generic image component used to display images on a slide.
 *
 * @param url
 * @param label
 * @param onReady
 * @param onMouseOver
 * @param onMouseOut
 * @param backgroundColor
 * @returns {*}
 * @constructor
 */
export const ImageComponent = ({
  url,
  label,
  onReady,
  onMouseOver,
  onMouseOut,
  backgroundColor,
  onResize,
  additionalClasses,
  includeTransformWrappers = true,
  dropTarget = false,
  settings = {},
}) => {

  const [state, setState] = useState({
    translateX: 0,
    translateY: 0,
    stretch: 1,
    hasTransformation: false,
    transformStyles: {},
  });

  const measureSize = onResize !== undefined;
  const { ref } = useDimensions(measureSize ? { onResize } : {});
  const resizeRef = measureSize ? ref : () => {};

  useEffect(() => {
    const focalPoint = getFocalPoint(settings);
    const hasTransformation = (focalPoint && (focalPoint.x !== 0.5 || focalPoint.y !== 0.5));
    const hasExistingTransformation = (state.focalPoint && (state.focalPoint.x !== 0.5 || state.focalPoint.y !== 0.5));
    if (hasTransformation || hasExistingTransformation) {
      setState({
        focalPoint,
        hasTransformation,
        transformStyles: getTransformStyles(focalPoint),
      });
    }
  }, [settings?.transform]);

  if (!additionalClasses && state.hasTransformation) {
    additionalClasses = CLASS_HAS_TRANSFORM;
  }

  const imageComponent = (
    <div
      ref={resizeRef}
      className={`imgWrap${backgroundColor && backgroundColor.length > 0 ? " opaqueBg" : ""}`}
      style={{
        backgroundSize: 'cover',
        background: backgroundColor || "inherit",
      }}
    >
      <ImageElement dropTarget={dropTarget} url={url} onLoad={onReady} onError={onReady} label={label} onMouseOver={onMouseOver} onMouseOut={onMouseOut} additionalClasses={additionalClasses} styles={state.transformStyles} />
    </div>
  );

  return includeTransformWrappers ? (
    <div className="image-component">
      <div className="image-component-element">
        { imageComponent }
      </div>
    </div>
  ) : imageComponent;
};
