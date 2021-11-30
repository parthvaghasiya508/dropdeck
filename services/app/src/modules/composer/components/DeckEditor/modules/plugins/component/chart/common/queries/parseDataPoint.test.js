import { parseDataPoint } from "./parseDataPoint";

it('parses data point with suffix', () => {
  const text = 'Total distance: 200km';
  const { label, value, suffix } = parseDataPoint(text);
  expect(label).toEqual('Total distance');
  expect(value).toEqual(200);
  expect(suffix).toEqual('km');
});

it('parses data point with prefix', () => {
  const text = 'Total sales: $200';
  const { label, value, prefix } = parseDataPoint(text);
  expect(label).toEqual('Total sales');
  expect(value).toEqual(200);
  expect(prefix).toEqual('$');
});

it('parses data point with prefix and suffix', () => {
  const text = 'Total sales: $200m';
  const { label, value, prefix, suffix } = parseDataPoint(text);
  expect(label).toEqual('Total sales');
  expect(value).toEqual(200);
  expect(prefix).toEqual('$');
  expect(suffix).toEqual('m');
});

it('parses data with commas', () => {
  const text = 'Germany, 60';
  const { label, value } = parseDataPoint(text);
  expect(label).toEqual('Germany');
  expect(value).toEqual(60);
});

it('parses data point missing a value', () => {
  const text = 'Total distance';
  const { label, value, suffix } = parseDataPoint(text);
  expect(label).toEqual('Total distance');
  expect(value).toEqual(0);
  expect(suffix).toEqual(undefined);
});

it('parses floating point values', () => {
  const text = 'Total distance, 199.5km';
  const { label, value, suffix } = parseDataPoint(text);
  expect(label).toEqual('Total distance');
  expect(value).toEqual(199.5);
  expect(suffix).toEqual('km');
});
