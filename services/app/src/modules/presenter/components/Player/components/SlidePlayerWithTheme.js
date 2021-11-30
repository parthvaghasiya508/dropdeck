import Swiper from "react-id-swiper";
import React from "react";
import { SwiperSlide } from 'swiper/react';
import Slide from "../../Slide";
import { remixStyleClassNames } from "../../../queries/buildCombinedSlideStyles";

export const SlidePlayerWithTheme = ({ slideWidth, slides, branding, slideClasses, params, setSwiper, themePackage, aspect }) => {
  const SlideTheme = themePackage.component.wrap;
  const themeClass = themePackage && themePackage.component;
  return (
    <SlideTheme slideWidth={slideWidth}>
      <div className={remixStyleClassNames(slideClasses)} style={{ height: "100%" }}>
        <Swiper getSwiper={setSwiper} {...params}>
          {slides ? slideComponents(slides, themeClass, branding, slideClasses, aspect) : null}
        </Swiper>
      </div>
    </SlideTheme>
  );
};

const slideComponents = (slides, themeClass, branding, slideClasses, aspect) => slides.map((slide, index) => (
  <SwiperSlide key={`slide-wrapper-${slide.id}`} data-hash={index}>
    <Slide
      aspect={aspect}
      key={`slide-${index}`}
      theme={themeClass}
      branding={themeClass.branded && branding}
      slide={slide}
      paletteOverrideClasses={slideClasses}
      className={slideClasses.slideRoot} />
  </SwiperSlide>
));
