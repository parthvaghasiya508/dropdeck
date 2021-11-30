import { createEditor, Editor, Node } from "slate";
import { withSlides } from "./withSlides";
import { withSettings } from "../settings/withSettings";
import { PARAGRAPH } from "../component/paragraph/type";
import { componentBuilder } from "../../../../../../../common/api/plugins/builder/ComponentBuilder";

it('retrieves a slide', () => {
  const editor = withSlides(withSettings(createEditor()));

  // Ensure the deck is not empty.
  const slide = componentBuilder().slide().paragraph().build();
  Editor.insertNode(editor, slide);

  editor.splitSlide();
  const index = editor.children.length - 1;
  const path = [index];
  const node = Node.get(editor, path);
  expect(editor.slide(index)).toEqual(node);

});

it('does not inherit of the slide being split', () => {
  const editor = withSlides(withSettings(createEditor()));

  // Ensure the deck is not empty.
  Editor.insertNode(editor, componentBuilder().slide().paragraph().build());

  editor.splitSlide();
  const index = editor.children.length - 1;
  const path = [index];
  const node = Node.get(editor, path);
  expect(editor.slide(index))
    .toEqual(node);
  expect(node.children.length)
    .toEqual(1);
  expect(node.children[0].type)
    .toEqual(PARAGRAPH);

});
