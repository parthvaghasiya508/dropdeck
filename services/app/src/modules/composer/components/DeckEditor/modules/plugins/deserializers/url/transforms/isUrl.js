const noProtocolPatternString = '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_\\-.~+\\#\\,]*)*'; // '(\\?[\\,;&a-z\\d%_.~+=\\-\\#]*)?' + // query string
// '(\\#[^\\#]*)?$'; // fragment locator // port and path

const protocolPattern = new RegExp('^(https?:\\/\\/)', 'i');
const noProtocolUrlPattern = new RegExp(noProtocolPatternString,'i');
const fullUrlPattern = new RegExp(`^(https?:\\/\\/)${noProtocolPatternString}`,'i');

export const isURL = (str) => fullUrlPattern.test(str);

export const isURLWithoutProtocol = (str) => noProtocolUrlPattern.test(str);

export const isMissingProtocol = (str) => !protocolPattern.test(str);
