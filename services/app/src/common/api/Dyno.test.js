import { Dyno } from "./Dyno";

it('create instance of Dyno and add properties that are allowed', () => {
  const pairs = {};

  new Dyno([["tRex", "t-rex"],"diplodocus", "velociraptor"], (obj, prop, value) => {
    pairs[prop] = value;
  }).tRex().diplodocus().velociraptor(4);

  expect(pairs)
    .toStrictEqual({
      "t-rex": undefined,
      diplodocus: undefined,
      velociraptor: 4
    });
});

it('throw error if property is not allowed', () => {
  const func = () => new Dyno(["diplodocus", "velociraptor"], () => {}).microraptor();

  expect(func)
    .toThrow();
});

it('should allow me to overwrite handler', () => {

  const pairs = {};

  class Rebel extends Dyno {
    constructor() {
      super(["diplodocus", "velociraptor"], (obj, prop, value) => {
        pairs[prop] = value;
      });
    }

    velociraptor = (count) => {
      pairs.velociraptor = count * 10;
      return this;
    }
  }

  new Rebel().velociraptor(4).diplodocus();

  expect(pairs)
    .toStrictEqual({
      velociraptor: 40,
      diplodocus: undefined
    });
});
