import Palette from "../../../../../theme/Palette";
import { componentBuilder } from "../../builder/ComponentBuilder";
import { quoteSimpleImageRemix } from "../../../../remix/rules/blockQuotes/quoteSimpleImage/quoteSimpleImage";
import { FROM_UNSPLASH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/components/ImageEditorElement";

export const quoteSimpleTemplate = () => {
  const template = componentBuilder().template({
    name: 'Quotation',
    remix: quoteSimpleImageRemix,
    palette: new Palette("#FF754D", "#FFDFD8", "#373232", "#373232", "#362D2D"), // Acc. BG. H1. H2. P.
  });
  return template
    .image({
      from: FROM_UNSPLASH,
      label: "abstract",
      url: "https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?ixlib=rb-1.2.1",
      links: {
        download_location: "https://api.unsplash.com/photos/5sF6NrB1MEg/download?ixid=MnwxOTEwMjl8MHwxfGFsbHx8fHx8fHx8fDE2MTk3MDAxODY",
      }
    })
    .quote('Understanding the natural world is a source of great curiosity and fulfilment')
    .paragraph('Sir David Attenborough');
};
