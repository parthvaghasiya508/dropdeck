import IconButton from "@material-ui/core/IconButton";
import { Add } from "@material-ui/icons";
import React, { useState } from "react";
import { generatePath, Route, useHistory, useRouteMatch } from "react-router-dom";
import { Panel, PanelContainer, PanelTitle } from "../../../api/sdk/preview/PanelComponents";
import UseDataSource from "./generic/UseDataSource";
import NewDataSource from "./NewDataSource";
import DSWebServicePlugin from "./webservice/DSWebServicePlugin";

const DataSourcePanel = () => {

  const [dataSources, setDataSources] = useState([]);
  const plugins = [DSWebServicePlugin()];
  const history = useHistory();
  const route = useRouteMatch();

  const [liveData, setLiveData] = useState({});

  const homePath = generatePath(route.path, {
    id: route.params.id,
    view: route.params.view,
  });

  const createDataSourcePath = generatePath(route.path, {
    id: route.params.id,
    view: route.params.view,
    subview: "create"
  });

  const createDataSourcePathWithPlugin = (plugin) => generatePath(route.path, {
    id: route.params.id,
    view: route.params.view,
    subview: "create",
    plugin: plugin.id
  });

  const createDataSource = () => {
    history.push(createDataSourcePath);
  };

  const createDataSourceWithPlugin = (plugin) => {
    history.push(createDataSourcePathWithPlugin(plugin));
  };

  return (
    <Panel>
      <Route exact path={homePath}>
        <PanelTitle text="Live Data" button={<IconButton variant="outlined" onClick={createDataSource} size="small" color="primary"><Add/></IconButton>}/>
        <PanelContainer style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}>
          <UseDataSource plugins={plugins} dataSources={dataSources} setDataSources={setDataSources} liveData={liveData} setLiveData={setLiveData} createDataSource={createDataSource} createDataSourceWithPlugin={createDataSourceWithPlugin}/>
        </PanelContainer>
      </Route>

      <Route exact path={`${createDataSourcePath}/:plugin?`}>
        <NewDataSource plugins={plugins} homePath={homePath}/>
      </Route>

    </Panel>
  );
};
export default DataSourcePanel;
