import { Cancel, CheckCircle, DoneOutlined } from "@material-ui/icons";
import React from "react";
import JSONTree from "react-json-tree";
import Checkbox from "@material-ui/core/Checkbox";

const JSONView = ({ json, selectedData, setSelectedData }) => {

  const createPath = (keyPath) => [...keyPath].reverse()
    .map((key, i) => {
      if (typeof key === "number") {
        return `[${key}]`;
      }
      return `${i === 0 ? "" : "."}${key}`;
    });

  const isSelected = (keyPath) => selectedData && selectedData[createPath(keyPath)
    .join("")] !== undefined;

  const handleSelect = (e, keyPath, nodeType, label) => {
    const { checked } = e.target;
    const path = createPath(keyPath);
    const pathString = path.join("");
    const currentSelectedData = { ...selectedData };

    if (checked) {
      currentSelectedData[pathString] = {
        type: nodeType,
        name: label,
        path: [...keyPath].reverse()
      };
    } else if (currentSelectedData[pathString] !== undefined) {
      delete currentSelectedData[pathString];
    }
    setSelectedData(currentSelectedData);
  };

  const tree = ({ style }) => ({
    style: {
      padding: 10,
      ...style
    }
  });

  const getLabelStyle = ({ style }, nodeType, expanded) => ({
    style: {
      ...style,
      textTransform: expanded ? 'uppercase' : style.textTransform,
    },
  });

  const theme = {
    scheme: 'default',
    author: 'chris kempson (http://chriskempson.com)',
    base00: 'transparent',
    base01: '#282828',
    base02: '#383838',
    base03: '#585858',
    base04: '#b8b8b8',
    base05: '#d8d8d8',
    base06: '#e8e8e8',
    base07: '#f8f8f8',
    base08: '#ab4642',
    base09: '#dc9656',
    base0A: '#f7ca88',
    base0B: '#a1b56c',
    base0C: '#86c1b9',
    base0D: '#7cafc2',
    base0E: '#ba8baf',
    base0F: '#a16946'
  };

  const styling = {
    extend: theme,
    tree
  };

  return (
    <div>
      {json ? (
        <JSONTree theme={styling}
          getItemString={(type, data, itemType, itemString) => <span>{itemString}</span>}
          labelRenderer={(key, nodeType) => {
            const label = key[0];
            return (
              <><Checkbox value={key} checked={isSelected(key)}
                onChange={(e) => handleSelect(e, key, nodeType, label)} style={{
                  margin: 0,
                  padding: 0,
                  marginRight: 4
                }}/><strong>{label}</strong>
              </>
            );
          }}
          valueRenderer={(raw) => {
            if (typeof raw === "boolean" || typeof raw === "string" && (raw === "true" || raw === "false")) {
              const value = JSON.parse(raw);
              return (
                value ? (
                  <CheckCircle style={{
                    height: 20,
                    color: "#666",
                    display: "inline-block",
                    position: "relative",
                    top: 5
                  }}/>
                ) : (
                  <Cancel style={{
                    height: 20,
                    color: "#666",
                    position: "relative",
                    display: "inline-block",
                    top: 5
                  }}/>
                )
              );
            }
            return (<span style={{ color: "#666" }}>{raw}</span>);
          }}
          hideRoot data={json} invertTheme={false}/>
      ) : null}
    </div>
  );
};
export default JSONView;
