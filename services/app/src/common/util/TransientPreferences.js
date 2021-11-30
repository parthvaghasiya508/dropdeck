const buildNamespace = (namespace, key) => `dropdeck.${namespace}${key !== undefined ? `.${key}` : ""}`;

/**
 * Store transient preferences for a user in a cookie.
 * Cookie expires after 30 days.
 *
 * @author stefan
 */
class TransientPreferences {

  /**
   * Create a namespace, default is "transient_preferences".
   *
   * @param namespace
   * @param key
   * @param defaults
   */
  constructor(namespace = "transient_preferences", key, defaults = {}) {
    this.namespace = namespace;
    this.key = key;

    const stored = window.localStorage.getItem(buildNamespace(namespace, key));
    if (stored) {
      this.preferences = JSON.parse(stored);
    } else {
      this.preferences = { ...defaults };
      window.localStorage.setItem(buildNamespace(namespace, key), JSON.stringify(this.preferences));
    }
  }

  /**
   * Set a value in this namespace and persist in the cookie.
   * @param key
   * @param value
   */
  set = (key, value) => {
    this.preferences[key] = value;
    window.localStorage.setItem(buildNamespace(this.namespace, this.key), JSON.stringify(this.preferences));
  }

  /**
   * Get a value from the namespace, or the default value if it doesn't exist.
   *
   * @param key
   * @param defaultValue
   * @param conditions
   * @returns {*}
   */
  get = (key, defaultValue, conditions = {}) => {
    if (conditions && !Object.entries(conditions).every((entry) => this.preferences[entry[0]] === entry[1])) {
      return defaultValue;
    }
    return this.preferences[key] || defaultValue;
  }

  del = (key) => {
    delete this.preferences[key];
    window.localStorage.setItem(buildNamespace(this.namespace, this.key), JSON.stringify(this.preferences));
  }

  dispose = () => {
    window.localStorage.removeItem(buildNamespace(this.namespace, this.key));
  }
}

export { TransientPreferences };
