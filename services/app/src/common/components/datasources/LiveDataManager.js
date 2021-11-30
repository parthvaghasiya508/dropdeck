import Dropdeck from "../../api/sdk/Dropdeck";
import { logger } from "../../util/logger";

const singleton = Symbol('Live Data engine singleton pointer');
const singletonEnforcer = Symbol('Live Data engine singleton enforcer');

/**
 * Manage data sources and live data instances.
 *
 */
class LiveDataManager {

  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct Singleton');
    }
    this.liveData = {};
  }

  isInUse = (id) => this.liveData[id] !== undefined && Object.keys(this.liveData[id]).length > 0;

  use = (dataSource, path) => {
    const { _id: id } = dataSource;
    if (this.liveData[id] === undefined) {
      this.liveData[id] = {};
    }
    // eslint-disable-next-line prefer-destructuring
    this.liveData[id][path[0]] = path[1];
  }

  consume = (id) => Dropdeck.api.get(`datasources/use/${id}`).then((payload) => Promise.resolve(payload.data));

  dataSources = async () => Dropdeck.api.get("datasources").then((payload) => Promise.resolve(payload.data));

  delete = async (id) => Dropdeck.api.delete(`datasources/${id}`).then((payload) => Promise.resolve(payload.data));

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new LiveDataManager(singletonEnforcer);
    }

    return this[singleton];
  }
}
export default LiveDataManager;

export class Data {

  constructor({ dataSource, path, properties, cache, date = Date.now() }) {
    this.dataSource = dataSource;
    this.path = path;
    this.properties = properties;
    this.cache = cache;
    this.date = date;

    this.fetch().catch((e) => logger.error(e));
  }

  fetch = async () => {
    await LiveDataManager.instance.consume(this.dataSource._id).then((data) => {
      let member = data;
      this.properties.path.forEach((p) => {
        member = member[p];
      });
      this.cache = member;
      this.date = Date.now();
      logger.debug(this);
    });
  }
}
