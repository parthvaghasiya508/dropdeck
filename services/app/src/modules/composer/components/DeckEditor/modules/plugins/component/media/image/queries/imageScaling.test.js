import { STEP_SIZE, stepRounding } from "./imageScaling";

it('increments size in increments of a fixed step size', () => {
  expect(stepRounding(0)).toEqual(STEP_SIZE);
  expect(stepRounding(STEP_SIZE)).toEqual(STEP_SIZE);
  expect(stepRounding(STEP_SIZE + 1)).toEqual(2 * STEP_SIZE);
});
