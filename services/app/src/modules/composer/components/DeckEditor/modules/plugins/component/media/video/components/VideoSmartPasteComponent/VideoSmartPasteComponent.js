import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import React, { useCallback, useEffect, useState } from "react";
import { Editor } from "slate";
import { useEditor } from "slate-react";
import PlayIcon from "@material-ui/icons/PlayCircleFilledOutlined";
import GenericButton from "../../../../../../../../../../../common/components/buttons/GenericButton";
import GenericButtonGroup from "../../../../../../../../../../../common/components/buttons/GenericButtonGroup";
import TabList from "../../../../../../../../../../../common/components/popup/editor/TabList";
import Section from "../../../../../../../../../../../common/components/popup/editor/Section";
import { LinkSettings } from "../../../../../../../components/LinkMenu/LinkMenu";
import { insertComponentNodeAtSelection } from "../../../../../deserializers/url/transforms/insertComponentNodeAtSelection";
import { fetchVideoMetadata } from "../../queries/fetchVideoMetadata";
import { buildVideoNode } from "../../transforms/buildVideoNode";
import { videoSmartPasteComponentStyles } from "./VideoSmartPasteComponent.styles";

export const VideoSmartPasteComponent = ({ data, onClose }) => {
  const editor = useEditor();
  const [state, setState] = useState({
    loading: true,
    settings: undefined,
  });
  const { url } = data;

  const [tab, setTab] = useState(1);
  const [target] = useState(editor.selection);
  const selectedText = Editor.string(editor, target);

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  useEffect(() => {
    fetchVideoMetadata(url)
      .then((settings) => {
        const { provider } = settings;
        if (provider !== undefined) {
          setState((prevState) => ({
            ...prevState,
            loading: false,
            settings,
          }));
        }
      });
  }, []);

  const addComponent = (event) => {
    event.preventDefault();
    insertComponentNodeAtSelection(editor, buildVideoNode(state.settings));
    onClose();
  };

  const useStyles = useCallback(videoSmartPasteComponentStyles(), []);
  const videoSmartPasteComponentClasses = useStyles();

  // Don't use smart paste scraping when user has text selected.
  if (selectedText && selectedText.length > 0) {
    return (
      <LinkSettings
        sectionStyle={{ minHeight: 189 }}
        buttonVariant="text"
        addButtonText="Insert Link"
        closeMenu={onClose}
        editor={editor}
        target={target}
        initialUrl={url}
        initialText={selectedText}
      />
    );
  }

  return (
    <Grid item>
      {
        state.loading && (
          <div className={videoSmartPasteComponentClasses.loadingSpinner} style={{ minHeight: 180, display: "flex", alignItems: "center" }}>
            <CircularProgress className="icon" color="primary" size={30}/>
          </div>
        )
      }
      {
        !state.loading && (
          <TabContext value={tab}>
            <TabList onChange={handleTabChange} className={videoSmartPasteComponentClasses.tabList}>
              <Tab label="Link" value={0} style={{ minWidth: 130 }}/>
              <Tab label="Video" style={{ minWidth: 130 }} value={1}/>
            </TabList>
            <TabPanel value={0} style={{ padding: 0 }}>
              <LinkSettings
                buttonVariant="text"
                addButtonText="Add Link"
                closeMenu={onClose}
                editor={editor}
                target={target}
                initialUrl={url}
                initialText={state.settings.label}
                showCancelButton={false}
              />
            </TabPanel>
            <TabPanel value={1} style={{ padding: 0 }}>
              <Section>
                <div style={{ width: "100%", display: "flex", alignItems: "center", flexDirection: "column" }}>
                  {
                    state.settings.thumbnail ? (
                      <img
                        alt="pasted from url"
                        style={{ height: 132 }}
                        src={state.settings.thumbnail}
                      />
                    ) : (
                      <PlayIcon className="videoThumbnailIcon" />
                    )
                  }

                </div>
              </Section>

              <div style={{ display: "flex", justifyContent: "space-between", padding: 10 }}>
                <div> </div>
                <GenericButtonGroup>
                  <GenericButton aria-label="cancel" onClick={onClose}>Cancel</GenericButton>
                  <GenericButton primary submit aria-label="add" onClick={addComponent}>Insert Video</GenericButton>
                </GenericButtonGroup>
              </div>
            </TabPanel>
          </TabContext>
        )
      }
    </Grid>
  );
};
