import { NLPService } from "./NLPService";

it('can extract keywords, phrases and sentiment from text', async () => {
  const response = await NLPService.analyze("Peppa Pig is a babe.");
  expect(response).toStrictEqual({
    keywords: [
      {
        word: 'Peppa',
        score: 1
      },
      {
        word: 'Pig',
        score: 1
      },
      {
        word: 'babe',
        score: 1
      }
    ],
    keyphrases: [{
      phrase: 'Peppa Pig',
      score: 1
    }],
    sentiment: {
      polarity: 0,
      valence: 'neutral'
    }
  });
});
