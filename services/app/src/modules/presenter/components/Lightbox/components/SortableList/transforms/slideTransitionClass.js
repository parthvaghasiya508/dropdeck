export const slideTransitionClass = (dropZoneIndex, cols, slides, dropZonePosition, index) => {
    
  let slideTransitionClass = '';
  let selectWidgetPosition = '';
  if (dropZoneIndex !== -1) {
    if (cols === 1) {
      if (index < dropZoneIndex) {
        slideTransitionClass = 'selectwidget-top';
      } else if (index > dropZoneIndex) {
        slideTransitionClass = 'selectwidget-bottom';
      }
    } else if (cols === 2) {
      if (slides.length - 1 === dropZoneIndex && ((slides.length - 1) % cols !== 0)) {
        slideTransitionClass = 'selectwidget-last';
        selectWidgetPosition = 'last';
      } else if (dropZonePosition % 3 === 0) {
        if (index > dropZoneIndex && index <= dropZoneIndex + 2) {
          slideTransitionClass = 'selectwidget-right-2x';
        }
        selectWidgetPosition = 'left';
      } else if (dropZonePosition % 3 === 1) {
        if (index === dropZoneIndex - 1) {
          slideTransitionClass = 'selectwidget-left';
        } else if (index === dropZoneIndex + 1) {
          slideTransitionClass = 'selectwidget-right';
        }
        selectWidgetPosition = 'between';
      } else if (dropZonePosition % 3 === 2) {
        if (index < dropZoneIndex && index >= dropZoneIndex - 2) {
          slideTransitionClass = 'selectwidget-left-2x';
        }
        selectWidgetPosition = 'right';
      }
    } else if (cols === 3) {
      if (slides.length - 1 === dropZoneIndex && ((slides.length - 1) % cols !== 0)) {
        slideTransitionClass = 'selectwidget-last';
        selectWidgetPosition = 'last';
      } else if (dropZonePosition % 4 === 0) {
        if (index > dropZoneIndex && index <= dropZoneIndex + 3) {
          slideTransitionClass = 'selectwidget-right-2x';
        }
        selectWidgetPosition = 'left';
      } else if (dropZonePosition % 4 === 1) {
        if (index === dropZoneIndex - 1) {
          slideTransitionClass = 'selectwidget-left';
        } else if (index === dropZoneIndex + 1 || index === dropZoneIndex + 2) {
          slideTransitionClass = 'selectwidget-right';
        }
        selectWidgetPosition = 'between';
      } else if (dropZonePosition % 4 === 2) {
        if (index === dropZoneIndex - 2 || index === dropZoneIndex - 1) {
          slideTransitionClass = 'selectwidget-left';
        } else if (index === dropZoneIndex + 1) {
          slideTransitionClass = 'selectwidget-right';
        }
        selectWidgetPosition = 'between';
      } else if (dropZonePosition % 4 === 3) {
        if (index < dropZoneIndex && index >= dropZoneIndex - 3) {
          slideTransitionClass = 'selectwidget-left-2x';
        }
        selectWidgetPosition = 'right';
      }
    }
  }
  return { slideTransitionClass, selectWidgetPosition };
};
