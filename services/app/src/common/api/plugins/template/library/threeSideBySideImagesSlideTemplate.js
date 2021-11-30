import { clustersFullPanelRemix } from "../../../../remix/rules/clusters/clustersFullPanel/clustersFullPanel";
import Palette from "../../../../../theme/Palette";
import { componentBuilder } from "../../builder/ComponentBuilder";
import { FROM_UNSPLASH } from "../../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/components/ImageEditorElement";

const builder = componentBuilder();
export const threeSideBySideTemplate = () => builder
  .template({
    name: 'Side by Side',
    remix: clustersFullPanelRemix,
    palette: new Palette("#fff", "#1B2232", "#fff", "#fff", "#fff"),
  })
  .collection(
    builder.group()
      .image({
        from: FROM_UNSPLASH,
        label: "earth",
        url: "https://images.unsplash.com/photo-1564504125115-7cb56fbd03f9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1",
        links: {
          download_location: "https://api.unsplash.com/photos/6gNOfdeyH1Q/download?ixid=MnwxOTEwMjl8MHwxfGFsbHx8fHx8fHx8fDE2MTk2OTk1ODM",
        },
      })
      .title("Earth")
      .paragraph("Le Monde")
      .paragraph("Die Erde")
      .paragraph("La Tierra")
      .build(),

    builder.group()
      .image({
        from: FROM_UNSPLASH,
        label: "wind",
        url: "https://images.unsplash.com/photo-1500491460312-c32fc2dbc751?ixlib=rb-1.2.1",
        links: {
          download_location: "https://api.unsplash.com/photos/7Oq9r2CiTLg/download?ixid=MnwxOTEwMjl8MHwxfGFsbHx8fHx8fHx8fDE2MTk2OTk3NTk",
        }
      })
      .title("Wind")
      .paragraph("Le Vent")
      .paragraph("Der Wind")
      .paragraph("El Viento")
      .build(),

    builder.group()
      .image({
        from: FROM_UNSPLASH,
        label: "fire",
        url: "https://images.unsplash.com/photo-1506368153642-f361edca71a1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1",
        links: {
          download_location: "https://api.unsplash.com/photos/lZFVzfcjqKA/download?ixid=MnwxOTEwMjl8MHwxfGFsbHx8fHx8fHx8fDE2MTk3MDAxMzE",
        },
      })
      .title("Fire")
      .paragraph("Le Feu")
      .paragraph("Das Feuer")
      .paragraph("El Fuego")
      .build(),
  );
