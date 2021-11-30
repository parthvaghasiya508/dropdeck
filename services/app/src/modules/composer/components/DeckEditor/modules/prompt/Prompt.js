/**
 * A prompt consists of a question and an optional post-processor, that
 * takes the answer to the question for processing.
 */
export class Prompt {
  constructor(question, options = {}) {
    this.options = options;
    const { submit, validate, reject } = options;
    this.question = question;
    this.processor = submit;
    this.validate = validate;
    this.reject = reject;
    this.generateNextPrompt = undefined;
  }

  then(generateNextPrompt) {
    this.generateNextPrompt = generateNextPrompt;
    return this;
  }

  next(value) {
    return this.generateNextPrompt !== undefined && (typeof this.generateNextPrompt === 'function') ? this.generateNextPrompt(value) : undefined;
  }

  submit(value, resolve, reject) {
    if (this.processor) {
      this.processor(value, resolve, reject);
    } else {
      resolve(value);
    }
  }
}

//
// Fluent syntax SDK
//

/**
 * Constructs a new prompt for the given question and optional processor.
 *
 * @param question
 * @param processor
 * @returns {Prompt}
 */
export const prompt = (question, processor) => new Prompt(question, processor);
