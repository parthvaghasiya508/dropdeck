/* eslint-disable no-await-in-loop */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import CheckIcon from '@material-ui/icons/Check';
import GenericButtonGroup from "../../../../../../../../../../common/components/buttons/GenericButtonGroup";
import Label from "../../../../../../../../../../common/components/controls/Label";
import KeyboardButtonLabel from "../../../../../../../../../../common/components/KeyboardButtonLabel";
import KeyboardSequenceLabel from "../../../../../../../../../../common/components/KeyboardSequenceLabel";
import { ModifierKey } from "../../../../../../../../../../common/components/KeyboardShortcuts";
import Breakpoints from "../../../../../../../../../../common/util/Breakpoints";
import GenericButton from "../../../../../../../../../../common/components/buttons/GenericButton";

import { logger } from "../../../../../../../../../../common/util/logger.js";
import { mediaGridStyles } from "./MediaGrid.styles";

const Portal = ({ children }) => ReactDOM.createPortal(children, document.body);

const MODAL_IMAGES = 18;

const MediaGrid = ({ service: Service, onSelectImage, query = '', preview, onCancel, update, children, footer, maxImages = 4 }) => {
  const [state, setState] = useState({
    query,
    images: [],
    update,
    selectedIndexes: [],
    focusedIndex: -1,
    page: 1,
    perPage: 18,
    showErrorMessage: false,
    fetchingImages: false,
    fetchingNewImages: false,
    insertingImages: false,
    hasMore: true,
    maximumSelected: false,
  });
  const gridRef = useRef();
  const inputRef = useRef();
  const scrollEndRef = useRef();
  const focusedImageRef = useRef();
  const scrollRef = useRef();

  useEffect(() => {
    if (gridRef.current && inputRef.current && document.activeElement !== inputRef.current) {
      gridRef.current.focus();
    }
  }, [gridRef.current]);

  const fetchInitialImages = async (perPage, initialImages, query) => {
    if (query && query.length > 0) {
      let images = [...initialImages];

      setState((prevState) => ({
        ...prevState,
        fetchingNewImages: true,
        showErrorMessage: false,
      }));

      let i = initialImages.length / MODAL_IMAGES;

      try {
        while (images.length < (scrollRef.current.clientHeight / 120 + 1) * 3) {
          const payload = await Service.search(query, i + 1, MODAL_IMAGES);
          images = [...images, ...payload.data];

          if (payload.data && payload.data.length === 0) {
            break;
          }
          i++;
        }
      } catch (e) {
        logger.error('Error while fetching images');
        logger.error(e);
      }

      setState((prevState) => ({
        ...prevState,
        page: i,
        // perPage,
        images,
        showErrorMessage: images.length === 0,
        selectedIndexes: [],
        focusedIndex: 0,
        fetchingNewImages: false,
      }));

      // if (inputRef && inputRef.current) {
      //   inputRef.current.select();
      // }
      if (gridRef.current && document.activeElement !== inputRef.current) {
        gridRef.current.focus();
      }
    }
  };

  useEffect(() => {
    if (state.query && state.query.length > 0) {
      fetchInitialImages(state.perPage, state.images, state.query);
    }
  },[]);

  useEffect(() => {
    document.removeEventListener("keydown", handleKeyDownContainer);
    document.addEventListener("keydown", handleKeyDownContainer);

    setState((prevState) => ({
      ...prevState,
      focusedIndex: 0,
    }));

    return () => {
      document.removeEventListener("keydown", handleKeyDownContainer);
    };
  }, []);

  useEffect(() => {
    document.removeEventListener("keydown", handleKeyDownImages);
    document.addEventListener("keydown", handleKeyDownImages);

    return () => {
      document.removeEventListener("keydown", handleKeyDownImages);
    };
  }, [
    state.focusedIndex,
    state.selectedIndexes,
    state.fetchingImages,
    state.images,
    document.activeElement === inputRef.current,
  ]);

  useEffect(() => {
    if (state.fetchingImages === true) {
      // scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight });
    }
  }, [state.fetchingImages]);

  useEffect(() => {
    if (state.fetchingImages === false && focusedImageRef.current) {
      const { offsetTop } = focusedImageRef.current;

      if (offsetTop < scrollRef.current.scrollTop) {
        // scrollRef.current.scrollTop = offsetTop;
        scrollRef.current.scrollTo({ top: offsetTop });
      } else if (offsetTop - scrollRef.current.scrollTop + focusedImageRef.current.clientHeight > scrollRef.current.clientHeight) {
        // scrollRef.current.scrollTop = offsetTop - scrollRef.current.clientHeight + focusedImageRef.current.clientHeight;
        scrollRef.current.scrollTo({ top: offsetTop - scrollRef.current.clientHeight + focusedImageRef.current.clientHeight });
      }
    }
  }, [focusedImageRef.current, state.focusedIndex]);

  const handleClickImage = (clickedIndex) => {
    const index = state.selectedIndexes.indexOf(clickedIndex);
    let { selectedIndexes } = state;

    if (index !== -1) {
      selectedIndexes.splice(index, 1);
    } else {
      if (state.update) {
        selectedIndexes = [];
      }
      if (selectedIndexes.length >= ((state.update) ? 1 : maxImages)) {
        setState((prevState) => ({
          ...prevState,
          maximumSelected: true,
          focusedIndex: clickedIndex,
        }));
        return;
      }
      selectedIndexes = [...selectedIndexes, clickedIndex];
    }

    setState((prevState) => ({
      ...prevState,
      selectedIndexes,
      focusedIndex: clickedIndex,
      maximumSelected: false,
    }));
  };

  const handleClickSelect = () => {
    const { focusedIndex, selectedIndexes } = state;

    let imageIndexes = [];

    if (selectedIndexes.length === 0) {
      imageIndexes = [focusedIndex];
    } else {
      imageIndexes = selectedIndexes;
    }

    setState((prevState) => ({
      ...prevState,
      insertingImages: true,
    }));

    return onSelectImage(imageIndexes.map((index) => state.images[index]), state.query);
  };

  const handleClearSelection = () => {
    setState((prevState) => ({
      ...prevState,
      hasMore: true,
      selectedIndexes: [],
      showErrorMessage: false,
      maximumSelected: false,
    }));
  };

  const handleChangeQuery = (e) => {
    const query = e.target.value;

    setState((prevState) => ({
      ...prevState,
      hasMore: true,
      query,
      showErrorMessage: false,
      maximumSelected: false,
    }));
  };

  const handleKeyDownInput = (e) => {
    if (e.keyCode === 13) {
      fetchInitialImages(state.perPage, [], state.query);
    }
  };

  const onHandleImageScroll = (e) => {
    const scrollTarget = e.target;
    const totalHeight = scrollTarget.clientHeight;
    const bottomHeight = scrollTarget.scrollHeight;
    const topHeight = scrollTarget.scrollTop;
    if ((totalHeight === bottomHeight - (topHeight + 248) || totalHeight === bottomHeight - topHeight) && state.fetchingImages === false && state.hasMore === true) {
      setState((prevState) => ({ ...prevState, page: prevState.page + 1, fetchingImages: true, maximumSelected: false }));
      Service.search(state.query, state.page + 1, MODAL_IMAGES).then((payload) => setState((prevState) => ({ ...prevState, images: [...prevState.images, ...payload.data], fetchingImages: false, hasMore: payload.data.length !== 0 })));
    }
  };

  const handleKeyDownContainer = (e) => {
    if (e.key === 'Escape') {
      onCancel();

      e.preventDefault();
      e.stopPropagation();
    } else if (e.keyCode === 70 && (e.metaKey || e.ctrlKey)) {
      inputRef.current.focus();
      inputRef.current.select();

      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleKeyDownImages = (e) => {
    let { focusedIndex } = state;

    if (document.activeElement !== inputRef.current) {
      if (e.key === 'ArrowLeft') {
        if (focusedIndex > 0) {
          focusedIndex -= 1;
        }
      } else if (e.key === 'ArrowUp') {
        if (focusedIndex > 2) {
          focusedIndex -= 3;
        }
        e.preventDefault();
        e.stopPropagation();
      } else if (e.key === 'ArrowRight') {
        if (focusedIndex < state.images.length - 1) {
          focusedIndex += 1;
        }
      } else if (e.key === 'ArrowDown') {
        if (focusedIndex < state.images.length - 3) {
          focusedIndex += 3;
        }
        e.preventDefault();
        e.stopPropagation();
      } else if (e.key === 'Enter') {
        if (state.images.length > 0) {
          handleClickSelect();
          e.preventDefault();
          e.stopPropagation();
          return;
        }

      } else if (e.keyCode === 32) {
        handleClickImage(focusedIndex);

        e.preventDefault();
        e.stopPropagation();
      }

      setState((prevState) => ({
        ...prevState,
        focusedIndex,
        maximumSelected: !!(e.keyCode === 32 && state.selectedIndexes.length >= maxImages),
      }));
    }
  };

  const useStyles = useCallback(mediaGridStyles(), []);
  const classes = useStyles();

  if (!Service) {
    logger.error(`Missing media service`);
    return null;
  }

  return (
    <Portal>
      <Grid container>
        <Grid item {...Breakpoints.editor(preview)} className={classes.root}>
          <div className={classes.outer}>
            <div style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "baseline", zIndex: 1 }}>
              <span className={classes.inputLabel}>Searching for: </span>
              <input
                ref={inputRef}
                className={classes.input}
                value={state.query}
                placeholder=" " // this fixes a weird issue with the styling when the search box is empty
                onChange={handleChangeQuery}
                onKeyDown={handleKeyDownInput}
              />
              <GenericButton secondary style={{ marginLeft: 16, padding: '3px 15px' }} onClick={onCancel}>
                Cancel
              </GenericButton>
            </div>
            <div className={classes.helper}>
              {state.maximumSelected ? (
                <div className={classes.error}>You have selected the maximum number of <b>{state.selectedIndexes.length}</b> {state.selectedIndexes.length > 1 ? "images" : "image"}.<br/>
                  Unselect to choose different images.
                </div>
              ) : (
                <Label variant="inherit">
                  Click, or use <KeyboardSequenceLabel contain separator="" characters={[<span>&larr;</span>, <span>&uarr;</span>, <span>&darr;</span>, <span>&rarr;</span>]}/> and <KeyboardButtonLabel>space</KeyboardButtonLabel> to select up to {(state.update) ? ('1 image') : (`${maxImages } images`)}.<br/>
                  Use <KeyboardButtonLabel>Enter</KeyboardButtonLabel> to confirm selection. <KeyboardSequenceLabel characters={[<ModifierKey/>, "f"]} contain/> to select a different search term.
                </Label>
              )}
            </div>
            <div className={classes.imageGridInner} onScroll={onHandleImageScroll} ref={scrollRef}>
              {
                state.images.length > 0 && (
                  <Box flex={1} width="100%">
                    <Grid
                      ref={gridRef}
                      container
                      className={classes.imageGridItems}
                      spacing={1}
                      tabIndex={-1}
                    >
                      {state.images.map((img, index) => {
                        let additionalClass = '';

                        if (state.focusedIndex === index) {
                          additionalClass = 'focused';
                        } else if (state.selectedIndexes.indexOf(index) !== -1) {
                          additionalClass = 'active';
                        }

                        const getPhotographerUrl = () => {
                          if (!img.user || !img.user.url) {
                            return;
                          }
                          if (img.user.url.indexOf("api.unsplash.com") >= 0) {
                            return `https://unsplash.com/@${img.user.url.split("/").pop()}`;
                          }
                          return img.user.url;
                        };

                        return (
                          <Grid key={index} item xs={6} sm={4} md={4} lg={4} className={`${classes.imageGridItemContainer} ${additionalClass}`} ref={state.focusedIndex === index ? focusedImageRef : null}>
                            <div className={classes.imageWrapper} onClick={() => handleClickImage(index)}>
                              {React.cloneElement(children, { img, classes, additionalClass })}
                              {state.selectedIndexes.indexOf(index) !== -1 ? (<div className={classes.checkWrapper}><CheckIcon fontSize="small" className={classes.check}/></div>) : null}
                            </div>
                            {
                              img.user ? (<a className={`${classes.photographer} photographer`} href={getPhotographerUrl()} target="_blank" rel="noreferrer">{img.user.name}</a>) : null
                            }
                          </Grid>
                        );
                      })}
                    </Grid>
                    {
                      state.fetchingImages && (
                        <CircularProgress className={classes.loadMoreSpinner} color="primary" size={20}/>
                      )
                    }
                    <div ref={scrollEndRef}/>
                  </Box>
                )
              }
              {
                (state && state.images && state.images.length === 0 && state.showErrorMessage) && (
                  <p className={classes.noResults}>No images found for &ldquo;{state.query}&rdquo;</p>
                )
              }
              {
                state.hasMore === false && state.images.length !== 0 && (
                  <p className={classes.noResults}>There are no more images.</p>
                )
              }
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 18 }}>
              <GenericButtonGroup>
                <Button disabled={state.selectedIndexes.length === 0} onClick={handleClearSelection}>
                  Clear Selection
                </Button>
                <Button color="primary" variant="contained" onClick={handleClickSelect} disabled={state.images.length < 1}>
                  <span style={{ paddingLeft: 15, paddingRight: 15 }}>
                    {state.selectedIndexes.length === 0 ? (
                      state.update ? <span>Select image</span> : <span>Select images</span>
                    ) : (state.update ? (<span>Update image</span>) : (<span>Add {state.selectedIndexes.length}{state.selectedIndexes.length > 1 ? " images" : " image"}{state.selectedIndexes.length >= maxImages ? " (MAX)" : null}</span>))}
                  </span>
                </Button>
              </GenericButtonGroup>
            </div>
            {
              ((state.insertingImages || state.fetchingNewImages) && !(state.showErrorMessage)) && (
                <div className={classes.insertSpinner}>
                  <CircularProgress color="primary" size={40}/>
                </div>
              )
            }
          </div>
          { footer }
        </Grid>
      </Grid>
    </Portal>
  );
};

function mapStateToProps(state) {
  return {
    preview: state.app.preview,
  };
}

export default connect(mapStateToProps, null)(MediaGrid);
