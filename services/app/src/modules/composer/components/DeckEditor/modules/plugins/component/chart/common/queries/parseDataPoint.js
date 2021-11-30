export const parseDataPoint = (text, defaultValue = 0) => {
  const dataPointPattern = /([^,:]+)(\s*[,:\s]\s*)([^0-9]*)(([0-9]*[.])?[0-9]+)(.*)/g;
  if (text !== undefined && text.length > 0) {
    const match = dataPointPattern.exec(text);
    let label = text;
    let value = defaultValue;
    let suffix;
    let prefix;
    let integerPart;
    let separator;
    if (match) {
      [, label, separator, prefix, value, integerPart, suffix] = match;
    }
    let parsedValue = integerPart === undefined ? parseInt(value, 10) : parseFloat(value, 10);
    if (Number.isNaN(parsedValue)) {
      parsedValue = defaultValue;
    }
    return {
      id: label,
      label,
      value: parsedValue,
      suffix,
      prefix,
      separator
    };
  }
  return undefined;
};
