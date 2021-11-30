import ComponentService from './ComponentService';

it('correctly creates an instance', () => {
  const componentManager = ComponentService.instance();
  expect(componentManager).toBeDefined();
  expect(componentManager).toBe(ComponentService.instance());
});

it('handles capabilities', () => {
  const componentManager = ComponentService.instance();
  expect(componentManager.componentsByType).toBeDefined();
});

it('handles partial matches', () => {
  const componentManager = ComponentService.instance();
  expect(Object.keys(componentManager.suggest('t')).length).toEqual(0);
  expect(Object.keys(componentManager.suggest('ti')).length).toEqual(1);
  expect(Object.keys(componentManager.suggest('tit')).length).toEqual(1);
  expect(Object.keys(componentManager.suggest('he')).length).toEqual(1);
});
