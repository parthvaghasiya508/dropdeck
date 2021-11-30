export default class MathUtils {

  /**
   * Ensure the given value is between the min and max bounds. Does not validate that the value is a number.
   *
   * @param value the value to bound.
   * @param min lower bound.
   * @param max upper bound.
   */
  static minMax = (value, min, max) => {
    if (value === undefined || value < min) {
      return min;
    }
    if (value > max) {
      return max;
    }
    return value;
  };

}
