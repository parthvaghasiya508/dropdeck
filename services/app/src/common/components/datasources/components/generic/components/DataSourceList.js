import React, { useEffect, useState } from "react";
import uuid from "react-uuid";
import Dropdeck from "../../../../../api/sdk/Dropdeck";
import { logger } from "../../../../../util/logger";

const DataSourceList = ({ children }) => {

  const [dataSources, setDataSources] = useState([]);
  const [alignment, setAlignment] = useState("-end");

  useEffect(() => {
    Dropdeck.api.get("datasources")
      .then((payload) => {
        setDataSources(payload.data);
      })
      .catch((e) => {
        logger.error(e);
      });
  }, []);

  return (
    <div>
      {dataSources.map((dataSource, index) => React.cloneElement(children(dataSource, index), { key: `data-source-list-${dataSource._id}` }))}
    </div>
  );
};
export default DataSourceList;
