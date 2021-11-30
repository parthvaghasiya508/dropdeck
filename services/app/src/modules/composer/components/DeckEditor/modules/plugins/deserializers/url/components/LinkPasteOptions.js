import React, { useState } from "react";
import { useEditor } from "slate-react";
import Section from "../../../../../../../../../common/components/popup/Section";
import { LinkSettings } from "../../../../../components/LinkMenu/LinkMenu";

export const LinkPasteOptions = ({ classes, onClose, data, label }) => {
  const editor = useEditor();
  const [target] = useState(editor.selection);
  return (
    <Section title="Add a link">
      <LinkSettings
        buttonVariant="text"
        addButtonText="Add link"
        closeMenu={onClose}
        editor={editor}
        target={target}
        initialUrl={data}
        initialText={label}
        showCancelButton={false}
      />
    </Section>
  );
};
