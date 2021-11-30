import TextField from "@material-ui/core/TextField";
import { Done } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Colors from "../../../../../Colors";
import { PanelButton, PanelStep } from "../../../../api/sdk/preview/PanelComponents";

/**
 * Parameter input.
 *
 * @param param
 * @param existingValue
 * @param label
 * @param onChange
 * @returns {JSX.Element}
 * @constructor
 */
const Input = ({ param, existingValue, label, onChange }) => {

  const [value, setValue] = useState(existingValue);

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(param, e.target.value);
  };

  return (
    <TextField key={`ds-input-${param.name}`} style={{ margin: 4 }} fullWidth required={param.required} id={param.name} value={value} onChange={handleChange} label={label || param.name} InputLabelProps={{ shrink: true }}/>
  );
};

/**
 * Form component that holds multiple inputs.
 *
 * @param plugin
 * @param connect
 * @param connected
 * @param complete
 * @param dataSource
 * @param setDataSource
 * @returns {JSX.Element}
 * @constructor
 */
const Form = ({ plugin, connect, connected, complete, dataSource, setDataSource }) => {

  const [, setName] = useState("");

  const handleParamChange = (param, value) => {
    const ds = { ...dataSource };
    if (param.name === "ds-name") {
      setName(value);
      ds.name = value;
    } else if (!param.secret) {
      ds.parameters[param.name] = value;
    } else {
      ds.secrets[param.name] = value;
    }
    setDataSource(ds);
  };

  const getExistingValue = (param) => {
    if (param.secret && dataSource && dataSource.secrets && dataSource.secrets[param.name] !== undefined) {
      return dataSource.secrets[param.name];
    }
    if (dataSource && dataSource.parameters && dataSource.parameters[param.name]) {
      return dataSource.parameters[param.name];
    }
    return "";
  };

  const [timer, setTimer] = useState(undefined);
  const [buttonContent, setButtonContent] = useState(<>Connect</>);

  useEffect(() => {
    if (connected) {
      setButtonContent(<><Done style={{ marginRight: 10, color: Colors.green() }}/>Connected</>);
      setTimer(setTimeout(() => {
        setButtonContent(<>Update</>);
      }, 2000));
    } else {
      clearTimeout(timer);
      setButtonContent(<>Connect</>);
    }
  }, [connected]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", width: "100%", boxSizing: 'border-box', padding: '0 12px 0 6px', }}>
        <Input param={{ name: "ds-name" }} label="Data Source Name" existingValue={dataSource.name} onChange={handleParamChange}/>
        {plugin.params.map((param) => <Input key={`data-source-form-input-${dataSource._id}-${param.name}`} param={param} existingValue={getExistingValue(param)} onChange={handleParamChange}/>)}
        <PanelButton disabled={!complete} onClick={connect} style={{ margin: '24px -4px 8px 4px' }}>
          {buttonContent}
        </PanelButton>
      </div>
    </>
  );
};

/**
 * Entry point component for handling data source parameters.
 *
 * @param plugin
 * @param expanded
 * @param setExpanded
 * @param dataSource
 * @param setDataSource
 * @param connect
 * @param connected
 * @param disabled
 * @returns {JSX.Element}
 * @constructor
 */
const DataSourceParameterForm = ({ plugin, expanded, setExpanded, dataSource, setDataSource, connect, connected, disabled }) => {

  useEffect(() => {
    if (dataSource && plugin) {
      dataSource.type = plugin.id;
    }
  }, [plugin, dataSource]);

  const partiallyComplete = () => {
    if (plugin && plugin.params) {
      if (dataSource.name === undefined || dataSource.name === "") {
        return true;
      }
      return plugin.params.some((param) => (dataSource.parameters[param.name] === undefined || dataSource.parameters[param.name] === "") && param.required);
    }
    return true;
  };

  return (
    <PanelStep title="Basic Settings" step={2} connected={connected} defaultExpanded={false} complete={!partiallyComplete()} expanded={expanded} disabled={disabled} onChange={() => setExpanded(!expanded)}>
      {plugin ? <Form connect={connect} connected={connected} complete={!partiallyComplete()} plugin={plugin} dataSource={dataSource} setDataSource={setDataSource}/> : null}
    </PanelStep>
  );
};
export default DataSourceParameterForm;
