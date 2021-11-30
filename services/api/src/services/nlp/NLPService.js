import retext from "retext";
import vfile from "vfile";
import pos from "retext-pos";
import keywords from "retext-keywords";
import sentiment from "retext-sentiment";
import toString from "nlcst-to-string";

export const NLPService = {

  analyze: async (text) => {
    const response = {
      keywords: [],
      keyphrases: [],
      sentiment: undefined
    };

    const file = vfile(text);
    const processor = retext()
      .use(pos)
      .use(sentiment)
      .use(keywords);

    const tree = processor.parse(file);
    processor.run(tree, file);

    response.sentiment = tree.data;
    file.data.keywords.forEach((keyword) => response.keywords.push({ word: toString(keyword.matches[0].node), score: keyword.score }));
    file.data.keyphrases.forEach((phrase) => response.keyphrases.push({ phrase: phrase.matches[0].nodes.map((v) => toString(v)).join(''), score: phrase.score }));

    return Promise.resolve(response);
  }
};
