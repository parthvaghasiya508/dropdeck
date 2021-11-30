import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import React, { useCallback, useEffect, useState } from "react";
import { PanelButton } from "../../../../api/sdk/preview/PanelComponents";
import { logger } from "../../../../util/logger";
import LiveDataManager, { Data } from "../../LiveDataManager";
import DataSourceList from "./components/DataSourceList";
import DataSourcePickerComponent from "./components/DataSourcePickerComponent";
import DataSourceTypeButton from "./components/DataSourceTypeButton";
import Label from "../../../controls/Label";

const styles = () => makeStyles((theme) => ({
  root: {
    width: "100%"
  },
}));
const UseDataSource = ({ createDataSource, createDataSourceWithPlugin, dataSources, setDataSources, plugins }) => {

  const [, setDataSource] = useState({});

  useEffect(() => {
    LiveDataManager.instance.dataSources().then((dataSources) => {
      setDataSources(dataSources);
      setDataSource(dataSources[0]);
    }).catch((e) => {
      logger.error(e);
    });
  }, []);

  const addLiveData = async (ds, path) => {
    LiveDataManager.instance.use(ds, path);
    const data = await new Data({ dataSource: ds, path: path[0], properties: path[1] });
  };

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  return (
    <div className={classes.root}>

      {dataSources.length > 0 ? (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%" }}>

          <DataSourceList>
            { (ds, index) => <DataSourcePickerComponent dataSource={ds} index={index} pathClickHandler={addLiveData}/>}
          </DataSourceList>
          {plugins ? plugins.map((p) => (
            <DataSourceTypeButton key={`type-select-${p.id}`} plugin={p} handleClick={() => createDataSourceWithPlugin(p)}/>
          )) : null}
        </div>
      ) : (
        <div style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          width: "100%"
        }}>
          <Label variant="h4" style={{ padding: 10, marginBottom: 10, }}>No data sources defined</Label>
          <div>
            <PanelButton onClick={createDataSource}>Create Data Source</PanelButton>
          </div>
        </div>
      )}
    </div>
  );
};
export default UseDataSource;
