import { vimeoUrlHandler } from "./vimeoUrlHandler";

it('should accept valid Vimeo URLs', () => {
  const { matches } = vimeoUrlHandler;
  expect(matches('https://vimeo.com/1234')).toBeTruthy();
  expect(matches('https://vimeo.com/channels/staffpicks/1234')).toBeTruthy();
  expect(matches('https://vimeo.com/groups/movietrailer/videos/396557583')).toBeTruthy();
});
