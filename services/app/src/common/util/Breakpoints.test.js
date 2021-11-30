import Breakpoints from "./Breakpoints";

it('supports outputting correct spreads', () => {
  expect(Breakpoints.editor()).toStrictEqual({ xs: 12, sm: 8, md: 7, lg: 5, xl: 4 });
  expect(Breakpoints.preview()).toStrictEqual({ xs: 12, sm: 4, md: 5, lg: 7, xl: 8 });
  expect(Breakpoints.slide()).toStrictEqual({ xs: 12, sm: 12, md: 12, lg: 6, xl: 4 });
});

it('supports outputting correct spreads when preview is off', () => {
  expect(Breakpoints.editor(false)).toStrictEqual({ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 });
});

it('supports telling us how many cols we can have', () => {
  expect(Breakpoints.maxCols("lg")).toBe(2);
  expect(Breakpoints.maxCols("xl")).toBe(3);
  expect(Breakpoints.maxCols("xs")).toBe(1);
});

it('supports specifying how many cols and adjusting slide breakpoints', () => {
  expect(Breakpoints.slide()).toStrictEqual({ xs: 12, sm: 12, md: 12, lg: 6, xl: 4 });
  expect(Breakpoints.slide(2)).toStrictEqual({ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 });
});
