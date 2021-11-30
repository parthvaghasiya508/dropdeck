import { DeckService } from "./DeckService";
import { config } from "../../config";

const playPathPattern = new RegExp('/([0-9a-zA-z-]+)(/embed)?')
export const playerTransform = async (data, request) => {
  const { path, headers } = request;
  if (path) {
    const match = playPathPattern.exec(path);
    if (match) {
      const id = match[1];
      if (id) {
        const deck = await DeckService.get(id, headers);
        if (deck) {
          return rewrite(data, deck);
        }
      }
    }
  }
  return data;
};

const toTime = (date) => (date ? new Date(date).getTime() : 0);

const rewrite = (data, deck) => {
  const shortId = deck.identifiers.short;
  const title = deck.name;
  const imageUrl = `${config.api.host}/export/decks/${shortId}.jpeg`;
  const oEmbedApiUrl = `${config.api.host}/play/${shortId}/oembed`;
  const url = `${config.app.player.host}/${shortId}`;
  const embedUrl = `${config.app.player.embed.host}/${shortId}/embed`;
  const width = 480;
  const height = 300;

  const standardMetadata = `
<title>${deck.name}</title>
<meta property="og:title" content="${title}" />
<meta property="og:type" content="website" />
<meta property="og:description" content="" />
<meta property="og:site_name" content="Dropdeck" />
<meta property="og:updated_time" content="${toTime(deck.updated)}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${imageUrl}" />
`;

  const twitterMetadata = `
<meta name="twitter:card" content="player" />
<meta name="twitter:site" content="@dropdeck_com" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="" />
<meta name="twitter:image" content="${imageUrl}" />
<meta name="twitter:player" content="${embedUrl}" />
<meta name="twitter:player:width" content="${width}" />
<meta name="twitter:player:height" content="${height}" />
`;

  const oEmbedMetadata = `
<link rel="alternate" type="application/json+oembed" href="${oEmbedApiUrl}" title="${title}" />
`;

  const metadata = `${standardMetadata}${twitterMetadata}${oEmbedMetadata}`;
  return data
    .replace(/<title>.+<\/title>/, metadata)
    .replace(/<script>window\._initData={}<\/script>/, `<script>window._initData=${JSON.stringify({ deck })}</script>`);
};
