import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabPanel from "@material-ui/lab/TabPanel";
import React, { useCallback, useState } from "react";
import { Editor, Transforms } from "slate";
import { useEditor } from "slate-react";
import GenericButton from "../../../../../../../../../../../common/components/buttons/GenericButton";
import GenericButtonGroup from "../../../../../../../../../../../common/components/buttons/GenericButtonGroup";
import Section from "../../../../../../../../../../../common/components/popup/editor/Section";
import { LinkSettings } from "../../../../../../../components/LinkMenu/LinkMenu";
import { insertComponentNodeAtSelection } from "../../../../../deserializers/url/transforms/insertComponentNodeAtSelection";
import { FROM_UPLOAD } from "../../transforms/insertImage";
import TabList from "../../../../../../../../../../../common/components/popup/editor/TabList";
import { imageSmartPasteComponentStyles } from "./ImageSmartPasteComponent.styles";
import { imageBuilder } from "../../imageBuilder";

export const ImageSmartPasteComponent = ({ data, onClose }) => {
  const editor = useEditor();

  const [tab, setTab] = useState(1);
  const [target] = useState(editor.selection);
  const selectedText = Editor.string(editor, target);
  const useStyles = useCallback(imageSmartPasteComponentStyles(), []);
  const imageSmartPasteComponentClasses = useStyles();

  const handleTabChange = (event, value) => {
    setTab(value);
  };

  const addComponent = (event) => {
    event.preventDefault();
    const imageNode = imageBuilder({
      url,
      from: FROM_UPLOAD,
    });
    Transforms.select(editor, target);
    insertComponentNodeAtSelection(editor, imageNode);
    onClose();
  };

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
        initialUrl={data}
        initialText={selectedText}
      />
    );
  }

  const { url } = data;
  return (
    <TabContext value={tab}>
      <TabList onChange={handleTabChange} className={imageSmartPasteComponentClasses.tabList}>
        <Tab label="Link" value={0} style={{ minWidth: 130 }}/>
        <Tab label="Image" style={{ minWidth: 130 }} value={1}/>
      </TabList>
      <TabPanel value={0} style={{ padding: 0 }}>
        <LinkSettings
          buttonVariant="text"
          addButtonText="Add Link"
          closeMenu={onClose}
          editor={editor}
          target={target}
          initialUrl={url}
          initialText="Image"
          showCancelButton={false}
        />
      </TabPanel>
      <TabPanel value={1} style={{ padding: 0 }}>
        <Section>
          <div style={{ width: "100%", display: "flex", alignItems: "center", flexDirection: "column" }}>
            <img
              alt="pasted from url"
              style={{ height: 132 }}
              src={url}
            />
          </div>
        </Section>

        <div style={{ display: "flex", justifyContent: "space-between", padding: 10 }}>
          <div> </div>
          <GenericButtonGroup>
            <GenericButton aria-label="cancel" onClick={onClose}>Cancel</GenericButton>
            <GenericButton primary submit aria-label="add" autoFocus onClick={addComponent}>Insert Image</GenericButton>
          </GenericButtonGroup>
        </div>
      </TabPanel>
    </TabContext>
  );
};
