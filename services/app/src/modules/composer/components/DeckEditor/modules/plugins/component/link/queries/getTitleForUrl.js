import axios from "axios";

export const getTitleForUrl = async (url) => {
  axios.get(url, { timeout: 1000 }) // short timeout for this
    .then((res) => res.text()) // parse response's body as text
    .then((body) => parseTitle(body)); // extract <title> from body
};

const parseTitle = (body) => {
  const match = body.match(/<title>([^<]*)<\/title>/); // regular expression to parse contents of the <title> tag
  if (!match || typeof match[1] !== 'string') {
    return;
  }
  return match[1];
};
