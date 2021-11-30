/**
 * Handling of initial data for server-side rendering.
 */
export default class InitData {

  static get = (key) => (window._initData ? window._initData[key] : undefined);

}
