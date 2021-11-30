import { youTubeUrlHandler } from "./youTubeUrlHandler";

it('should accept valid YouTube URLs', () => {
  const { matches } = youTubeUrlHandler;
  expect(matches('https://www.youtube.com/watch?v=123ABCdef')).toBeTruthy();
  expect(matches('https://www.youtube.com/watch?v=sCF-mCeW7Ig')).toBeTruthy();
  expect(matches('https://www.youtube.com/watch?v=9JIc_1v7i88&feature=emb_title')).toBeTruthy();

  expect(matches('https://youtu.be/8oK9vzh5hNg')).toBeTruthy();
  expect(matches('https://www.youtube.com/embed/9JIc_1v7i88?controls=0&modestbranding=1&autohide=1&showinfo=0')).toBeFalsy();

});
