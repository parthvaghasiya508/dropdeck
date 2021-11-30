import React, { forwardRef, useCallback, useContext, useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/styles";
import { Button, ListSubheader, TextField, useMediaQuery } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { VariableSizeList } from "react-window";
import axios from "axios";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { config } from "../../../config";
import Label from "../controls/Label";
import { FontProviders, validFont } from "../../util/FontUtility";

const styles = () => makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    margin: "10px auto 5px auto",
  },
  listbox: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.background.border00,
    boxSizing: 'border-box',
    padding: '0',
    '& ul': {
      margin: '10px 0 0 0',
      padding: 0,
    },
  },
  fontInfo: {
    borderRadius: 6,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    margin: '0',
    padding: '10px',
    background: theme.dark() ? theme.palette.label.light : theme.palette.background.elev04,
  },
  button: {
    margin: '0',
    fontSize: '0.8rem',
  },
  ListHeading: {
    fontWeight: '500',
    top: '-1px',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    background: theme.dark() ? theme.palette.label.light : theme.palette.background.elev00,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const FontPicker = ({ defaultFont = "", font = "", onSelect, setFontFound }) => {

  const [showAll, setShowAll] = useState(false);
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [popular, setPopular] = useState([]);
  const [all, setAll] = useState([]);
  const [defaultFontFound, setDefaultFontFound] = useState(false);
  const [change, setChange] = useState(false);

  useEffect(() => {
    axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${config.elements.map.google.apiKey}&sort=popularity`)
      .then((payload) => {
        if (payload.data.items) {
          setPopular(payload.data.items.slice(0, 10).map((font) => font.family));
        }
      });
    axios.get(`https://www.googleapis.com/webfonts/v1/webfonts?key=${config.elements.map.google.apiKey}`)
      .then((payload) => {
        if (payload.data.items) {
          setAll(payload.data.items.map((font) => font.family));
        }
      });
  }, []);

  useEffect(() => {
    // setDefaultFontFound(false);
    if (!defaultFontFound && defaultFont && defaultFont.name && all && all.length > 0) {
      let isValid = false;
      let provider = null;
      const isDefaultFont = validFont(defaultFont.name);
      if (isDefaultFont) {
        provider = FontProviders.Default;
        isValid = true;
      } else {
        const fontIsValid = validFont(defaultFont.name, all);
        if (fontIsValid) {
          provider = FontProviders.Google;
          isValid = true;
        }
      }

      setDefaultFontFound(isValid);
      setFontFound(isValid);

      if (isValid && provider && onSelect && !defaultFont.provider) {
        onSelect(defaultFont.name, provider);
      }
    }
  }, [defaultFont, all, defaultFontFound]);
  const LISTBOX_PADDING = 8; // px

  const renderRow = ({
    data,
    index,
    style
  }) => React.cloneElement(data[index], {
    style: {
      ...style,
      top: style.top + LISTBOX_PADDING,
    },
  });

  const OuterElementContext = React.createContext({});

  const OuterElementType = forwardRef((props, ref) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const outerProps = useContext(OuterElementContext);
    return <div ref={ref} {...props} {...outerProps} />;
  });

  const useResetCache = (data) => {
    const ref = React.useRef(null);
    React.useEffect(() => {
      if (ref.current != null) {
        ref.current.resetAfterIndex(0, true);
      }
    }, [data]);
    return ref;
  };

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true });

  const ListboxComponent = forwardRef((props, ref) => {
    const { children, ...other } = props;
    const itemData = React.Children.toArray(children);

    const itemCount = itemData.length;
    const itemSize = smUp ? 36 : 48;

    const getChildSize = (child) => {
      if (React.isValidElement(child) && child.type === ListSubheader) {
        return 48;
      }

      return itemSize;
    };

    const getHeight = () => {
      if (itemCount > 8) {
        return 8 * itemSize;
      }
      return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const gridRef = useResetCache(itemCount);

    return (
      <div ref={ref}>
        <OuterElementContext.Provider value={other}>
          <VariableSizeList
            itemData={itemData}
            height={getHeight() + 2 * LISTBOX_PADDING}
            width="100%"
            ref={gridRef}
            outerElementType={OuterElementType}
            innerElementType="ul"
            itemSize={(index) => getChildSize(itemData[index])}
            overscanCount={5}
            itemCount={itemCount}
          >
            {renderRow}
          </VariableSizeList>
        </OuterElementContext.Provider>
      </div>
    );
  });
  const renderGroup = (params) => [
    <ListSubheader className={classes.ListHeading} key={params.key} component="div">
      {params.group}
      {params.group === "Most popular" && (
        <Button className={classes.ListBtn} variant="outlined" size="small" onClick={() => setShowAll(true)}>All</Button>
      )}
    </ListSubheader>,
    params.children,
  ];

  const useStyles = useCallback(styles(), []);
  const classes = useStyles();

  const reset = () => {
    setChange(false);
    setShowAll(false);
  };

  return (
    <div className={classes.fontInfo}>
      {change ? (
        <div>
          <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
              if (onSelect) {
                onSelect(newValue, FontProviders.Google);
                setFontFound(true);
              }
              setChange(false);
              setShowAll(false);
            }}
            disableListWrap
            classes={classes}
            inputValue={inputValue}
            disableClearable
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
              if (!newInputValue) {
                setChange(false);
              }
            }}
            ListboxComponent={inputValue.length > 0 ? ListboxComponent : undefined}
            renderGroup={renderGroup}
            options={showAll || inputValue.length > 0 ? all : popular}
            groupBy={(option) => (showAll || inputValue.length > 0 ? option[0].toUpperCase() : "Most popular")}
            renderInput={(params) => <TextField {...params} label="Search fonts"/>}
            renderOption={(option) => (
              <div key={`option-${option}`}>
                <link rel="stylesheet" href={`https://fonts.googleapis.com/css?display=swap&family=${option}&text=${option}`}/>
                <div style={{ fontFamily: option }}>{option}</div>
              </div>
            )}
          />
          <Button size="small" style={{ margin: 6 }} onClick={() => reset()}>Cancel</Button>
        </div>
      ) : (
        <div>
          {defaultFont?.name || font?.name ? (
            <div style={{ padding: 3 }}>
              <Label style={{ padding: 6, fontWeight: '600', fontSize: '1.2rem', }}>{font.name}</Label>
              <Label>
                {defaultFontFound || font.provider ? (<CheckCircleIcon style={{ color: "#00c030", marginTop: 0 }} />) : <span style={{ color: theme.palette.events.warn, }}><ErrorOutlineIcon style={{ fontSize: "1.1rem", margin: "0 2px -4px 2px" }} /> This font could not be found, using default.</span>}
              </Label>
            </div>
          ) : (
            <Label>Using default.</Label>
          )}

          <Button size="small" color="primary" variant="outlined" style={{ margin: '10px 0 6px 0' }} onClick={() => setChange(true)}>Change</Button>

          {defaultFont.name !== font.name && (
            <Button size="small" style={{ margin: 6 }} onClick={() => {
              setValue(defaultFont);
              if (onSelect) {
                onSelect(defaultFont.name, defaultFont.provider || defaultFontFound ? FontProviders.Google : null);
                setFontFound(defaultFontFound);
              }
              reset();
            }}>
              Revert
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
export default FontPicker;
