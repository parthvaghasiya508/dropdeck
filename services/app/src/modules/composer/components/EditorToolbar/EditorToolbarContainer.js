import React, { useEffect, useState } from "react";
import { useSlate } from "slate-react";
import { toggleList } from "@udecode/slate-plugins";
import { nodeTypeMixture } from "./components/EditorToolbarButtons/queries/nodeTypeMixture";
import { isList } from "../DeckEditor/modules/plugins/core/withCoreEditing";
import { SelectionTransforms } from "../DeckEditor/services/transforms/SelectionTransforms";
import EditorToolbar from "./EditorToolbar";
import { currentMarks } from "./transforms/currentMarks";
import { encodeHistory } from "./transforms/encodeHistory";
import { BULLETED_LIST } from "../DeckEditor/modules/plugins/component/list/bulleted/type";
import { NUMBERED_LIST } from "../DeckEditor/modules/plugins/component/list/numbered/type";
import { LIST_ITEM } from "../DeckEditor/modules/plugins/component/list/type";
import { PARAGRAPH } from "../DeckEditor/modules/plugins/component/paragraph/type";
import { listTypes } from "../DeckEditor/modules/plugins/component/list/ListPlugin";

const activeBlockType = (editor) => {
  if (editor && editor.selection) {
    const [element] = SelectionTransforms.componentElement(editor);
    return (element ? element.type : undefined);
  }
};

export const EditorToolbarContainer = ({
  deckId,
  communicatingWithServer,
  serverCommunicationStatus,
  setUploadStatus
}) => {

  // Note: We need to call useSlate instead of useEditor here to ensure we have updates at every context change.
  const editor = useSlate();

  const { selection } = editor;
  const [chosenBlockType, setChosenBlockType] = useState();
  const [selectionType, setSelectionType] = useState({});
  const [inlineMarks, setInlineMarks] = useState([]);
  const currentMarksHash = (currentMarks(editor) || []).join('-');
  const historyHash = encodeHistory(editor);

  useEffect(() => {
    if (selection) {
      setChosenBlockType(activeBlockType(editor));
      setSelectionType(nodeTypeMixture(editor));
      setInlineMarks(currentMarks(editor));
    } else {
      setChosenBlockType(null);
      setSelectionType({});
      setInlineMarks([]);
    }
  }, [selection, currentMarksHash, historyHash]);

  const toggleBlockType = (event, type) => {
    event.preventDefault();
    if (isList({ type })) {
      toggleList(editor, { ...listTypes, typeList: type });
    } else {
      editor.toggleType(type, PARAGRAPH);
    }
    if (editor.selection) {
      setChosenBlockType(activeBlockType(editor));
      setSelectionType(nodeTypeMixture(editor));
    }
  };

  return (
    <EditorToolbar
      deckId={deckId}
      historyHash={historyHash} // NOTE: Don't remove, used for caching! (Bjarki Holm)
      communicatingWithServer={communicatingWithServer}
      serverCommunicationStatus={serverCommunicationStatus}
      setUploadStatus={setUploadStatus}
      toggleBlockType={toggleBlockType}
      chosenBlockType={chosenBlockType}
      selectionType={selectionType}
      inlineMarks={inlineMarks}
      setInlineMarks={setInlineMarks}
    />
  );
};
