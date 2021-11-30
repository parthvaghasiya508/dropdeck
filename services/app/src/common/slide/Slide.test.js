import React from 'react';
import { Slide } from "./Slide";
import { chooseRemix } from "./transforms/chooseRemix";

const remixes = [
  {
    name: 'r1',
  },
  {
    name: 'r2',
  },
  {
    name: 'r3',
  },
];

it('automatically applies the highest ranked remix to a slide', () => {
  const slide = new Slide(1, {});
  slide.matchingRemixes = remixes;
  expect(chooseRemix(slide)).toEqual('r1');
});

it('creates a shallow clone of another slide', () => {
  const slide = new Slide(1, {});
  slide.node = { type: 'x' };
  slide.matchingRemixes = remixes;
  expect(Slide.shallowClone(slide)).toEqual(slide);
});
