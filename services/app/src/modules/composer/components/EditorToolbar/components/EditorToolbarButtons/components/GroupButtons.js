import React from "react";
import LinkIcon from '@material-ui/icons/Link';
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useEditor, useSlate } from "slate-react";
import { disabledButtonStyling } from "../../../utils/disabledButtonStyling";
import { GroupTransforms } from "../../../../DeckEditor/services/transforms/GroupTransforms";

export const GroupButtons = ({ disabled }) => {

  const editor = useEditor();
  const handleGrouping = (event) => {
    event.preventDefault();
    GroupTransforms.moveToCollection(editor);
  };

  return (
    <ButtonGroup
      onMouseDown={(event) => event.preventDefault()}
    >
      <Button
        disabled={disabled}
        value="image"
        variant="outlined"
        size="small"
        aria-label="more-styles"
        aria-haspopup="menu"
        onMouseDown={handleGrouping}
      >
        <LinkIcon style={disabled ? disabledButtonStyling : {}} />
      </Button>
    </ButtonGroup>
  );
};
