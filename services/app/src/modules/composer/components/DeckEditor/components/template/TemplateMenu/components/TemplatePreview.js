import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import LightboxSlide from "../../../../../../../presenter/components/Lightbox/components/LightboxSlide";

export const TemplatePreview = ({
  slide,
  template,
  onSelect,
  templateMenuClasses,
  themeClass,
  slideClasses,
  loading = false,
}) => (
  <div
    onClick={() => onSelect(template)}
    key={slide.id}
    tabIndex={0}
    className={templateMenuClasses.wrapper}
    role="button">

    {
      loading && (
        <div className={templateMenuClasses.loadMoreSpinner}>
          <CircularProgress className="icon" color="primary" size={30}/>
        </div>
      )
    }

    <LightboxSlide
      readOnly
      theme={themeClass}
      width={150}
      style={{ borderRadius: 4 }}
      // branding={themeClass.branded && branding}
      className={slideClasses.slideRoot}
      paletteOverrideClasses={slideClasses}
      slide={slide}
      clickable
    />
  </div>
);
