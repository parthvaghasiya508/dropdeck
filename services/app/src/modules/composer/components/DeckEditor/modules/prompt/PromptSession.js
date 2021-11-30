const singleton = Symbol('Prompt session singleton pointer');
const singletonEnforcer = Symbol('Prompt session singleton enforcer');

export class PromptSession {

  static Status = {
    OPEN: 'ACTIVE',
    BEING_CONFIGURED: 'BEING_CONFIGURED',
  };

  constructor(enforcer, component, path) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct Singleton');
    }
    const { configuration } = component;
    this.component = component;
    this.prompt = configuration?.workflow;
    this.path = path;
    this.status = PromptSession.Status.OPEN;
  }

  static get instance() {
    return this[singleton];
  }

  /**
   * Starts a new prompt session.
   *
   * @param component
   * @param path
   * @returns {*}
   */
  static start(component, path) {
    const session = new PromptSession(singletonEnforcer, component, path);
    this[singleton] = session;
    return session;
  }

  static reset() {
    this[singleton] = undefined;
  }

  /**
   * Sets the active prompt session.
   *
   * @param session
   */
  static setActive(session) {
    this[singleton] = session;
  }
}
