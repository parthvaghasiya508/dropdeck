/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from "react";
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import SortableItem from "../SortableItem";
import TutorialHelper from "../TutorialHelper";
import { LightboxDropZone } from "../LightboxDropZone/LightboxDropZone";
import { slideTransitionClass } from './transforms/slideTransitionClass';
import { remixStyleClassNames } from "../../../../queries/buildCombinedSlideStyles";

export const SortableList = SortableContainer(({
  slides,
  deckId,
  activeSlide,
  lightboxClasses,
  cols,
  showTutorial,
  variant,
  aspect,
  slideClasses,
  operations,
  branding,
  themePackage,
  themeClasses,
  square,
  remixPreviewClasses,
  toolbarClasses,
  metadata,
  readOnly,
  focusOnClick,
  dropZoneProperties,
  uploadProgress,
  lightboxWidth,
  slideWidth,
  append,
  droppedInside,
  setDroppedInside,
}) => {
  const { noOfFiles, isDragActive, dropZoneIndex, dropZonePosition, dropZoneInLightBox } = dropZoneProperties;

  return (
    <Grid container className={remixStyleClassNames(slideClasses)}>
      {slides.map((slide, index) => {
        let transitionClass = '';
        let selectWidgetPosition = '';
        if (dropZoneIndex !== -1) {
          const slideTransitionClasses = slideTransitionClass(dropZoneIndex, cols, slides, dropZonePosition, index);
          transitionClass = slideTransitionClasses.slideTransitionClass;
          selectWidgetPosition = slideTransitionClasses.selectWidgetPosition;
        }

        if (!isDragActive && !droppedInside) {
          transitionClass = '';
          selectWidgetPosition = '';
        }

        if (dropZoneIndex === index) {
          const lastPosition = dropZoneInLightBox || ((dropZoneIndex === slides.length - 1) && ((slides.length - 1) % cols !== 0));

          if (!isDragActive && !droppedInside) {
            return null;
          }

          return (
            <React.Fragment key="dropZone">
              {
                selectWidgetPosition === 'left' && (
                  <Box flexBasis="100%" height={0} marginRight="160px" />
                )
              }
              <LightboxDropZone
                lightboxClasses={lightboxClasses}
                cols={cols}
                aspect={aspect}
                index={index}
                slideValue={slides[dropZoneIndex - 1]}
                onWidgetDrop={operations.onWidgetDrop}
                noOfFiles={noOfFiles}
                selectWidgetPosition={selectWidgetPosition}
                dropZoneProperties={dropZoneProperties}
                lastPosition={lastPosition}
                slideLength={slides.length}
                uploadProgress={uploadProgress}
                droppedInside={droppedInside}
                setDroppedInside={setDroppedInside}
              />
            </React.Fragment>
          );
        }
        return (
          <SortableItem
            key={`sortable-${slide.id}`}
            index={index}
            slideIndex={index}
            slide={slide}
            isActive={activeSlide !== undefined && activeSlide === slide.id}
            lightboxClasses={lightboxClasses}
            cols={cols}
            deckId={deckId}
            variant={variant}
            aspect={aspect}
            slideClasses={slideClasses}
            themePackage={themePackage}
            themeClasses={themeClasses}
            square={square}
            remixPreviewClasses={remixPreviewClasses}
            metadata={metadata}
            readOnly={readOnly}
            toolbarClasses={toolbarClasses}
            dropZoneProperties={dropZoneProperties}
            slideTransitionClass={transitionClass}
            operations={operations}
            lightboxWidth={lightboxWidth}
            slideWidth={slideWidth}
            branding={branding}
            append={append}
          />
        );
      })}
      {(!readOnly && showTutorial) ? <TutorialHelper show={showTutorial} cols={cols} /> : null}
    </Grid>
  );
});
