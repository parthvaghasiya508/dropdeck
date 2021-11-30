import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ColorPickerComponent from "../ColorPickerComponent";
import SlideAnalyzer from "../../../../../../../../common/slide/analysis/SlideAnalyzer";
import ColorSwatch from "../../../../../../../../common/slide/analysis/analyzers/ColorSwatch/ColorSwatch";
import {
  removeSimilar,
  sortByPunch
} from "../../../../../../../../common/slide/analysis/analyzers/ColorSwatch/ColorUtils";
import SlideAnalyzerService from "../../../../../../../../common/slide/analysis/SlideAnalyzerService";
import { IMAGE } from "../../../../../../../composer/components/DeckEditor/modules/plugins/component/media/image/type";

const styles = (width) => makeStyles((theme) => ({
  root: {},
  tab: {
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    minHeight: "auto",
    minWidth: width < 320 ? 40 : 210,
    [theme.breakpoints.down('md')]: {
      minWidth: 40
    },
  },
  indicator: {
    display: "none"
  },
  tabWrapper: {
    "& span.label": {
      marginRight: 20
    },
    [theme.breakpoints.down('md')]: {
      "& span.label": {
        display: "none",
      }
    },
    padding: '0 3px 3px 1px',
    color: theme.palette.popover.label,
    fontSize: "0.85em",
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    "&:first-child": {
      marginBottom: "0px !important"
    }
  },
  selectedTab: {
    background: theme.palette.popover.chevron,
  },
  tabPanel: {
    borderRadius: 6,
    width: "100%",
    padding: '30px 25px 10px 15px',
    "&.selected": {
      background: theme.palette.popover.chevron,
    }
  }
}));

const TabPanel = (props) => {
  const { children, value, index, classes, ...other } = props;

  return (
    <div
      className={`${classes.tabPanel} ${index === value ? "selected" : ""}`}
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>{children}</div>
      )}
    </div>
  );
};

/**
 * Get a filtered list of colors from images.
 */
class ColorAnalyzer extends SlideAnalyzer {

  constructor() {
    super(IMAGE);
    this.swatches = [];
  }

  add = (node) => {
    if (node.settings && node.settings.swatch && node.settings.swatch.length > 0) {
      this.swatches.push(new ColorSwatch(node.settings.swatch));
    }
  }

  process() {
    const c = [];
    this.swatches.forEach((swatch) => {
      c.push(...swatch.colors);
    });
    return sortByPunch(...removeSimilar(0.1, ...c));
  }
}

const a11yProps = (index) => ({
  id: `vertical-tab-${index}`,
  'aria-controls': `vertical-tabpanel-${index}`,
});

const tabStyles = { marginBottom: 0, height: 20, width: 20, minWidth: 20, borderRadius: 10, marginRight: 14 };

const CustomiseColors = ({ slide, branding, width, palette, setPalette, selectedPaletteTab, setSelectedPaletteTab }) => {

  const useStyles = useCallback(styles(width), [width]);
  const classes = useStyles();
  const [paletteLocal, setPaletteLocal] = useState(palette);
  const setPaletteCached = (p) => {
    setPalette(p);
    setPaletteLocal(p);
  };

  const [colors, setColors] = useState();

  useEffect(() => {
    const c = slide.node ? SlideAnalyzerService.process(new ColorAnalyzer(), slide.node) : {};
    const b = branding ? Object.values(branding.colors).filter((p) => p !== null) : [];
    setColors([...b, ...c]);
  }, []);

  useEffect(() => {
    setPaletteLocal(palette);
  }, [palette]);

  const handleChange = (event, newValue) => {
    setSelectedPaletteTab(newValue);
  };

  const tabClasses = { root: classes.tab, wrapper: classes.tabWrapper, selected: classes.selectedTab };

  return (
    <div className={classes.root} style={{
      marginLeft: 15,
      marginRight: 30,
      marginTop: 10,
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    }}>
      <Tabs
        orientation="vertical"
        classes={{ indicator: classes.indicator }}
        value={selectedPaletteTab}
        onChange={handleChange}
        aria-label="Color elements">
        <Tab classes={tabClasses} icon={<div style={{ ...tabStyles, backgroundColor: paletteLocal.title() }}> </div>} label={width > 320 ? <span className="label">Title</span> : null} {...a11yProps(0)} />
        <Tab classes={tabClasses} icon={<div style={{ ...tabStyles, backgroundColor: paletteLocal.subtitle() }}> </div>} label={width > 320 ? <span className="label">Subtitle</span> : null} {...a11yProps(0)} />
        <Tab classes={tabClasses} icon={<div style={{ ...tabStyles, backgroundColor: paletteLocal.text() }}> </div>} label={width > 320 ? <span className="label">Text</span> : null} {...a11yProps(0)} />
        <Tab classes={tabClasses} icon={<div style={{ ...tabStyles, backgroundColor: paletteLocal.accent() }}> </div>} label={width > 320 ? <span className="label">Accent</span> : null} {...a11yProps(0)} />
        <Tab classes={tabClasses} icon={<div style={{ ...tabStyles, backgroundColor: paletteLocal.background() }}> </div>} label={width > 320 ? <span className="label">Background</span> : null} {...a11yProps(0)} />
      </Tabs>
      <TabPanel value={selectedPaletteTab} index={0} classes={classes}>
        <ColorPickerComponent colors={colors} width={width} palette={paletteLocal} component="titleColor" setPalette={setPaletteCached} />
      </TabPanel>
      <TabPanel value={selectedPaletteTab} index={1} classes={classes}>
        <ColorPickerComponent colors={colors} width={width} palette={paletteLocal} component="subtitleColor" setPalette={setPaletteCached} />
      </TabPanel>
      <TabPanel value={selectedPaletteTab} index={2} classes={classes}>
        <ColorPickerComponent colors={colors} width={width} palette={paletteLocal} component="textColor" setPalette={setPaletteCached} />
      </TabPanel>
      <TabPanel value={selectedPaletteTab} index={3} classes={classes}>
        <ColorPickerComponent colors={colors} width={width} palette={paletteLocal} component="accentColor" setPalette={setPaletteCached} />
      </TabPanel>
      <TabPanel value={selectedPaletteTab} index={4} classes={classes}>
        <ColorPickerComponent colors={colors} width={width} palette={paletteLocal} component="backgroundColor" setPalette={setPaletteCached} />
      </TabPanel>
    </div>
  );
};
export default CustomiseColors;
