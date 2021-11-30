import React from "react";
import { useEditor } from "slate-react";
import InlineStyleButtonGroup from "./components/inline/InlineStyleButtonGroup";
import MediaButtons from "./components/MediaButtons";
import { BlockFormattingButtonGroup } from "./components/block/BlockFormattingButtonGroup";
import ListButtons from "./components/ListButtons";
import { HistoryButtons } from "./components/HistoryButtons";
import { BULLETED_LIST } from "../../../DeckEditor/modules/plugins/component/list/bulleted/type";
import { NUMBERED_LIST } from "../../../DeckEditor/modules/plugins/component/list/numbered/type";
import { GroupButtons } from "./components/GroupButtons";

export const EditorToolbarButtons = ({
  classes,
  disabled,
  setUploadStatus,
  isPhoneSize,
  deckId,
  toggleBlockType,
  chosenBlockType,
  selectionType,
  inlineMarks,
  setInlineMarks,
}) => {

  const editor = useEditor();
  const { selection } = editor;
  const hasSelection = selection !== undefined && selection !== null;

  // When on a mobile device, we need to check the type of a button (in the block toggle dropdown)
  // to determine which options are to be disabled.
  const disableGrouping = !hasSelection || selectionType.grouped;
  const disableListToggle = !hasSelection || selectionType.voids || selectionType.other || selectionType.mixed;
  const disableBlockToggle = !hasSelection || selectionType.voids || selectionType.other || selectionType.lists;
  const disableListOrBlock = (disableBlockToggle && disableListToggle) ? true :
    (type) => ((type === BULLETED_LIST || type === NUMBERED_LIST) ? disableListToggle : disableBlockToggle);

  return (
    <div className={classes.controls}>

      <div className={classes.buttonGroup}>
        <HistoryButtons />
      </div>

      <div className={classes.buttonGroup}>
        <BlockFormattingButtonGroup
          compact={isPhoneSize}
          disabled={isPhoneSize ? disableListOrBlock : disableBlockToggle}
          classes={classes}
          chosenType={chosenBlockType}
          toggleType={toggleBlockType}
        />
      </div>

      { !isPhoneSize && (
        <div className={classes.buttonGroup}>
          <ListButtons
            classes={classes}
            disabled={disableListToggle}
            toggleType={toggleBlockType}
            chosenType={chosenBlockType}
          />
        </div>
      ) }

      { !isPhoneSize && (
        <div className={classes.buttonGroup}>
          <GroupButtons
            classes={classes}
            disabled={disableGrouping}
          />
        </div>
      ) }

      <div className={classes.buttonGroup}>
        <InlineStyleButtonGroup
          disabled={!hasSelection || (!selectionType.text && !selectionType.lists)}
          classes={classes}
          editor={editor}
          inlineMarks={inlineMarks}
          setInlineMarks={setInlineMarks}
        />
      </div>

      <MediaButtons
        deckId={deckId}
        setUploadStatus={setUploadStatus}
        disabled={disabled || !chosenBlockType}
        classes={classes}
      />

    </div>
  );
};
