export const optional = '?';
export const someNumber = '+';
export const anyNumber = '*';
export const once = '{1}';
export const between = (from, to) => `{${from !== undefined ? from : ''},${to !== undefined ? to : ''}}`;
export const exactly = (n) => `{${n}}`;
export const atLeast = (min) => between(min);
export const atMost = (max) => between(0, max);

export const Occurring = {
  once,
  optional,
  someNumber,
  anyNumber,
  between,
  exactly,
  atLeast,
  atMost,
};
