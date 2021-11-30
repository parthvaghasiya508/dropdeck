import React from "react";
import { Node } from "slate";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { ProgressSpinner } from "../../../components/ProgressSpinner";

export const PROMPT_QUESTION_SYMBOL = Symbol('leaf question');
export const CONFIGURATION_SYMBOL = Symbol('leaf configuration');

const labelStyle = {
  pointerEvents: 'none',
  display: 'inline-block',
  verticalAlign: 'text-top',
  maxWidth: '100%',
  whiteSpace: 'nowrap',
  opacity: '0.666',
  marginRight: '10px',
  marginTop: '-2px',
};

const placeholderStyle = {
  pointerEvents: 'none',
  display: 'inline-block',
  verticalAlign: 'text-top',
  width: '0',
  maxWidth: '100%',
  whiteSpace: 'nowrap',
  opacity: '0.333',
  marginTop: '-2px',
};

/**
 * Rendering of leaf nodes (text elements) in the Slate editor.
 *
 * @type {(...args: any[]) => any}
 */
export const renderLeafWithPrompt = ({ attributes, children, leaf }) => {
  if (leaf[PROMPT_QUESTION_SYMBOL] && leaf.question) {
    const { question, node, path, onSubmit, onCancel } = leaf;
    if (question && question.renderElement) {
      const { renderElement } = question;
      return (
        <React.Fragment>
          <ClickAwayListener onClickAway={onCancel}>
            <span {...attributes}>
              { renderElement(node, path, onSubmit, onCancel) }
              { children }
            </span>
          </ClickAwayListener>
        </React.Fragment>
      );
    }

    const { label, placeholder = '' } = question;
    return (
      <React.Fragment>
        <span
          contentEditable={false}
          style={labelStyle}
        >
          {label}
        </span>
        <span
          contentEditable={false}
          style={placeholderStyle}
        >
          {Node.string(leaf).length === 0 ? placeholder : ''}
        </span>
        {children}
      </React.Fragment>
    );
  }

  if (leaf[CONFIGURATION_SYMBOL]) {
    return (
      <React.Fragment>
        <ProgressSpinner/>
        <div style={{ display: 'none' }}>
          {children}
        </div>
      </React.Fragment>
    );
  }

  return children;
};
