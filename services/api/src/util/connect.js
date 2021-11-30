import promiseRetry from 'promise-retry';
import mongoose from 'mongoose';
import 'saslprep';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  reconnectTries: 60,
  reconnectInterval: 1000,
  poolSize: 10,
  bufferMaxEntries: 0, // If not connected, return errors immediately rather than waiting for reconnect
};

const promiseRetryOptions = {
  retries: options.reconnectTries,
  factor: 2,
  minTimeout: options.reconnectInterval,
  maxTimeout: 5000,
};

const unifiedTopologyOptions = {
  retryWrites: true,
  w: "majority",
  minTimeout: options.reconnectInterval,
  maxTimeout: 5000,
};

const connect = (uri, user, pwd, db, directConnection = false) => {
  const url = directConnection ?
    `mongodb://${user}:${encodeURIComponent(pwd)}@${uri}/${db}` :
    `mongodb+srv://${user}:${encodeURIComponent(pwd)}@${uri}/${db}?retryWrites=true&w=majority`;

  return promiseRetry((retry) => mongoose.connect(url, options).catch(retry), unifiedTopologyOptions);
};

export default connect;
