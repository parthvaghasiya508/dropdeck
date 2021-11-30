import { withNumbering } from "./withNumbering";
import { emptyParagraph } from "../../../remix/RemixEngine";
import { TYPE_CLUSTER, TYPE_NODE, TYPE_SEQUENCE } from "./Types";
import { GROUP } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/groups/components/group/type";
import { GROUP_COLLECTION } from "../../../../modules/composer/components/DeckEditor/modules/plugins/component/groups/type";

const SEPARATOR = "/";

export const NO_SKIP = (node) => false;

export const transformToSlideMarkup = (nodes, skip = emptyParagraph) => withNumbering(nodesToTrees(nodes, skip));

/**
 * Inspects an array of content nodes to look for sequences elements. This does not generate clusters.
 *
 * @param arr array of objects, each of which is identified by a type property.
 * @param generateTrees whether to turn the nodes into tree structures.
 *  Only there in case some pre-processing has already done this.
 * @returns {[]}
 */
export const applySequencing = (nodes, skip = NO_SKIP, { generateTrees = true, collapseTypes } = {}) => {
  let trees = generateTrees ? nodesToTrees(nodes) : nodes;
  trees = shorten(trees, skip, collapseTypes);
  return withNumbering(trees);
};

/**
 * Inspects an array of content nodes to look for recurring patterns of elements.
 *
 * @param arr array of objects, each of which is identified by a type property.
 * @param generateTrees whether to turn the nodes into tree structures.
 *  Only there in case some pre-processing has already done this.
 * @returns {[]}
 */
export const applyClustering = (nodes, skip = NO_SKIP, generateTrees = true) => {
  const labels = {};
  let trees = generateTrees ? nodesToTrees(nodes) : nodes;
  let length;
  do {
    length = trees.length;
    const pair = mostFrequentPair(trees, labels, skip);
    if (pair !== undefined && pair.length === 2) {
      trees = reduce(trees, pair, skip);
    }
    trees = shorten(trees, skip);
  } while (trees.length < length); // continue as long as we are reducing the representation

  return withNumbering(trees);
};

/**
 * Reduces a list of tree nodes by contracting all neighbouring pairs of tree nodes that match the
 * types given by the <em>pair</em> (which is a two-element array of node types).
 *
 * @param trees list of tree nodes.
 * @param pair a two-element array of tree node types.
 * @param skip an optional function to evaluate which nodes to skip.
 * @returns {[]}
 */
const reduce = (trees, pair, skip = NO_SKIP) => {
  const reducedTrees = [];
  if (pair !== undefined && pair.length === 2) {
    let i = 0;
    while (i < trees.length) {
      if (!skip(trees[i])) {
        if (i < trees.length - 1) {
          if (label(trees[i]) === pair[0] && label(trees[i + 1]) === pair[1]) {
            const left = trees[i];
            const leftChildren = left.kind === TYPE_CLUSTER ? left.children : [left];
            const right = trees[i + 1];
            const rightChildren = right.kind === TYPE_CLUSTER ? right.children : [right];
            const children = [...leftChildren, ...rightChildren];
            const cluster = {
              type: children.map((c) => c.type),
              path: trees[i].path,
              children,
              kind: TYPE_CLUSTER,
            };
            reducedTrees.push(cluster);
            i += 2;
          } else {
            reducedTrees.push(trees[i]);
            i++;
          }
        } else {
          reducedTrees.push(trees[i]);
          i++;
        }
      } else {
        i++;
      }
    }
  }
  return reducedTrees;
};

/**
 * Produces a label for a given tree node.
 */
export const label = (tree) => {
  switch (tree.kind) {
    case TYPE_SEQUENCE:
      return tree.children.length > 0 ? `${label(tree.children[0])}+` : null;
    case TYPE_CLUSTER:
      return tree.type === GROUP ? GROUP : `(${tree.children.map((t) => label(t)).join(', ')})`;
    default:
      return tree.type;
  }
};

/**
 * Roll up consecutive nodes of the same type into a grouped sequence.
 */
export const shorten = (trees, skip = NO_SKIP, collapseTypes) => {
  const reducedTrees = [];
  let sequence;
  let lastType;
  for (let i = 0; i < trees.length; i++) {
    const tree = trees[i];
    let handled = false;
    if (!skip(tree)) {

      // Roll up the previous sequence.
      if (sequence !== undefined) {
        if (label(tree) === lastType) {
          sequence.children.push(tree);
          handled = true;
        } else {
          reducedTrees.push(sequence);
          sequence = undefined;
        }
      }

      if (!handled) {

        // If we have a finite list of types to collapse into sequences, we can
        // safely skip all other types.
        if (collapseTypes !== undefined && !collapseTypes.includes(tree.type)) {
          reducedTrees.push(tree);
          continue;
        }

        // Determine whether to create a new sequence or not.
        if (i < trees.length - 1 && label(tree) === label(trees[i + 1]) && !skip(trees[i + 1])) {
          sequence = {
            children: [tree],
            kind: TYPE_SEQUENCE,
            type: tree.type,
            path: tree.path,
          };
          lastType = label(tree);
        } else {
          reducedTrees.push(tree);
        }
      }
    }
  }

  if (sequence !== undefined) {
    reducedTrees.push(sequence);
  }
  return reducedTrees;
};

/**
 * Searches for the most common pair of consecutive, non-identical trees in a sequence.
 *
 * @param trees
 * @param labels
 * @returns {*}
 */
export const mostFrequentPair = (trees, labels = {}, skip = NO_SKIP) => {
  const pairs = stringPairs(trees, labels, skip);
  let result;
  let max = -1;
  if (pairs && pairs.length > 0) {
    const encodedTree = treesToString(trees, labels);
    // eslint-disable-next-line array-callback-return
    pairs.map((pair) => {
      const matches = encodedTree.match(new RegExp(pair, 'gi'));
      if (matches !== null) {
        const count = matches.length;
        if (count > max) {
          max = count;
          const encoded = pair.split(SEPARATOR);
          for (let i = 0; i < encoded.length; i++) {
            encoded[i] = decode(encoded[i], labels);
          }
          result = encoded;
        }
      }
    });
  }
  return max >= 2 ? result : undefined;
};

/**
 * Finds all pairs of consecutive, non-identical trees in a list of trees, unique up to labelling.
 *
 * @param trees an array of trees.
 * @returns {string[]}
 */
export const stringPairs = (trees, labels = {}, skip = NO_SKIP) => {
  const substrings = {};
  for (let i = 0; i < trees.length; i++) {
    if (!skip(trees[i])) {
      if (i < trees.length - 1) {
        if (encode(trees[i], labels) !== encode(trees[i + 1], labels)) {
          const key = treesToString([trees[i], trees[i + 1]], labels, skip);
          if (!substrings.hasOwnProperty(key)) {
            substrings[key] = true;
          }
        }
      }
    }
  }
  return Object.keys(substrings);
};

/**
 * Encodes a list of trees as a unique string, using a global label function.
 *
 * @param trees a list of trees.
 * @param labels a function that maps tree nodes to integer labels.
 * @returns {*}
 */
export const treesToString = (trees, labels = {}, skip = NO_SKIP) => trees.map((t) => (skip(t) ? null : encode(t, labels))).join(SEPARATOR);

/**
 * Looks up the cleartext for an encoded label. The assumption is that the labels mapping is a 1-1 function;
 * if not, this method simply returns the first domain value that maps to the given encoded label.
 *
 * @param s a string to decode.
 * @param labels a mapping of tree labels to global labels, for easier string matching.
 * @returns {string|*}
 */
export const decode = (s, labels = {}) => {
  const keys = Object.keys(labels);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (labels[key] === parseInt(s, 10)) {
      return key;
    }
  }
  return undefined;
};

/**
 * Returns a string encoding of a tree, using the association of tree nodes to labels. If the tree does
 * not have an existing global label, we compute a new one and update the label map.
 *
 * @param tree a tree to encode.
 * @param labels a mapping of tree labels to global labels, for easier string matching.
 * @returns {string|*}
 */
export const encode = (tree, labels = {}) => {
  const treeLabel = label(tree);
  if (!treeLabel) {
    return '';
  }
  if (!labels.hasOwnProperty(treeLabel)) {
    const encoding = Object.keys(labels).length++;
    labels[treeLabel] = encoding;
  }
  return labels[treeLabel];
};

/**
 * Generates an array of disjoint trees, one tree for every node in the input array.
 *
 * @param nodes array of content nodes ({ type: string, ... props}) to generate an ordered forest (disjoint trees) from.
 * @returns {[]}
 */
export const nodesToTrees = (nodes, skip = NO_SKIP) => {
  const trees = [];
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    if (!skip(node)) {
      if (node.type === GROUP_COLLECTION) {
        const { children } = node;
        if (children && children.length > 0) {
          const childTrees = nodesToTrees(children, skip);

          // Single-element collections are unpacked until we resolve:
          // https://github.com/dropdeck-com/dropdeck/issues/2316
          if (childTrees.length === 1) {
            const nodeTrees = childTrees[0].children;
            if (nodeTrees && nodeTrees.length > 0) {
              trees.push(...nodeTrees);
            }
          } else if (childTrees.length > 1) {
            trees.push({
              type: [GROUP],
              path: node.path,
              children: childTrees,
              kind: TYPE_SEQUENCE,
            });
          }
        }
      } else if (node.type === GROUP) {
        const { children } = node;
        if (children && children.length > 0) {
          const childTrees = nodesToTrees(children, skip);
          trees.push({
            type: GROUP,
            path: node.path,
            children: childTrees,
            kind: TYPE_CLUSTER,
          });
        }
      } else {
        trees.push({
          node,
          kind: TYPE_NODE,
          type: node.type,
          path: node.path,
        });
      }
    }
  }
  return trees;
};

/**
 * Given an array of trees, we unpack all sequences by replacing sequence nodes with their constituents.
 *
 * @param trees
 */
export const unpack = (trees) => {
  let unpacked = [];
  const ranges = {};
  let shift = 0;
  for (let i = 0; i < trees.length; i++) {
    const tree = trees[i];
    ranges[i] = shift;
    if (tree.kind === TYPE_SEQUENCE) {
      unpacked = unpacked.concat(tree.children);
      shift += tree.children.length;
    } else {
      unpacked.push(tree);
      shift++;
    }
  }
  return [unpacked, ranges];
};

/**
 * Recursively replace all sequence nodes with the elements of the sequences.
 */
export const expand = (trees) => {
  const [unpacked] = unpack(trees);
  return unpacked;
  // if (!Array.isArray(trees)) {
  //   if (trees.kind === TYPE_SEQUENCE) {
  //     return expand(trees.children);
  //   }
  //   return trees;
  // }
  // return trees.map((tree) => expand(tree));
};
