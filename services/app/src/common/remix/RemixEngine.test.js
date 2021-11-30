import { RemixEngine } from "./RemixEngine";
import { Remix } from "./Remix";
import { Slide } from "../slide/Slide";
import { when } from "./match/RemixRule";
import { bulletedList, headingOne, headingTwo, image } from "./match/Matchers";
import { anyNumber, exactly } from "./match/expressions/Occurring";

const first = (obj) => obj[Object.keys(obj)[0]];

const create = () => new RemixEngine();

it('do not allow constructor', () => {
  expect(create).toThrow();
});

it('create singleton instance of theme engine', () => {
  const { instance } = RemixEngine;
  expect(instance).toBeDefined();
});

it('can manage and match remixes', () => {
  const { instance } = RemixEngine;

  instance.register(new Remix("remix1", () => ({ backgroundColor: "red" }), when(headingOne(), image())));
  instance.register(new Remix("remix2", () => ({ backgroundColor: "green" }), when(headingOne(), bulletedList())));
  instance.register(new Remix("remix3", () => ({ backgroundColor: "red" }), when(headingOne(), image(exactly(3)))));
  instance.register(new Remix("remix4", () => ({ backgroundColor: "pink" }), when(image(), headingTwo(anyNumber))));
  instance.register(new Remix("remix5", () => ({ backgroundColor: "purple" }), when(image())));

  // Can't register a remix with the same identifier
  const reRegister = () => instance.register(new Remix("remix2", { backgroundColor: "green" }, when(headingOne(), bulletedList())));
  expect(reRegister).toThrow();

  expect(instance.matches([{ type: "heading-one" }, { type: "image" }])[0].name).toBe("remix1");
  expect(instance.matches([{ type: "heading-one" }, { type: "image" }])[0].remix).toBeDefined();
  expect(instance.matches([{ type: "heading-one" }, { type: "image" }])[0].score).toBeGreaterThan(0);
  expect(instance.matches([{ type: "heading-one" }, { type: "image" }, { type: "image" }, { type: "image" }])[0].name).toBe("remix3");
  expect(instance.matches([{ type: "heading-one" }, { type: "numbered-list" }])).toStrictEqual([]);
  expect(instance.matches([{ type: "image" }])[0].name).toBe("remix4");
});

it('can generate CSS payloads for the remixes', () => {
  const { instance } = RemixEngine;

  expect(first(instance.css([new Slide(1, { remix: "remix1" }, [], [{ name: "remix1" }])]).remixStyles)).toStrictEqual({ backgroundColor: 'red' });
  expect(first(instance.css([new Slide(2, { remix: "remix2" }, [], [{ name: "remix2" }])]).remixStyles)).toStrictEqual({ backgroundColor: 'green' });
});
