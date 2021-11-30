import { SignalSensor } from "./SignalSensor";

it('can time objects', async () => {
  const metrics = SignalSensor.instance().init();
  const timer1 = metrics.time("foo");
  await new Promise((r) => setTimeout(r, 1010));
  timer1.end();

  const timer2 = metrics.time("foo");
  await new Promise((r) => setTimeout(r, 1010));
  timer2.end();

  expect(metrics.flush()[0].time).toBe(2);
});

it('can automatically close timers', async () => {
  const metrics = SignalSensor.instance().init();
  metrics.auto("foo");
  await new Promise((r) => setTimeout(r, 1010));

  metrics.auto("bar");
  await new Promise((r) => setTimeout(r, 1010));

  metrics.auto("foo");
  await new Promise((r) => setTimeout(r, 1010));

  const timers = metrics.flush();

  expect(timers[0].time).toBe(2);
  expect(timers[1].time).toBe(1);
});

it('will not start timer again if same value is provided twice', async () => {
  const metrics = SignalSensor.instance().init();
  metrics.auto("foo");
  await new Promise((r) => setTimeout(r, 1010));

  metrics.auto("foo");
  await new Promise((r) => setTimeout(r, 1010));

  const timers = metrics.flush();

  expect(timers[0].time).toBe(2);
});

it('can automatically close timers and does not count if not visible', async () => {
  const metrics = SignalSensor.instance().init();
  metrics.auto("foo");
  await new Promise((r) => setTimeout(r, 1010));

  metrics.auto("bar");
  await new Promise((r) => setTimeout(r, 1010));

  metrics.auto("foo", false);
  await new Promise((r) => setTimeout(r, 1010));

  const timers = metrics.flush();

  expect(timers[0].time).toBe(1);
  expect(timers[1].time).toBe(1);
});
