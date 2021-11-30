import { colorSpec } from "./colorSpec";

it('determines if a color is colourful', () => {
  const colorfulnessThreshold = 10;
  expect(colorSpec('#fff').colorfulness).toBeLessThan(colorfulnessThreshold);
  expect(colorSpec('#000').colorfulness).toBeLessThan(colorfulnessThreshold);
  expect(colorSpec('#ddd').colorfulness).toBeLessThan(colorfulnessThreshold);
  expect(colorSpec('#dd9').colorfulness).toBeGreaterThan(colorfulnessThreshold);
  expect(colorSpec('#bf9f72').colorfulness).toBeGreaterThan(colorfulnessThreshold);
  expect(colorSpec('#4f7d95').colorfulness).toBeGreaterThan(colorfulnessThreshold);
});

it('determines if a color is light or dark', () => {
  const lightnessThreshold = 75;
  const darknessThreshold = 25;
  expect(colorSpec('#fff').brightness).toBeGreaterThan(lightnessThreshold);
  expect(colorSpec('#000').brightness).toBeLessThan(darknessThreshold);
});
