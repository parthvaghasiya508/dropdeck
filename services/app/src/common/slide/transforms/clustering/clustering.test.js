import {
  decode,
  encode,
  applyClustering,
  mostFrequentPair,
  nodesToTrees,
  shorten,
  stringPairs,
  treesToString,
  expand,
  label, unpack, NO_SKIP,
} from "./clustering";

it('applies a reversible encoding', () => {
  const trees = nodesToTrees(stringsToNodes("abc".split('')));
  const labels = {};
  trees.forEach((t) => {
    expect(decode(encode(t, labels), labels)).toEqual(label(t));
  });
});

it('encodes a list of trees as a string', () => {
  const trees = nodesToTrees(stringsToNodes("abc".split('')));
  expect(treesToString(trees, {})).toEqual("0/1/2");
});

it('returns all consecutive pairs of unique tree labels', () => {
  expect(stringPairs(nodesToTrees(stringsToNodes("abbc".split(''))))).toEqual(["0/1", "1/2"]);
  expect(stringPairs(nodesToTrees(stringsToNodes("abbcbbb".split(''))))).toEqual(["0/1", "1/2", "2/1"]);
});

it('finds the most frequent pair of labels in a string', () => {
  expect(mostFrequentPair(nodesToTrees(stringsToNodes("abbcabb".split(''))))).toEqual(["a", "b"]);
  expect(mostFrequentPair(nodesToTrees(stringsToNodes("acbbcbbcb".split(''))))).toEqual(["c", "b"]);
});

it('identifies a common pattern in a string', () => {
  // expect(withClustering(stringsToNodes("abbcbbb".split(''))).map((t) => label(t)).join(' -> ')).toEqual("a -> b+ -> c -> b+");
  expect(applyClustering(stringsToNodes(["h2", "img", "p", "img", "p", "img", "p", "h1", "h2", "img", "p", "img", "p", "img", "p", "img", "p"])).map((t) => label(t)).join(' -> ')).toEqual("(h2, (img, p)+) -> h1 -> (h2, (img, p)+)");
  // expect(withClustering(stringsToNodes(["h1", "h2", "bullet-list", "h2", "bullet-list"])).map((t) => label(t)).join(' -> ')).toEqual("h1 -> (h2, bullet-list)+");
});

it('shortens a sequence of identical consecutive trees', () => {
  expect(shorten(nodesToTrees(stringsToNodes("abbba".split('')))).map((t) => label(t)).join('')).toEqual("ab+a");
});

it('expands all sequences in a clustering', () => {
  expect(expand(shorten(nodesToTrees(stringsToNodes("abbba".split(''))))).map((t) => label(t)).join('')).toEqual("abbba");
});

it('clusters slide content', () => {

  const content = [
    {
      type: 'heading-one',
      path: [0],
      children: [
        { text: 'My pictures' },
      ],
    },
    {
      type: 'image',
      path: [1],
      url: 'image1.jpg',
      children: [{ text: '' }],
    },
    {
      type: 'paragraph',
      path: [2],
      children: [{ text: 'Caption 1' }],
    },
    {
      type: 'image',
      path: [3],
      url: 'image2.jpg',
      children: [{ text: '' }],
    },
    {
      type: 'paragraph',
      path: [4],
      children: [{ text: 'Caption 2' }],
    },
  ];

  const expected = [
    {
      kind: 'node',
      index: 0,
      type: 'heading-one',
      path: [0],
      node: {
        type: 'heading-one',
        path: [0],
        children: [
          { text: 'My pictures' },
        ],
      },
    },
    {
      kind: 'sequence',
      type: ['image', 'paragraph'],
      path: [1],
      index: 1,
      children: [
        {
          kind: 'cluster',
          type: ['image', 'paragraph'],
          path: [1],
          index: 1,
          children: [
            {
              kind: 'node',
              type: 'image',
              path: [1],
              index: 2,
              node: {
                type: 'image',
                path: [1],
                url: 'image1.jpg',
                children: [{ text: '' }],
              },
            },
            {
              kind: 'node',
              type: 'paragraph',
              path: [2],
              index: 3,
              node: {
                type: 'paragraph',
                path: [2],
                children: [{ text: 'Caption 1' }],
              },
            },
          ]
        },
        {
          kind: 'cluster',
          type: ['image', 'paragraph'],
          index: 4,
          path: [3],
          children: [
            {
              kind: 'node',
              type: 'image',
              path: [3],
              index: 5,
              node: {
                type: 'image',
                path: [3],
                url: 'image2.jpg',
                children: [{ text: '' }],
              },
            },
            {
              kind: 'node',
              type: 'paragraph',
              index: 6,
              path: [4],
              node: {
                type: 'paragraph',
                path: [4],
                children: [{ text: 'Caption 2' }],
              },
            },
          ]
        }
      ]
    }
  ];
  expect(applyClustering(content)).toEqual(expected);

});

it('flattens nested clusters', () => {

  const content = [
    {
      type: 'heading-one',
      path: [0],
      children: [
        { text: 'My pictures' },
      ],
    },
    {
      type: 'image',
      path: [1],
      url: 'image1.jpg',
      children: [{ text: '' }],
    },
    {
      type: 'paragraph',
      path: [2],
      children: [{ text: 'Caption 1' }],
    },
    {
      type: 'heading-one',
      path: [3],
      children: [
        { text: 'My pictures' },
      ],
    },
    {
      type: 'image',
      path: [4],
      url: 'image2.jpg',
      children: [{ text: '' }],
    },
    {
      type: 'paragraph',
      path: [5],
      children: [{ text: 'Caption 2' }],
    },
  ];

  const expected = [
    {
      kind: 'sequence',
      type: ['heading-one', 'image', 'paragraph'],
      path: [0],
      index: 0,
      children: [
        {
          kind: 'cluster',
          type: ['heading-one', 'image', 'paragraph'],
          path: [0],
          index: 0,
          children: [
            {
              kind: 'node',
              type: 'heading-one',
              path: [0],
              index: 1,
              node: {
                type: 'heading-one',
                path: [0],
                children: [
                  { text: 'My pictures' },
                ],
              },
            },
            {
              kind: 'node',
              type: 'image',
              path: [1],
              index: 2,
              node: {
                type: 'image',
                path: [1],
                url: 'image1.jpg',
                children: [{ text: '' }],
              },
            },
            {
              kind: 'node',
              type: 'paragraph',
              path: [2],
              index: 3,
              node: {
                type: 'paragraph',
                path: [2],
                children: [{ text: 'Caption 1' }],
              },
            },
          ]
        },
        {
          kind: 'cluster',
          type: ['heading-one', 'image', 'paragraph'],
          index: 4,
          path: [3],
          children: [
            {
              kind: 'node',
              type: 'heading-one',
              path: [3],
              index: 5,
              node: {
                type: 'heading-one',
                path: [3],
                children: [
                  { text: 'My pictures' },
                ],
              },
            },
            {
              kind: 'node',
              type: 'image',
              path: [4],
              index: 6,
              node: {
                type: 'image',
                path: [4],
                url: 'image2.jpg',
                children: [{ text: '' }],
              },
            },
            {
              kind: 'node',
              type: 'paragraph',
              index: 7,
              path: [5],
              node: {
                type: 'paragraph',
                path: [5],
                children: [{ text: 'Caption 2' }],
              },
            },
          ]
        }
      ]
    }
  ];
  expect(applyClustering(content)).toEqual(expected);

});

it('unpacks sequences', () => {

  const content = [
    {
      type: 'heading-one',
      children: [
        { text: 'My pictures' },
      ],
    },
    {
      type: 'image',
      url: 'image1.jpg',
      children: [{ text: '' }],
    },
    {
      type: 'image',
      url: 'image2.jpg',
      children: [{ text: '' }],
    },
    {
      type: 'paragraph',
      children: [{ text: 'Caption 2' }],
    },
  ];

  expect(applyClustering(content, NO_SKIP, false).length).toEqual(3);
  expect(unpack(applyClustering(content, NO_SKIP, false))[0].length).toEqual(4);
  expect(unpack(applyClustering(content, NO_SKIP, false))[1][0]).toEqual(0);
  expect(unpack(applyClustering(content, NO_SKIP, false))[1][1]).toEqual(1);
  expect(unpack(applyClustering(content, NO_SKIP, false))[1][2]).toEqual(3);
});

/**
 * Generates an array of disjoint trees, one tree for every string in the input array.
 *
 * @param arr string array to generate an ordered forest (disjoint trees) from.
 * @returns {[]}
 */
const stringsToNodes = (strings) => strings.map((s) => ({ type: s }));
