// eslint-disable-next-line no-useless-escape
const regExp = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/);
export const isDomainName = (input) => input.match(regExp);
