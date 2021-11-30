import { componentBuilder } from "../../builder/ComponentBuilder";
import { DataProvider } from "../DataProvider";
import { coverSimpleRemix } from "../../../../remix/rules/covers/coverSimple/coverSimple";
import { TemplateRanking } from "../TemplateRanking";

export const coverSlideTemplate = () => (dataProvider = new DataProvider()) => {
  let template = componentBuilder().template({
    name: 'Cover slide',
    remix: coverSimpleRemix,
    ranking: (position) => ((position === 0) ? TemplateRanking.HIGHEST : TemplateRanking.LOW),
  });
  if (dataProvider.profile.picture) {
    template = template.image(dataProvider.profile.picture);
  }
  if (dataProvider.profile.company?.branding) {
    // Waiting on https://github.com/dropdeck-com/dropdeck/issues/2594
    // template = template.logo(dataProvider.profile.company?.branding);
  }
  template = template
    .subtitle(dataProvider.profile.fullName || 'Insert your name here!')
    .title('My Presentation')
    .paragraph(dataProvider.profile.email || 'your@email.com?')
    .bulletList(new Date().toLocaleDateString(), dataProvider.profile?.company?.name || "Employer Name");

  return template;
};
