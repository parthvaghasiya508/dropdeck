import { Matcher } from "./Matcher";

export class AnyElementMatcher extends Matcher {
  constructor() {
    super('[^\\{\\}]*');
  }
}
