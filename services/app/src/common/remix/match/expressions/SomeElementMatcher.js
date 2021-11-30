import { Matcher } from "./Matcher";

export class SomeElementMatcher extends Matcher {
  constructor() {
    super('[^\\{\\}]+');
  }
}
