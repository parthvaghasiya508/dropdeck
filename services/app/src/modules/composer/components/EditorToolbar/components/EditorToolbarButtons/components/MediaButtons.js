import React, { useCallback, useRef, useState } from "react";
import { Editor, Node, Text } from "slate";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import GifIcon from '@material-ui/icons/Gif';
import PublishIcon from '@material-ui/icons/Publish';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import { useEditor, useSlate } from "slate-react";
import { uploadFiles } from "../../../../DeckEditor/modules/plugins/component/media/image/transforms/uploadFiles";
import {
  FROM_UPLOAD,
  insertImage
} from "../../../../DeckEditor/modules/plugins/component/media/image/transforms/insertImage";
import { ERROR, SUCCESS, UPLOADING } from "../../../../DeckEditor/modules/plugins/component/media/image/status";
import { disabledButtonStyling } from "../../../utils/disabledButtonStyling";
import { AdditionalStylesToggle } from "./AdditionalStylesToggle";
import Unsplash from "../../../../../../../common/api/sdk/services/Unsplash";
import ImageBox from "../../../../DeckEditor/modules/plugins/component/media/components/ImageElement";
import MediaGrid from "../../../../DeckEditor/modules/plugins/component/media/components/MediaGrid/MediaGrid";
import Giphy from "../../../../../../../common/api/sdk/services/Giphy";
import GiphyBox from "../../../../DeckEditor/modules/plugins/component/media/components/GiphyGridElement";
import { insertUnsplashImages } from "../../../../DeckEditor/modules/plugins/component/media/image/transforms/insertUnsplashImages";
import { EditorTransforms } from "../../../../DeckEditor/services/transforms/EditorTransforms";
import { insertGiphyImages } from "../../../../DeckEditor/modules/plugins/component/media/giphy/transforms/insertGiphyImages";
import { ACCEPTED_IMAGE_TYPES } from "../../../../DeckEditor/modules/plugins/component/media/image/components/ImageDropZone";
import { IMAGE } from "../../../../DeckEditor/modules/plugins/component/media/image/type";
import { GIPHY } from "../../../../DeckEditor/modules/plugins/component/media/giphy/type";
import { UnsplashFooter } from "../../../../DeckEditor/modules/plugins/component/media/image/components/UnsplashFooter/UnsplashFooter";
import { GiphyFooter } from "../../../../DeckEditor/modules/plugins/component/media/giphy/components/GiphyFooter/GiphyFooter";

const imageTypes = [
  { type: IMAGE, icon: <ImageSearchIcon/>, text: "Search for an image" },
  { type: GIPHY, icon: <GifIcon/>, text: "Search for a GIF animation" },
  { divider: true },
  { type: FROM_UPLOAD, icon: <PublishIcon/>, text: "Upload from computer" },
];

const getQuery = (editor) => {
  if (editor.selection) {
    const currentText = Editor.string(editor, editor.selection);
    if (currentText && currentText.length > 0) {
      return currentText;
    }
  }
  const node = EditorTransforms.activeNode(editor);
  return node && Text.isText(node) ? Node.string(node) : undefined;
};

const handleImageSelection = (mediaService, setMediaService, editor, path) => (image, query) => {
  if (path) {
    if (mediaService === IMAGE) {
      insertUnsplashImages({
        editor,
        image,
        query,
        path,
        callback: () => setMediaService(null),
      });
    } else if (mediaService === GIPHY) {
      insertGiphyImages({
        editor,
        image,
        query,
        path,
        callback: () => setMediaService(null),
      });
    }
  }
};
const MediaButtons = ({ deckId, setUploadStatus, disabled, classes }) => {
  const editor = useEditor();
  const [mediaService, setMediaService] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const containerElementPath = EditorTransforms.componentElementPath(editor);

  const onMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl !== null ? null : event.currentTarget);
    event.preventDefault();
  };

  const handleImageAction = (event, action) => {
    event.preventDefault();
    switch (action) {
      case IMAGE:
        setMediaService(IMAGE);
        break;
      case GIPHY:
        setMediaService(GIPHY);
        break;
      case FROM_UPLOAD:
        imageInputRef.current.click();
        setMediaService(null);
        break;
    }
  };

  const onSelectImage = useCallback(
    handleImageSelection(mediaService, setMediaService, editor, containerElementPath),
    [mediaService]
  );

  const onUpload = (event) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      setUploadStatus(UPLOADING);
      uploadFiles(deckId, files, {
        process: (url, name, { swatch }) => insertImage(editor, url, name, swatch),
        onSuccess: () => setUploadStatus(SUCCESS),
        onError: () => setUploadStatus(ERROR),
        clearTimeout: () => setUploadStatus(null)
      });
    }
  };
  const imageInputRef = useRef();
  return (
    <React.Fragment>
      <div
        onMouseDown={disabled ? null : handleClick}
        style={{ minWidth: 0 }}
      >
        <input
          id="toolbarUpload"
          multiple
          ref={imageInputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES}
          style={{ display: 'none' }}
          onChange={onUpload}
        />
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
            onMouseDown={(evt) => evt.preventDefault()}
          >
            <InsertPhotoIcon style={disabled ? disabledButtonStyling : {}} />

          </Button>
          <AdditionalStylesToggle
            onClose={onMenuClose}
            parentAnchorEl={anchorEl}
            disabled={disabled}
            classes={classes}
            styles={imageTypes}
            onSelect={handleImageAction}
          />
        </ButtonGroup>
      </div>

      { mediaService && (
        <MediaGrid
          maxImages={10}
          service={mediaService === IMAGE ? Unsplash : Giphy}
          onSelectImage={onSelectImage}
          onCancel={() => setMediaService(null)}
          images={[]}
          query={getQuery(editor)}
          footer={mediaService === IMAGE ? <UnsplashFooter/> : <GiphyFooter/>}>
          { mediaService === IMAGE ? <ImageBox /> : <GiphyBox /> }
        </MediaGrid>
      )}
    </React.Fragment>
  );
};
export default MediaButtons;
