import { logger } from "./logger";

const singleton = Symbol('SignalSensor singleton pointer');
const singletonEnforcer = Symbol('SignalSensor singleton enforcer');

export class SignalSensor {

  static Types = {
    MeasureSlideUserTime: "measure-slide-user-time"
  }

  constructor(enforcer, eventHandler = () => {}) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct Singleton');
    }
    this.init();
    this.eventHandler = eventHandler;
  }

  init() {
    this._metrics = {
      aggregate: {},
      data: {

      }
    };
    return this;
  }

  flush() {
    this.close();
    // TODO Transmit metrics to server
    return Object.values(this._metrics.aggregate);
    // this.init();
  }

  time(id, isVisible = true, metadata) {
    if (isVisible) {
      this._metrics.data[id] = {
        start: Number(Date.now()),
        end: () => {
          if (this._metrics.data[id].end) {
            this._metrics.data[id].end = Number(Date.now());
            const lastMeasure = this._metrics.aggregate[id]?.time || 0;
            this._metrics.aggregate[id] = {
              id,
              time: lastMeasure + Math.floor((this._metrics.data[id].end - this._metrics.data[id].start) / 1000),
              ...metadata,
            };
            this.eventHandler(this._metrics.aggregate[id]);
            logger.debug(`Measured ${this._metrics.aggregate[id].time} sec. on slide [${id}]`);
            delete this._metrics.data[id];
          }
        }
      };
    }

    return this._metrics.data[id];
  }

  async close() {
    if (this._metrics.data) {
      const timers = Object.keys(this._metrics.data);
      if (timers.length > 0) {
        timers.forEach((timerId) => {
          if (this._metrics.data[timerId] && this._metrics.data[timerId].end) {
            this._metrics.data[timerId].end();
          }
        });
      }
    }
  }

  auto(id, isVisible, metadata) {
    // TODO if visibility changes we should stop timer and only start again if visibility changes to true!
    // In auto, you only want to close a timing session if you get a new id, otherwise it's calling potentially for same slide twice
    if (isVisible && this._metrics.data[id]) return null;
    this.close();
    return this.time(id, isVisible, metadata);
  }

  static instance(eventHandler) {
    if (!this[singleton]) {
      this[singleton] = new SignalSensor(singletonEnforcer, eventHandler);
    }

    return this[singleton];
  }
}
