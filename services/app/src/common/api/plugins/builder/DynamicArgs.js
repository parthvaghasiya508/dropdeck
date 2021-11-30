export class DynamicArgs {

  constructor(evaluator, ...defaultArgs) {
    this.evaluator = evaluator;
    this.defaultArgs = defaultArgs;
  }

  /**
   * Provide arguments based on existing slide content.
   */
  evaluate() {
    if (this.evaluator) {
      return this.evaluator().then((result) => result || this.defaultArgs);
    }
    return new Promise((resolve) => resolve(this.defaultArgs));
  }
}
