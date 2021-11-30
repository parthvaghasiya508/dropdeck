import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { ROUTE_EDIT_DECK } from "../../../../Routes";
import Dropdeck from "../../../api/sdk/Dropdeck";
import { PanelButton, PanelTitle } from "../../../api/sdk/preview/PanelComponents";
import { logger } from "../../../util/logger";
import LiveDataManager from "../LiveDataManager";
import DataSourceParameterForm from "./generic/DataSourceParameterForm";
import DataSourcePickData from "./generic/DataSourcePickData";
import DataSourceTypeSelect from "./generic/DataSourceTypeSelect";

const NewDataSource = ({ plugins, homePath }) => {

  const history = useHistory();

  const route = useRouteMatch({ path: `${ROUTE_EDIT_DECK}/:id/:view?/:subview?/:plugin?` });

  const defaultDataSource = { name: "", type: "", parameters: {}, secrets: {} };

  // Data source parameter information
  const [plugin, setPlugin] = useState();
  const [dataSource, setDataSource] = useState(defaultDataSource);
  const [connected, setConnected] = useState(dataSource._id !== undefined);
  const [data, setData] = useState();
  const [selectedData, setSelectedData] = useState({});

  useEffect(() => {
    // Default plugin to use is in the path
    if (route && route.params && route.params.plugin) {
      const defaultPlugin = plugins.find((predicate) => predicate.id === route.params.plugin);
      if (defaultPlugin) {
        setPlugin(defaultPlugin);
      }
    }
  }, [route]);

  // Handlers
  const consumeDataSource = () => {
    // Get data
    if (dataSource._id) {
      LiveDataManager.instance.consume(dataSource._id)
        .then((d) => {
          setData(d);
          setConnected(true);
        })
        .catch((e) => {
          logger.error(e);
        });
    }
  };

  const handleSaveDataSource = () => {
    const dataSourceToSave = { ...dataSource };
    dataSourceToSave.paths = selectedData;
    if (connected || dataSourceToSave._id) {
      Dropdeck.api.put(`datasources/${dataSource._id}`, dataSourceToSave)
        .then((payload) => {
          setDataSource(payload.data);
          setConnected(false);
          setConnected(true);
          consumeDataSource();
        })
        .catch((e) => {
          logger.error(e);
        });
    } else {
      Dropdeck.api.post("datasources", dataSourceToSave)
        .then((payload) => {
          setDataSource(payload.data);
          consumeDataSource();
        })
        .catch((e) => {
          logger.error(e);
        });
    }
  };

  const handleDelete = () => {
    Dropdeck.api.delete(`datasources/${dataSource._id}`)
      .then((payload) => {
        setDataSource(defaultDataSource);
        history.push(homePath);
      })
      .catch((e) => {
        logger.error(e);
      });
  };

  const connect = () => {
    handleSaveDataSource();
  };

  const saveAndComplete = () => {
    handleSaveDataSource();
    history.push(homePath);
  };

  const [expandTypePanel, setExpandTypePanel] = useState(plugin !== undefined);
  useEffect(() => {
    setExpandTypePanel(data === undefined && (!route || !route.params || !route.params.plugin));
  }, [data]);

  const [expandSettingsPanel, setExpandSettingsPanel] = useState(plugin !== undefined);
  useEffect(() => {
    setExpandSettingsPanel(plugin !== undefined);
  }, [plugin]);

  const [expandDataPanel, setExpandDataPanel] = useState(plugin !== undefined);
  useEffect(() => {
    setExpandDataPanel(data !== undefined);
  }, [data]);

  useEffect(() => {
    if (dataSource && dataSource._id) {
      consumeDataSource();
    }
  }, [dataSource]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <PanelTitle text="New Data Source"/>

      <DataSourceTypeSelect expanded={expandTypePanel} setExpanded={setExpandTypePanel} plugins={plugins} plugin={plugin} setPlugin={setPlugin} />
      <DataSourceParameterForm plugin={plugin} connected={connected} dataSource={dataSource} setDataSource={setDataSource} connect={connect} expanded={expandSettingsPanel} setExpanded={setExpandSettingsPanel} disabled={plugin === undefined}/>
      <DataSourcePickData cancel={handleDelete} save={saveAndComplete} selectedData={selectedData} setSelectedData={setSelectedData} fetch={consumeDataSource} disabled={data === undefined} expanded={expandDataPanel} setExpanded={setExpandDataPanel} data={data}/>

      { !connected ? <PanelButton color="primary" style={{ margin: '14px 8px 20px 8px' }} onClick={() => history.push(homePath)}>Cancel</PanelButton> : null}
    </div>
  );
};
export default NewDataSource;
