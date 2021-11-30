import { SlideTransforms } from "./SlideTransforms";
import { NodeTransforms } from "./NodeTransforms";
import { PathTransforms } from "./PathTransforms";
import { SelectionTransforms } from "./SelectionTransforms";
import { TextTransforms } from "./TextTransforms";
import { SegmentTransforms } from "./SegmentTransforms";
import { ContainerTransforms } from "./ContainerTransforms";

export const EditorTransforms = {
  ...SlideTransforms,
  ...NodeTransforms,
  ...SelectionTransforms,
  ...PathTransforms,
  ...TextTransforms,
  ...SegmentTransforms,
  ...ContainerTransforms,
};
