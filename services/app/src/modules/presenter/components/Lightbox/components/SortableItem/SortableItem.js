import React from "react";
import Grid from "@material-ui/core/Grid";
import { SortableElement } from 'react-sortable-hoc';
import Breakpoints from "../../../../../../common/util/Breakpoints";
import SlidePanel from "../SlidePanel";
import { ACTIVE_SLIDE_CLASS } from "../../Lightbox";

export const SLIDE_VIEW_CLASS = "slideView";
export const SLIDE_ID_PREFIX = "slide-";

export const SortableItem = SortableElement(({
  slide,
  slideIndex,
  dropZoneProperties,
  slideTransitionClass,
  isActive,
  lightboxClasses,
  cols,
  deckId,
  variant,
  aspect,
  slideClasses,
  branding,
  operations,
  themePackage,
  themeClasses,
  square,
  remixPreviewClasses,
  toolbarClasses,
  metadata,
  readOnly,
  lightboxWidth,
  slideWidth,
  append
}) => {
  const activeClass = isActive ? ACTIVE_SLIDE_CLASS : '';

  return (
    <Grid id={`${SLIDE_ID_PREFIX}${slide.id}`} key={`slide-${slide.id}`} item className={`${activeClass} ${lightboxClasses.slide} ${slideTransitionClass} ${SLIDE_VIEW_CLASS}`} {...Breakpoints.slide(cols)}>
      <SlidePanel
        operations={operations}
        deckId={deckId}
        aspect={aspect}
        slide={slide}
        variant={variant}
        index={slideIndex}
        lightboxClasses={lightboxClasses}
        slideClasses={slideClasses}
        cols={cols}
        themePackage={themePackage}
        themeClasses={themeClasses}
        branding={branding}
        metadata={metadata}
        readOnly={readOnly}
        paletteOverrideClasses={slideClasses}
        square={square}
        remixPreviewClasses={remixPreviewClasses}
        toolbarClasses={toolbarClasses}
        dropZoneProperties={dropZoneProperties}
        lightboxWidth={lightboxWidth}
        width={slideWidth}
      />
      {append && append(slide, slideIndex) || null}
    </Grid>
  );
});
