import axios from "axios";

export const webServiceConsumer = (dataSource) => axios({
  method: 'GET',
  url: dataSource.parameters.url,
});

/**
 * Get a consumer for a given data source.
 *
 * @param dataSource
 * @returns {Promise}
 */
export const getConsumerForDataSource = (dataSource) => {
  switch (dataSource.type) {
    case "web-service-plugin":
      return webServiceConsumer(dataSource);
    default:
      return null;
  }
};
