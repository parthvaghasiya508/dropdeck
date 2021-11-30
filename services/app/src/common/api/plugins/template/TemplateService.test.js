import { IMAGE } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/media/image/type";
import TemplateService from "./TemplateService";
import { componentBuilder } from "../builder/ComponentBuilder";
import { slideStructure } from "./transforms/slideStructure";
import { encodeStructure } from "./transforms/encodeStructure";

const templateService = new TemplateService();
templateService.install(() => componentBuilder().template({ name: 'Cover slide' }).title('My slide').image());
templateService.install(() => componentBuilder().template({ name: 'Summary slide' }).title('Summary').bulletList());
templateService.install(() => componentBuilder().template({ name: 'Acknowledgements slide' }).title('Acknowledgements').bulletList()
  .paragraph('Thanks'));

it('finds templates by name', () => {
  const results = templateService.search('cover');
  expect(results).toBeDefined();
  expect(results.length).toEqual(1);
});

it('finds templates by name', () => {
  const results = templateService.search('slide');
  expect(results).toBeDefined();
  expect(results.length).toEqual(3);
});

it('finds templates by structure only', () => {
  const slideWithTitle = componentBuilder().slide().title("My slide").build();
  const results = templateService.search('', encodeStructure(slideStructure(slideWithTitle)));
  expect(results).toBeDefined();
  expect(results.length).toEqual(3);
});

it('finds templates by structure taking into account empty elements', () => {
  const slideWithTitle = componentBuilder().slide().paragraph().title("My slide")
    .build();
  const results = templateService.search('', encodeStructure(slideStructure(slideWithTitle)));
  expect(results).toBeDefined();
  expect(results.length).toEqual(3);
});

it('calculates the right extension of a slide towards a template', () => {
  const results = templateService.search('Cover');
  expect(results).toBeDefined();
  expect(results.length).toEqual(1);

  const { template } = results[0];
  const slideWithTitle = componentBuilder().slide().paragraph().title("My slide")
    .build();
  const extension = template.extendFrom(slideWithTitle);
  expect(extension).toBeDefined();
  expect(extension.length).toEqual(2);
  expect(extension[1].type).toEqual(IMAGE);
});
