import axios from "axios";
import { decode } from 'html-entities';

const metaTagRegex = new RegExp(/<meta( [^>]*)?>/gi);
const keyValueRegex = new RegExp(/([a-zA-Z0-9\:\-_]+)="([^"]+)"/gi);
const parseMetaTags = (body) => {
  let matches;
  const metadata = {};
  while (matches = metaTagRegex.exec(body)) {
    const [tag] = matches;
    if (tag && tag !== null) {
      let keyValueMatches;
      let key;
      let value;
      while (keyValueMatches = keyValueRegex.exec(tag)) {
        const [,keyParam,valueParam] = keyValueMatches;
        if (keyParam === "name" || keyParam === "property") {
          key = valueParam;
        } else if (keyParam === "content") {
          value = valueParam;
        }
      }
      if (key && value) {
        metadata[key] = value;
      }
    }

  }
  return metadata;
};

const isHtml = (headers) => headers && headers['content-type'] && headers['content-type'].indexOf('text/html') >= 0;

export const ScrapeService = {
  getMetadata: (url) => axios.get(url, { timeout: 1000 }) // short timeout for this
    .then((res) => (res && isHtml(res.headers) ? res.data : undefined)) // parse response's body as text
    .then((body) => body && parseMetaTags(body)) // extract <meta> tags from body
    .then((metadata) => {
      if (!metadata) {
        return;
      }
      const meta = (...keys) => {
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (metadata[key] !== undefined) {
            return decode(metadata[key]);
          }
        }
      };
      return {
        title: meta("og:title", "twitter:title", "title"),
        description: meta("og:description", "twitter:description", "description"),
        image: meta("og:image", "twitter:image", "twitter:image:src"),
        twitterHandle: meta("twitter:creator"),
        site: meta("og:site_name"),
      };
    }),
  getHeaders: (url) => axios.head(url, { timeout: 1000 })
    .then((res) => {
      const { headers } = res;
      // We can do any sanitization and reconstruction of headers here.
      return headers;
    })
};
