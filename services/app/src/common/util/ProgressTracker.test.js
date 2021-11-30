import { ProgressTracker } from "./ProgressTracker";

it('support monitors that are empty', () => {
  const monitor = new ProgressTracker();
  expect(monitor.ready()).toBeTruthy();
});

it('support increasing preloader callbacks', () => {
  let all = false;
  let progress = 0;
  const monitor = new ProgressTracker(() => {
    all = true;
  }, (p) => {
    progress = p;
  });

  expect(monitor.ready()).toBeTruthy();

  const cb1 = monitor.watch(1);
  expect(monitor.state() === [false]);

  const cb2 = monitor.watch(2);
  expect(monitor.state() === [false, false]);

  const cb3 = monitor.watch(3);
  expect(monitor.state()).toStrictEqual([false, false, false]);
  expect(monitor.progress()).toBe(0);
  expect(progress).toBe(0);
  expect(monitor.ready()).toBeFalsy();

  cb2();
  expect(monitor.state()).toStrictEqual([false, true, false]);
  expect(monitor.progress()).toBe(33);
  expect(progress).toBe(33);
  expect(monitor.ready()).toBeFalsy();

  let callback = false;
  const cb4 = monitor.watch(4, () => {
    callback = true;
  });
  expect(monitor.state()).toStrictEqual([false, true, false, false]);
  expect(monitor.progress()).toBe(25);

  expect(callback).toBeFalsy();
  cb3();
  cb4();
  expect(callback).toBeTruthy();

  expect(monitor.state()).toStrictEqual([false, true, true, true]);
  expect(monitor.progress()).toBe(75);
  expect(progress).toBe(75);
  expect(monitor.ready()).toBeFalsy();

  expect(all).toBeFalsy();
  cb1();
  expect(monitor.state()).toStrictEqual([true, true, true, true]);
  expect(monitor.progress()).toBe(100);
  expect(progress).toBe(100);
  expect(monitor.ready()).toBeTruthy();

  expect(all).toBeTruthy();
});
