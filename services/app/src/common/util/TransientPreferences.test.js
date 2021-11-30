import { TransientPreferences } from "./TransientPreferences";

it('can set and get values', () => {
  const prefs = new TransientPreferences("test");
  prefs.set("foo", "bar");
  expect(prefs.get("foo")).toEqual("bar");
  expect(prefs.get("tip", "tap")).toEqual("tap");
});

it('can instantiate with default values', () => {
  const prefs = new TransientPreferences("test", "defaults", { height: 12, width: 6 });
  expect(prefs.get("height")).toEqual(12);
  expect(prefs.get("width")).toEqual(6);
  expect(prefs.get("tip", "tap")).toEqual("tap");
});

it('supports conditional expression for getting values', () => {
  const prefs = new TransientPreferences("test", "defaultsAndConditions", { height: 12, width: 6 });
  expect(prefs.get("height")).toEqual(12);
  expect(prefs.get("height", 1, { width: 5 })).toEqual(1);
  expect(prefs.get("height", 1, { width: 6 })).toEqual(12);
});

it('can handle existing values and persist in cookie', () => {
  window.localStorage.setItem("dropdeck.test.subjects", JSON.stringify({ zip: "zap" }));
  const prefs = new TransientPreferences("test", "subjects");
  prefs.set("foo", "bar");
  expect(prefs.get("zip")).toEqual("zap");
  expect(prefs.get("foo")).toEqual("bar");

  expect(JSON.parse(window.localStorage.getItem("dropdeck.test.subjects")).foo).toEqual("bar");

  prefs.del("foo");
  expect(prefs.get("foo")).toBeUndefined();
  expect(JSON.parse(window.localStorage.getItem("dropdeck.test.subjects")).foo).toBeUndefined();

  prefs.dispose();
  expect(window.localStorage.getItem("dropdeck.test.subjects")).toBeNull();
});
