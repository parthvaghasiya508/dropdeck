import { ThemeFactory } from "./ThemeFactory";

const create = () => new ThemeFactory();

it('do not allow constructor', () => {
  expect(create).toThrow();
});

it('create singleton instance of theme engine', () => {
  const { instance } = ThemeFactory;
  expect(instance).toBeDefined();
});

it('can load themes', () => {
  const { instance } = ThemeFactory;
  expect(instance.get("Midnight")).toBeDefined();
  expect(instance.get("Midnight").static).toBeTruthy();
});
