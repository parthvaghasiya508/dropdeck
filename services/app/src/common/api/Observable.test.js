import Observable from "./Observable";

let observable = null;

beforeEach(() => {
  observable = new Observable();
});

it('supports creating observers', () => {
  expect(observable).toBeDefined();

  observable.subscribe((update) => {
    expect(update.foo).toBe("bar");
  });
  observable.subscribe((update) => {
    expect(update.foo).toBe("bar");
  });

  observable.notify({ foo: "bar" });
});

it('supports terminating the observer chain', () => {
  expect(observable).toBeDefined();

  observable.subscribe((update) => {
    expect(update.foo).toBe("bar");
    return Observable.Operation.PROCESSED;
  });

  let terminated = false;
  observable.subscribe((update) => {
    terminated = true;
  });

  observable.notify({ foo: "bar" });
  expect(terminated).toBe(false);
});

it('should support removing observers', () => {

  const observer = (update) => {
    expect(update.foo).toBe("zip");
  };
  observable.subscribe(observer);

  observable.notify({ foo: "zip" });

  observable.unsubscribe(observer);

  observable.notify({ foo: "nope" });
});
