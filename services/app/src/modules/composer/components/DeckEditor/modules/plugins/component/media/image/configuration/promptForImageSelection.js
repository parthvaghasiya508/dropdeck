import React from "react";
import MediaGrid from "../../components/MediaGrid/MediaGrid";
import ImageElement from "../../components/ImageElement";
import Unsplash from "../../../../../../../../../../common/api/sdk/services/Unsplash";
import { prompt } from "../../../../../prompt/Prompt";
import { component } from "../../../../../prompt/Question";
import { UnsplashFooter } from "../components/UnsplashFooter/UnsplashFooter";

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
      <MediaGrid maxImages={10} onSelectImage={(image, query) => onSubmit({ image, query })} onSubmit={onSubmit} onCancel={onCancel} node={node} path={path} query={query} service={Unsplash} footer={<UnsplashFooter/>}>
        <ImageElement />
      </MediaGrid>
    )
  })
);
