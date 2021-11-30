# Expression language to match remixes with slide structure

We define a language for programmatically defining rules that can be evaluated against an arbitrary content structure. The main use case is to match slides with suitable remixes.  

## Data model

Each rule is evaluated against a _clustered_ representation of a slide structure, represented as an array of tree-like data structures with the following properties:

```
{
  kind: "cluster" | "sequence" | "node",
  type: <type of slide component described by the node>
}
```

### Node elements
A `node` element contains a reference to a particular Slate content node (property `node`). For example:

```
{
  kind: "node",
  type: "heading-one",
  node: {
    type: "heading-one",
    children: [ { text: "My slide deck" } ],
  } 
}
```  

### Sequence elements
A `sequence` element contains a reference to the content nodes that were rolled up into a sequence. Its `type` is the (uniform) type of its child nodes:

```
{
  kind: "sequence",
  type: "heading-one",
  children: [
    {
      type: "heading-one",
      children: [ { text: "First heading" } ],
    },
    {
      type: "heading-one",
      children: [ { text: "Second heading" } ],
    },
  ],
}
```  

### Cluster elements
A `cluster` element contains a reference to the content nodes that were rolled up into a cluster (in the right order). Its `type` is a list of its child node types.

```
{
  kind: "cluster",
  type: ["heading-one", "image"],
  children: [
    {
      type: "heading-one",
      children: [ { text: "My slide deck" } ],
    },
    {
      type: "image",
      ...,
    },
  ],
}
```


## Syntax

### Match expressions
Match expressions specify a condition for the number of occurrences of a particular component or pattern. We have the following expressions:

- `AtLeast(n)`: Matched when the number of occurrences of a rule is at least `n`.
- `LessThan(n)`: Matched when the number of occurrences of a rule is less than `n`.
- `Between(min, max)`: Matched when the number of occurrences of a rule is at least `min` and most `max`, both inclusive.
- `Exactly(n)`: Matched when the number of occurrences of a rule is exactly `n`.
- `Any()`: Matched for any number of occurrences of the given rule. Logically equivalent to `AtLeast(0)`.
- `Even`: Matched when the number of occurrences of a rule is even.
- `Odd`: Matched when the number of occurrences of a rule is odd.
- `Modulo(mod, rem)`: Matched when the number of occurrences of a rule leaves a remainder of `rem` after integer division by `mod`.

### Component rules
Each editor component has a matching component rule, that takes an optional matching expression, defined above:

- `paragraph(matcher)`
- `headingOne(matcher)`
- `headingTwo(matcher)`
- `image(matcher)`
- `quote(matcher)`
- `bulletedList(matcher)`
- `numberedList(matcher)`

### Boolean rules
- `or(...rules)`: Matched when any one of the rules are matched.
- `and(...rules)`: Matched when all of the rules are matched.
- `exactlyOne(...rules)`: Matched when _exactly one_ of the rules are matched.

### Collection rules
- `exhaustive(rules)`: This is the default way we evaluate rules, and matches the existing remix matching behaviour. That is to say, we match a slide if the slide matches all of the rules listed _and_ there are not extraneous elements.
- `sequence(rule, matcher)`: Matched when the set of all sequences of elements that match `rule` satisfy the `matcher`. For example, `sequence(image(), AtLeast(2))` is matched when there are at least two sequences of `image` elements.
- `cluster(rule, matcher)`: Matched if there is a cluster of elements that matches `rule`. For example, a `cluster(and(image(), paragraph()))` would be matched by all clusters of (`image`, `paragraph`) pairs

Note that all of these rules can be nested. For example, we can ask for sequences of clusters (which may contain sequences). See further examples below.

### Order rule
The `order` rule accepts a list of rules and will match a slide if, and only if, that list of rules is matched in the exact order they appear:

```
order(rule_1, ..., rule_n)
```

For example, consider a slide with the following simplified structure:

```
img
paragraph
paragraph
img
```

Then the following rules will match this slide structure:

- `order(image(Exactly(1)), paragraph(AtLeast(1)))`
- `order(paragraph(Exactly(1)), image(Exactly(1)))`
- `order(paragraph(AtLeast(1)), image(Exactly(1)))`

However, the following rule will _not_ match:

- `order(image(AtLeast(21)), paragraph(AtLeast(1)))`


For example, consider a rule that sets a bright red border around a slide:

```
engine.register(new Remix('order-example', {
  border: '10px red solid',
},
order(
  headingOne(Exactly(1)),
  image(Exactly(1))
)));
```

This remix will be triggered for pairs of `h1, image` but _not_ `image, h1` pairs. 

### Labelling rule
The rule `label(rule, tag)` can be used to tag, or label, the result of an individual rule. This rule reflects the matching and score of the delegate `rule` and only adds the label `tag` when there is a match. The string label can be used e.g. when generating HTML markup for a slide, as a CSS class to target particular sections of the slide structure.

### Boosting rule
The rule `boost(rule, tag)` can be used to boost the score of an individual `rule`. The score computed for `rule` against a slide data model is multiplied by a factor of `weight`. See section on rule ranking, below, for more details.

### Shorthand rules
- `text(matcher)`: Matches any text element (paragraph, titles, lists or quotes).
- `list(matcher)`: Shorthand for `bulletedList(matcher)` _or_ `numberedList(matcher)`.
- `anyElement(matcher)`: Matched any element, according to the matching condition.

### Examples

The following rule matches all sequences of clusters that contain at least one element.

```
sequence(
  cluster(anyElement(AtLeast(1)))
)
```

The following rule matches all sequence of (`image, paragraph`) clusters:

```
sequence(
  cluster(
    ordered(
      image(Exactly(1)), 
      paragraph(Exactly(1))
    )
  )
)

```

## Ranking of rules

When evaluating multiple rules against a data model, we compute a non-negative score for each rule, with a higher score indicating a better fit against the model. 

To do that, we define a scoring function `score(rule, slide)` as follows. When the `rule` does not match the content of `slide` then `score(rule, slide) = 0`. When the `rule` matches the contents of `slide` we inductively define the `score` function as follows. 


### Component rules

For a matching component rule `component(matcher)` (for example, `image(Exactly(2))`) we define `score(rule, slide)`= `score(matcher)` where `score(matcher)` is defined as:

- `score(AtLeast(n)) := n + 1`;
- `score(LessThan(n)) := n`;
- `score(Between(min, max)) := min + max + 2 = score(AtLest(min)) + score(LessThan(max + 1))`;
- `score(Exactly(n)) := 2n + 2` - note that this is consistent with `score(AtLeast(n)) + score(LessThan(n+1))` which agrees with the definition of composite `and` rules below;
- `score(Any()) = score(AtLeast(0)) = 1`.
- `score(Modulo(mod, rem)) := mod`;
- `score(Even()) = score(2, 0) = 2`;
- `score(Odd()) = score(2, 1) = 2`.

For example, we would then have `score(image(Exactly(3)) = 8`.

### Boolean rules

We inductively the score of Boolean connective rules as follows:

- `score(and(r_1, ..., r_n), slide) := score(r_1, slide) + ... + score(r_n, slide)`.
- `score(or(r_1, ..., r_n), slide) := max { score(r_1, slide) + ... + score(r_n, slide) }`.
- `score(exactlyOne(r_1, ..., r_n), slide) := max { score(r_1, slide) + ... + score(r_n, slide) }`.

### Collection rules

We inductively the score of collection rules as follows:

#### Exhaustive rule
Consider the standard "unordered" rule `exhaustive(r_1, ..., r_n)` and a slide `slide`. Recall that this rule matches only when all of the rules `r_1, ..., r_n` match _and_ there are not additional unspecified/unmatched elements on the slide. Suppose `S` is the set of all of the components specified collectively in the rules `r_1, ..., r_n` (say if these are `image(), paragraph()` then `S` consists of `{image, paragraph}`) and let `T(r_1, ..., r_n) = { t_1, ..., t_m }` be the set of all components _not_ listed in the rules. Then `rule(r_1, ..., r_n)` is the same as saying that all of the rules `r_1, ..., r_n` have to be matched _and_ there are no ocurrences of `t_1, ..., t_m` in the `slide`. In other words, we have the following logical equivalence:

```
rule(r_1, ..., r_n) := and(r_1, ..., r_n, t_1(Exactly(0)), ..., t_m(Exactly(0)))
```

Therefore, we define

```
score(exhaustive(r_1, ..., r_n), slide) := score(and(r_1, ..., r_n), slide) + 2 * |T(r_1, ..., r_n)|
```

which is consistent with our basic definition of matcher scoring, above (recall the `score(Exactly(0)) = 2`).
 
#### Sequence rule
The score of a sequence rule in a matching `slide` is defined as follows. Let `seqScore` be the score of `rule` in any one of the matching sequences occurring in `slide` of the given type. By definition, since the same rule is applied to all of the sequences, they will tally up the same score irrespectively of length. Then we define:

```
score(sequence(rule, matcher), slide) := score(matcher) * seqScore
```

**Example**: Say `rule = image(AtLeast(3))` and we have the slide:

```
paragraph
sequence
    image
    image
    image
paragraph
sequence
    image
    image
paragraph
sequence
    image
    image
    image
    image
```

Here there are three sequences of `image` elements: of lengths 2, 3 and 4. The rule `image(AtLeast(3))` will match in two of those sequences, and even though the sequences vary they score will the same for both: `seqScore = score(AtLeast(3)) = 3 + 1 = 4`. The overall score of the rule `sequence(image(AtLeast(3)), AtLeast(2))` will therefore be:

```
score(AtLeast(2)) * seqScore = (2 + 1) * 4 = 12.
```

#### Cluster and order rules
The score of a `cluster` rule in a matching `slide` is defined as:

```
score(cluster(r_1, ..., r_n), slide) := score(and(r_1, ..., r_n), slide) * n
```
This definition reflects that clusters of longer sequences of elements (of length `n` here) are objectively rarer to occur and should be weighted higher. The score of an `order` rule is defined in the same way.

