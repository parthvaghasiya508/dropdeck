import { buildFontUrl, FontProviders, validFont } from "./FontUtility";

it('can check standard fonts', () => {
  expect(validFont("Arial")).toBeTruthy();
  expect(validFont("Architects Daughter")).toBeFalsy();
});

it('can check standard fonts and whatever is coming from font provider', () => {
  const MORE = ["Arbutus", "Arbutus Slab", "Architects Daughter", "Archivo", "Archivo Black", "Archivo Narrow"];
  expect(validFont("Architects Daughter", MORE)).toBeTruthy();
  expect(validFont("Arial", MORE)).toBeTruthy();
});

it('can build a font url for local vs provider fonts', () => {
  expect(buildFontUrl("Arial")).toBeNull();
  expect(buildFontUrl("Arial", FontProviders.Default)).toBeNull();
  expect(buildFontUrl("Syne Mono", "fonts.google.com")).toBe("https://fonts.googleapis.com/css2?family=Syne+Mono:wght@400&display=auto");
  expect(buildFontUrl("Syne Mono", FontProviders.Google, 700, 900)).toBe("https://fonts.googleapis.com/css2?family=Syne+Mono:wght@700;900&display=auto");
});
