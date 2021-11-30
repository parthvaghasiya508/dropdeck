export const feature = {
  dataSources: process.env.REACT_APP_FEATURE_DATA_SOURCES === 'enabled',
  auth: {
    local: process.env.REACT_APP_FEATURE_LOCAL_AUTH === 'enabled',
  },
  modules: {
    exportPlayer: window._dropdeck_env?.modules?.exportPlayer,
  }
};
