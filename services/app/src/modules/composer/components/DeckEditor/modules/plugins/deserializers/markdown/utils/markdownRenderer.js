const paragraphPattern = new RegExp(/^<p>(.*)<\/p>$/is);
const listPattern = new RegExp(/(.*)<ul>(.*)<\/ul>(.*)/is);
/**
 * Custom rendering of Markdown to HTML to align with our document structure.
 */
export const markdownRenderer = {
  paragraph(text) {
    return `<p>${text}</p>`;
  },

  blockquote(text) {
    const match = paragraphPattern.exec(text);
    let quote = text;
    if (match) {
      // eslint-disable-next-line prefer-destructuring
      quote = match[1];
    }
    return `<blockquote>${quote}</blockquote>\n`;
  },

  listitem(text) {
    if (text) {
      const match = text.match(listPattern);

      if (match) {
        const list = match[2];
        let textContent = match[1];

        if (paragraphPattern.test(textContent)) {
          // eslint-disable-next-line prefer-destructuring
          textContent = textContent.match(paragraphPattern)[1];
        }

        return `<li><p>${textContent}</p><ul>${list}</ul></li>\n`;
      }
    }

    return text && paragraphPattern.test(text) ? `<li>${text}</li>\n` : `<li><p>${text}</p></li>\n`;
  }
};
