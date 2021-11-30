import { test } from "../../util/TestUtils.js";
import { nlpRoutes } from "./nlpRoutes.js";

const route = test.Route(nlpRoutes);

describe('NLP Service', () => {
  it('can analyse text for keywords, phrases and sentiment', (done) => {
    route.post('/services/nlp/keywords')
      .send({ text: "Peppa Pig is a babe." })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
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
      }, done);
  });
});
