import React from "react";
import MediaGrid from "../../components/MediaGrid/MediaGrid";
import GiphyElement from "../../components/GiphyGridElement";
import Giphy from "../../../../../../../../../../common/api/sdk/services/Giphy";
import { prompt } from "../../../../../prompt/Prompt";
import { component } from "../../../../../prompt/Question";
import { GiphyFooter } from "../components/GiphyFooter/GiphyFooter";

// Question: Ask for a keyword and perform an image search
export const promptForImageSelection = (query) => prompt(
  component({
    onKeyDown: (event, onSubmit, onCancel) => {
      switch (event.key) {
        case 'Escape':
          onCancel();
          break;
        case 'Enter':
          event.preventDefault();
          break;
        default:
      }
    },
    renderElement: (node, path, onSubmit, onCancel) => (
      <MediaGrid onSelectImage={(image, query) => onSubmit({ image, query })} onCancel={onCancel} node={node} path={path} query={query} service={Giphy} footer={<GiphyFooter/>} >
        <GiphyElement />
      </MediaGrid>
    )
  })
);
