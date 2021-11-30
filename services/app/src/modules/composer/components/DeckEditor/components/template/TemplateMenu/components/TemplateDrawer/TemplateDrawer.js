import React from "react";
import GenericButton from "../../../../../../../../../common/components/buttons/GenericButton";
import { TemplatePreview } from "../TemplatePreview";
import Section from "../../../../../../../../../common/components/popup/Section";
import { remixStyleClassNames } from "../../../../../../../../presenter/queries/buildCombinedSlideStyles";

export const TemplateDrawer = ({
  theme,
  hasMore,
  slideTemplates,
  loading,
  themeClasses,
  themeClass,
  templateMenuClasses,
  slideClasses,
  SlideTheme,
  onSelect,
  openModal,
}) => {

  const padding = "10px 0px 10px 0px";
  const border = `1px solid ${theme.dark() ? "rgba(29,29,31,0.95)" : "rgba(0, 0, 0, 0.05)"}`; //
  const backgroundColor = theme.dark() ? "rgba(0,0,0,0.45)" : "rgb(186 188 191 / 15%)"; //
  const boxShadow = theme.dark() ? "inset 0px 1px 3px 0px rgb(0 0 0 / 25%), 0px 1px 0px 0px rgb(255 255 255 / 8%)" : "rgb(0 0 0 / 6%) 0px 1px 2px inset, rgb(255 255 255 / 50%) 0px 1px 0px, rgb(255 255 255 / 50%) 0px -1px 0px";

  return (
    <Section override={{ padding, border, backgroundColor, boxShadow, overflow: "hidden" }}>
      <div className={templateMenuClasses.root}>
        <div className={templateMenuClasses.leftFade}> </div>
        <div className={`${remixStyleClassNames(slideClasses)} ${templateMenuClasses.container}`}>
          <SlideTheme classes={themeClasses}>
            {slideTemplates.map(({
              slide,
              template,
              dynamic
            }) => (
              <TemplatePreview
                key={template.id}
                template={template}
                slide={slide}
                templateMenuClasses={templateMenuClasses}
                slideClasses={slideClasses}
                onSelect={onSelect}
                loading={loading && dynamic}
                themeClass={themeClass}
              />
            ))}
          </SlideTheme>
        </div>
        {
          hasMore && (
            <div className={templateMenuClasses.moreButton}>
              <GenericButton primary size="small" onClick={openModal}>
                More
              </GenericButton>
            </div>
          )
        }
      </div>
    </Section>
  );
};
