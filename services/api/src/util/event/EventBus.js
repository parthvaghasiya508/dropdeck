export default class EventBus {

  constructor() {
    EventBus.__singleton = this;
    this.listeners = [];
  }

  register(listener) {
    this.listeners.push(listener);
  }

  notify(message) {
    this.listeners.forEach((notifyListener) => notifyListener(message));
  }

  static instance() {
    return EventBus.__singleton === undefined ? new EventBus() : EventBus.__singleton;
  }

}

export const eventBus = () => EventBus.instance();
