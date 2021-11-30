import { subject } from "@casl/ability";
import React, { useState } from "react";
import { slideById } from "../../../../composer/components/DeckEditor/modules/plugins/slide/transforms/slideById";
import { generateSlides } from "../../../../../common/slide/SlideFactory";
import { Slide } from "../../../../../common/slide/Slide";
import { useAbility } from "../../../../../common/authz/ability/useAbility";
import Abilities from "../../../../../common/authz/ability/Abilities";
import PlayerContainer from "../../../../presenter/components/Player/PlayerContainer";
import { PinButton } from "./PinButton";
import { DEFAULT_ASPECT_RATIO } from "../../../../../common/model/Deck";
import { ThemeFactory } from "../../../../../common/theme/ThemeFactory";

/**
 * Component that shows a preview player with ability to pin slides.
 *
 * @param content
 * @param theme
 * @returns {*}
 * @constructor
 */
export const PreviewPlayer = ({ deck }) => {

  const { content, theme, coverId } = deck;
  const coverSlideNode = slideById(content, coverId);
  const [coverSlideId, setCoverSlideId] = useState(coverId);
  const [activeSlide, setActiveSlide] = useState(coverSlideNode);
  const [showPin, setShowPin] = useState(false);

  let delay = null;
  const toggleShowPin = (event) => {
    if (delay) clearTimeout(delay);
    if (event.type === "mouseleave") {
      delay = setTimeout(() => setShowPin(false), 1000);
    } else {
      setShowPin(true);
    }
  };

  const onSlideChange = (slide) => {
    setActiveSlide(slide);
  };

  const slides = generateSlides(content, deck._id, Slide.View.DIRECTORY, deck.theme);
  let indexOfCoverSlide;

  if (activeSlide) {
    for (let i = 0; i < slides.length; i++) {
      if (activeSlide.id === slides[i].id) {
        indexOfCoverSlide = i;
        break;
      }
    }
  }

  const ability = useAbility();
  const canEdit = ability.can(Abilities.Actions.EDIT, subject(Abilities.Subjects.DECK, deck));
  return canEdit ? (
    <div style={{ position: "relative", height: "100%" }} onMouseEnter={toggleShowPin} onMouseLeave={toggleShowPin}>
      <PlayerContainer
        animate={false}
        aspect={DEFAULT_ASPECT_RATIO}
        slides={slides}
        themeName={theme || ThemeFactory.DEFAULT_THEME_NAME}
        branding={deck.branding}
        preview
        startSlide={indexOfCoverSlide}
        onSlideChange={onSlideChange}/>
      <div style={{
        display: showPin ? "block" : "none",
        position: "relative",
        top: -42,
        marginBottom: -30,
        textAlign: "right",
        zIndex: 1
      }}>
        <PinButton deck={deck} activeSlide={activeSlide} coverId={coverSlideId} setCoverId={setCoverSlideId} />
      </div>
    </div>
  ) : (
    <div style={{ position: "relative", height: "100%" }}>
      <PlayerContainer
        animate={false}
        aspect={deck.aspect}
        slides={slides}
        themeName={theme || ThemeFactory.DEFAULT_THEME_NAME}
        branding={deck.branding}
        preview
        startSlide={indexOfCoverSlide}
        onSlideChange={onSlideChange}/>
    </div>
  );
};
