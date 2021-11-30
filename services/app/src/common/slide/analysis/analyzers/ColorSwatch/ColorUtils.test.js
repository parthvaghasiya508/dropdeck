import React from "react";
import {
  chooseByContrast,
  contrast,
  darken,
  hsv,
  lighten,
  luminance,
  maxContrast,
  removeSimilar,
  similarity,
  sortByLuminance,
  sortByPunch,
  ugly
} from "./ColorUtils";

it('get hsv for color', () => {
  expect(hsv("#7E5109").h)
    .toBeCloseTo(36.92);
  expect(hsv("#7E5109").s)
    .toBeCloseTo(0.928);
  expect(hsv("#7E5109").v)
    .toBeCloseTo(0.49);
});

it('can guess if colour is brown', () => {
  expect(ugly("#873600"))
    .toBeTruthy();
  expect(ugly("#b9770e"))
    .toBeTruthy();
  expect(ugly("#9A7D0A"))
    .toBeTruthy();
  expect(ugly("#186A3B"))
    .toBeFalsy();
});

it('calculate the perceived luminance of a colour', () => {
  expect(luminance("#000"))
    .toStrictEqual(0);
  expect(luminance("#fff"))
    .toStrictEqual(1);
  expect(luminance("#FF0000"))
    .toBeCloseTo(0.2126, 2);
});

it('sort a list of colours by luminance', () => {
  expect(sortByLuminance("#000", "#aaa", "#333", "#fff", "#111",))
    .toStrictEqual(["#000", "#111", "#333", "#aaa", "#fff"]);
});

it('sort a list of colours by how punchy they are', () => {
  expect(sortByPunch("#527e7f", "#7fcce8", "#ccbeac"))
    .toStrictEqual(["#7fcce8", "#527e7f", "#ccbeac"]);

  expect(sortByPunch("#b63f35", "#2f252b", "#dee7e2", "#c59265", "#bfa6a7"))
    .toStrictEqual(["#b63f35", "#c59265", "#2f252b", "#bfa6a7", "#dee7e2"]);

  expect(sortByPunch("#d3c5ba", "#5b4939"))
    .toStrictEqual(["#5b4939", "#d3c5ba"]);
});

it('calculate contrast value between two colours', () => {
  expect(contrast("#000", "#fff"))
    .toStrictEqual(21);
  expect(contrast("#000", "#FF0000"))
    .toBeCloseTo(5.25, 1);
});

it('get color with maximum contrast to base', () => {
  expect(maxContrast("#000", "#222", "#fff", "#333"))
    .toStrictEqual("#fff");
  expect(maxContrast("#fff", "#222", "#fff", "#333"))
    .toStrictEqual("#222");
});

it('choose a light vs dark color for a given base', () => {
  expect(chooseByContrast("#c97219", "#fff", "#000", 5))
    .toStrictEqual("#000");
  expect(chooseByContrast("#84bce4", "#fff", "#000", 2))
    .toStrictEqual("#fff");

  expect(chooseByContrast("#f2d7e0",
    darken("#f2d7e0", 2), "#000", 2))
    .toStrictEqual("#8f777f");
});

it('can calculate similarity between colors', () => {
  expect(similarity("#fff", "#000"))
    .toBeCloseTo(0.710);
  expect(similarity("#000", "#eee"))
    .toBeCloseTo(0.607);
  expect(similarity("#eee", "#aaa"))
    .toBeCloseTo(0.322);
});

it('can remove similar colors', () => {
  expect(removeSimilar(0.1, "#fff", "#aaa", "#a1a1a1", "#a5a5a5", "#bbb", "#eee", "#000"))
    .toStrictEqual(["#fff", "#a1a1a1", "#eee", "#000"]);
});

it('can darken and lighten colors', () => {
  expect(darken("#bbb", 2))
    .toStrictEqual("#5e5e5e");
  expect(darken("#c97219", 3))
    .toStrictEqual("#3d0000");
  expect(lighten("#84bce4", 1.9))
    .toStrictEqual("#e6ffff");
});
