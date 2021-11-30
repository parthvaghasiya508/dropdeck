import React from "react";
import ReactHtmlParser from "react-html-parser";
import { chooseRemix } from "../../../../../common/slide/transforms";
import { emptyParagraph, RemixEngine } from "../../../../../common/remix/RemixEngine";
import { TYPE_CLUSTER, TYPE_NODE, TYPE_SEQUENCE } from "../../../../../common/slide/transforms/clustering/Types";
import * as Slide from "../../../../../common/model/Markup";
import { Markup } from "../../../../../common/model/Markup";
import { cssClassName } from "./cssClassName";
import { getMarkupType } from "./getMarkupType";

const defaultWrapElement = (type, path, element) => (<div className="element">{ element }</div>);

/**
 * Translate {@link Slide} to JSX elements.
 */
export default class SlideMarkupBuilder {

  constructor(wrapElement) {
    this.wrapElement = wrapElement || defaultWrapElement;
  }

  /**
   * Transform a list of markup nodes to JSX elements.
   *
   * @param slide
   * @param onClick
   * @returns {[]}
   */
  build(slide, onClick, onDragHover) {
    const remixName = chooseRemix(slide);
    let labels = {};
    if (remixName) {
      const remix = RemixEngine.instance.get(remixName);
      if (remix) {
        const [, hits] = remix.evaluate(slide.markup);
        labels = hits;
      }
    }
    return this.mapToElements(slide.markup, labels, false, onClick, false, onDragHover);
  }

  mapToElements = (nodes = 0, labels = {}, hasContainer = false, onClick, skipGrouping = false, onDragHover) => {
    const elements = [];
    let currentLabel;
    let currentGroup;
    let groupCount = 0;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const element = this.mapToElement(node, labels, hasContainer, onClick, onDragHover);
      if (element !== null) {
        const key = labelKey(node);
        if (!skipGrouping && key && labels[key] && labels[key].length > 0) {
          const newLabel = labels[key];
          if (currentLabel === undefined || currentLabel !== newLabel) {
            if (currentLabel !== undefined && currentGroup !== undefined && currentGroup.length > 0) {
              elements.push(this.toGroupElement(currentGroup, groupCount++, currentLabel));
            }
            currentGroup = [<React.Fragment key={`e${i}`}>{element}</React.Fragment>];
            currentLabel = newLabel;
          } else {
            currentGroup.push(<React.Fragment key={`e${i}`}>{element}</React.Fragment>);
          }
        } else {
          if (currentLabel !== undefined && currentGroup !== undefined && currentGroup.length > 0) {
            elements.push(this.toGroupElement(currentGroup, groupCount++, currentLabel));
            currentGroup = undefined;
            currentLabel = undefined;
          }
          elements.push(<React.Fragment key={`e${i}`}>{element}</React.Fragment>);
        }
      }
    }

    if (currentLabel !== undefined && currentGroup !== undefined && currentGroup.length > 0) {
      elements.push(this.toGroupElement(currentGroup, groupCount++, currentLabel));
    }

    return elements;
  };

  toGroupElement = (group, index, label) => (
    <div key={`g${index}`} className={`group ${label}`} data-length={group.length}>{group}</div>
  );

  mapToElement = (tree, labels = {}, hasContainer = false, onClick, onDragHover) => {
    switch (tree.kind) {
      case TYPE_CLUSTER:
        return this.clusterToElement(tree, labels, onClick, onDragHover);
      case TYPE_SEQUENCE:
        return this.sequenceToElement(tree, labels, onClick, onDragHover);
      case TYPE_NODE:
        return this.markupToElement(tree.node, hasContainer, onClick, onDragHover);
      default:
        return null;
    }
  };

  markupToElement = (markup, hasContainer = false, onClick, onDragHover) => {
    if (emptyParagraph(markup)) {
      return null;
    }

    let innerElement = null;
    const { path, type } = markup;
    if (markup.renderer === Markup.Renderer.HTML) {
      innerElement = ReactHtmlParser(markup.data.html);
    } else if (markup.renderer === Markup.Renderer.REACT) {
      innerElement = markup.data.component;
    }

    if (innerElement !== null) {
      innerElement = this.wrapElement(type, path, innerElement);
      if (hasContainer) {
        return innerElement;
      }
      if (onClick !== undefined) {
        return <div className={`container container-${getMarkupType(markup)}`} style={{ cursor: 'pointer' }} onClick={onClick(path)} onDragEnter={(evt) => onDragHover(evt, path)} role="navigation">{innerElement}</div>;
      }
      return <div className={`container container-${getMarkupType(markup)}`}>{innerElement}</div>;
    }
    return null;
  };

  sequenceToElement = (sequence, labels = {}, onClick, onDragHover) => {
    if (sequence.children && sequence.children.length > 0) {
      const sequenceClassName = cssClassName(sequence, 'sequence-');
      const containerClassName = cssClassName(sequence, 'container-');
      if (onClick !== undefined) {
        // Don't attach on-click event when we have a sequence of clusters:
        const hasClusters = sequence.children[0].kind === TYPE_CLUSTER;
        if (!hasClusters) {
          return (
            <div className={`sequence ${sequenceClassName} container ${containerClassName}`}
              onClick={onClick(sequence.path, sequence)} role="navigation"
              onDragEnter={(evt) => onDragHover(evt, sequence.path, sequence)}
              data-length={sequence.children.length}>{this.mapToElements(sequence.children, labels, true, onClick, allHaveSameLabel(sequence.children, labels), onDragHover)}
            </div>
          );
        }
      }
      return (
        <div className={`sequence ${sequenceClassName} container ${containerClassName}`}
          data-length={sequence.children.length}>{this.mapToElements(sequence.children, labels, true, onClick, allHaveSameLabel(sequence.children, labels), onDragHover)}
        </div>
      );
    }
    return null;
  };

  clusterToElement = (cluster, labels = {}, onClick, onDragHover) => {
    if (cluster.children && cluster.children.length > 0) {
      const className = cssClassName(cluster);
      return (<div className={`cluster ${className}`}>{this.mapToElements(cluster.children, labels,false, onClick, allHaveSameLabel(cluster.children, labels), onDragHover)}</div>);
    }
    return null;
  };

}

const labelKey = (node) => (node.index !== undefined ? `${node.index}` : undefined);

const allHaveSameLabel = (nodes, labels) => {
  if (nodes.length > 0 && labels[labelKey(nodes[0])] === undefined) {
    return false;
  }
  let currentLabel;
  for (let i = 0; i < nodes.length; i++) {
    const key = labelKey(nodes[i]);
    const newLabel = key ? labels[key] : undefined;
    if (currentLabel !== undefined) {
      if (newLabel !== currentLabel) {
        return false;
      }
    }
    currentLabel = newLabel;
  }
  return true;
};
