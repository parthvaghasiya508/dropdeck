import { useEditor } from "slate-react";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { BsCloudUpload } from "react-icons/bs";
import LinearProgress from '@material-ui/core/LinearProgress';
import { ACCEPTED, ERROR, REJECTED, REJECTED_TOO_MANY, SUCCESS, UPLOADING } from "../status";
import { uploadFiles } from "../transforms/uploadFiles";
import { FROM_UPLOAD, insertImage } from "../transforms/insertImage";
import {
  EDITOR_ELEMENT_CLASS,
  EDITOR_ELEMENT_DROPLINE,
  EDITOR_ELEMENT_DROPLINE_INACTIVE
} from "../../../../../gutter/renderElementWithGutter";
import { targetDropPath } from "../queries/targetDropPath";
import { Direction, getHoverDirection } from "../../../../../../queries/getHoverDirection";
import { imageDropZoneStyles } from "./ImageDropZone.styles";

export const IMAGE_MAX_SIZE = 1024 * 1024 * 12; // 12 MB
export const ACCEPTED_IMAGE_TYPES = 'image/jpeg, image/png, image/gif';

const showDropLine = (dropLine, hoverDirection) => {
  if (dropLine !== null) {
    dropLine.classList.remove(EDITOR_ELEMENT_DROPLINE_INACTIVE);
    if (hoverDirection) {
      const otherDirection = (hoverDirection === Direction.TOP) ? Direction.BOTTOM : Direction.TOP;
      dropLine.classList.remove(otherDirection);
      dropLine.classList.add(hoverDirection);
    }
  }
};

const hideDropLine = (dropLine) => {
  if (dropLine !== null) {
    dropLine.classList.add(EDITOR_ELEMENT_DROPLINE_INACTIVE);
    dropLine.classList.remove(Direction.BOTTOM, Direction.TOP);
  }
};

/**
 * Image drop zone component.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
export const ImageDropzone = ({ deckId, uploadStatus, setUploadStatus, ...props }) => {

  const [currentDropLine, setCurrentDropLine] = useState(null);
  const [targetPath, setTargetPath] = useState(null);
  const [previousDropLine, setPreviousDropLine] = useState(null);
  const [hoverDirection, setHoverDirection] = useState(null);
  const [progress, setProgress] = useState(0);
  const editor = useEditor();
  const useStyles = useCallback(imageDropZoneStyles(), []);
  const classes = useStyles();
  const MAX_FILES = 12;

  useEffect(() => {
    showDropLine(currentDropLine, hoverDirection);
    if (previousDropLine !== currentDropLine) {
      hideDropLine(previousDropLine);
    }
  },[currentDropLine, hoverDirection]);

  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setUploadStatus(REJECTED);
      return;
    }
    if (acceptedFiles.length > MAX_FILES) {
      setUploadStatus(REJECTED_TOO_MANY);
      return;
    }

    if (acceptedFiles.length > 0) {
      setUploadStatus(UPLOADING);
      setPreviousDropLine(currentDropLine);
      setCurrentDropLine(null);
      setHoverDirection(null);
      uploadFiles(
        deckId,
        acceptedFiles,
        {
          process: (url, name, { swatch }) => insertImage(editor, url, name, swatch, FROM_UPLOAD, { at: targetPath, direction: hoverDirection }),
          onSuccess: () => setUploadStatus(SUCCESS),
          onError: () => setUploadStatus(ERROR),
          clearTimeout: () => setUploadStatus(null),
          progress: (value) => setProgress(value)
        },
      );
      setTargetPath(null);
    }
  };

  const dragState = (props) => {
    if (uploadStatus === SUCCESS) {
      return 'success';
    }
    if (uploadStatus === ACCEPTED || props.isDragAccept) {
      return 'accepted';
    }
    if (uploadStatus === REJECTED_TOO_MANY) {
      return 'rejectedTooMany';
    }
    if (uploadStatus === REJECTED || props.isDragReject) {
      return 'rejected';
    }
    if (uploadStatus === UPLOADING) {
      return 'active';
    }
    return '';
  };

  const {
    getRootProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    maxSize: IMAGE_MAX_SIZE,
    onDrop: (acceptedFiles, rejectedFiles) => onDrop(acceptedFiles, rejectedFiles, editor),
    onDragEnter: (event) => {
      if (event.target.className === EDITOR_ELEMENT_CLASS) {
        const editorElement = event.target;
        const dropLine = editorElement.querySelector(`.${EDITOR_ELEMENT_DROPLINE}`);
        if (dropLine) {
          const direction = getHoverDirection(editorElement, event.clientY);
          const path = targetDropPath(editor, editorElement);
          if (path) {
            setTargetPath(path);
          }
          setHoverDirection(direction);
          setPreviousDropLine(currentDropLine);
          setCurrentDropLine(dropLine);
        }
      } else {
        // hideDropLine(previousDropLine);
      }
      setUploadStatus(ACCEPTED);
    },
    onDragLeave: (_) => {
      hideDropLine(currentDropLine);
      hideDropLine(previousDropLine);
      setUploadStatus(null);
    },
    accept: ACCEPTED_IMAGE_TYPES,
  });

  const onImagePaste = (e) => {
    if (e.clipboardData) {
      setUploadStatus(UPLOADING);
      const processed = editor.insertClipboardData(
        e.clipboardData,
        () => setUploadStatus(SUCCESS),
        () => setUploadStatus(ERROR),
        () => setUploadStatus(null)
      );
      if (processed) {
        e.preventDefault();
      } else {
        setUploadStatus(null);
      }
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className={classes.container} onClick={(event) => setUploadStatus(null)} onPaste={onImagePaste}>
      <section>
        <form encType="multipart/form-data">
          <div className={`${classes.dropMsg} ${dragState(getRootProps({ isDragActive, isDragAccept, isDragReject }))}`} {...getRootProps()}>
            {props.children}
            <div className="progressWrap">
              <BsCloudUpload className="progressIcon" />
              <LinearProgress className="progressBar" variant="determinate" value={progress} />
            </div>
          </div>
        </form>
      </section>
    </div>
  );
};
