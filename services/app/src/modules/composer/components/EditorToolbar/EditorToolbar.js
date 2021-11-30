import { subject } from "@casl/ability";
import { useMediaQuery, useTheme } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import HelpIcon from "@material-ui/icons/HelpOutline";
import HomeIcon from "@material-ui/icons/Home";
import React, { useCallback } from "react";
import { connect } from "react-redux";
import { setDeckName, setPresentation } from "../../../../actions/presentation";
import Abilities from "../../../../common/authz/ability/Abilities";
import { useAbility } from "../../../../common/authz/ability/useAbility";
import DeckNameComponent from "../../../../common/components/ApplicationBar/components/DeckName/DeckName";
import LoadingStatusIndicator from "../../../../common/components/ApplicationBar/components/LoadingStatusIndicator";
import PreviewToggle from "../../../../common/components/ApplicationBar/components/PreviewToggle";
import { Presentation } from "../../../../common/model/Deck";
import { config } from "../../../../config";
import EditorToolbarButtons from "./components/EditorToolbarButtons";
import editorToolbarStyles from "./EditorToolbarStyles";

const EditorToolbar = ({
  deckId,
  historyHash,
  presentation,
  communicatingWithServer,
  serverCommunicationStatus,
  setUploadStatus,
  toggleBlockType,
  chosenBlockType,
  selectionType,
  inlineMarks,
  setInlineMarks,
}) => {

  const ability = useAbility();
  const materialTheme = useTheme();
  const isPhoneSize = useMediaQuery(materialTheme.breakpoints.down('xs'));
  const useEditorToolbarStyles = useCallback(editorToolbarStyles(), []);
  const classes = useEditorToolbarStyles();

  return (
    <div className={classes.root}>
      <div className={classes.toolbar}>
        <div>
          <a href={config.app.paths.home} className={classes.logo}> </a>
          <IconButton className={classes.homeIcon} href={config.app.paths.home} size="small">
            <HomeIcon fontSize="small"/>
          </IconButton>
        </div>
        {ability.can(Abilities.Actions.EDIT, subject(Abilities.Subjects.PRESENTATION, presentation)) ? (
          <div className={classes.deckNameOuter}>
            <DeckNameComponent
              isPhoneSize={isPhoneSize}
              id={presentation.id}
              name={presentation.name}
              setName={setDeckName}
              communicatingWithServer={communicatingWithServer}
            />
          </div>
        ) : <div>{presentation.name}</div>}

        <div className={classes.statusContainer}>
          <LoadingStatusIndicator status={serverCommunicationStatus}/>
        </div>

        <div className={classes.support}>
          <IconButton href={config.app.helpDesk} target="_new" size="small" style={{ marginRight: isPhoneSize ? 12 : -3 }}>
            <HelpIcon fontSize="small"/>
          </IconButton>
        </div>
        <div style={{
          marginRight: isPhoneSize ? 30 : 0
        }}>
          <PreviewToggle isPhoneSize={isPhoneSize}/>
        </div>
      </div>

      <EditorToolbarButtons
        historyHash={historyHash} // NOTE: Don't remove, used for caching! (Bjarki Holm)
        classes={classes}
        isPhoneSize={isPhoneSize}
        setUploadStatus={setUploadStatus}
        deckId={deckId}
        toggleBlockType={toggleBlockType}
        chosenBlockType={chosenBlockType}
        selectionType={selectionType}
        inlineMarks={inlineMarks}
        setInlineMarks={setInlineMarks}
      />
    </div>
  );
};

const mapDispatchToProps = {
  setPresentation,
  setDeckName,
};

function mapStateToProps(state) {
  return {
    preview: state.app.preview,
    user: state.user,
    presentation: Presentation.fromDataObject(state.composer.presentation)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditorToolbar);
