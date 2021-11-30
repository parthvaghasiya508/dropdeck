/**
 * Monitor multiple element load status.
 * Everything is tracked by identifier passed into `watch(id)` function.
 *
 */
export class ProgressTracker {

  constructor(onReady, onProgress) {
    this.elements = {};
    this.onReady = onReady;
    this.onProgress = onProgress;
  }

  static DUMMY = { watch: () => {} };

  /**
   * Are all watchers ready.
   *
   * @returns {boolean}
   */
  ready = () => this.state().every((el) => el === true);

  state = () => Object.values(this.elements);

  /**
   * Progress as a number between 0 and 100.
   *
   * @returns {number}
   */
  progress = () => {
    const values = this.state();
    return (values.filter((el) => el === true).length / values.length).toFixed(2) * 100;
  };

  /**
   * Add a new element to watch.
   *
   * @param id
   * @param callback
   * @returns {function(...[*]=)}
   */
  watch = (id, callback) => {
    if (this.elements[id] === undefined) {
      this.elements[id] = false;
      return () => {
        if (this.elements[id] === false) {
          this.elements[id] = true;

          // Handle progress callback
          if (this.onProgress) {
            this.onProgress(this.progress());
          }

          // Check if everything is done
          if (this.onReady !== undefined && this.ready()) {
            this.onReady();
          }

          // If a watch callback was provided call it with the current id.
          if (callback !== undefined) {
            callback(id);
          }
        }
      };
    }
    return () => {};
  }
}
