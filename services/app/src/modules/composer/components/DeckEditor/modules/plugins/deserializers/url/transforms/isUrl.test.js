import { isMissingProtocol, isURL, isURLWithoutProtocol } from "./isUrl";

it('should identify URL patterns', () => {
  expect(isURL('http://google.com/#/search')).toBeTruthy();
  expect(isURL('https://www.google.com/#/search?lang=en')).toBeTruthy();
  expect(isURL('https://www.marieclaire.fr/,11-conseils-morpho-pour-s-habiller-quand-on-est-petite,712308.asp')).toBeTruthy();
  expect(isURL('https://www.rightmove.co.uk/properties/90315703?utm_content=v2-ealertspropertyimage&utm_medium=email&utm_source=emailupdates&utm_campaign=emailupdatesinstant&utm_term=overseas&sc_id=35406740&onetime_FromEmail=true&cid=9c388dfd-43c9-40f5-8b74-3dfe9aefedfe&csg=08d9691ff719fe31491356dfc6e774bf687cf0d1c756e9ae98815ea814ae5e4d#/')).toBeTruthy();
  expect(isURL('https://www.google.com/maps/place/Cambridge/@52.1989266,0.0499476,12z/data=!3m1!4b1!4m5!3m4!1s0x47d85d89f32a012d:0x63a320e1a35e3d21!8m2!3d52.205337!4d0.121817')).toBeTruthy();
});

it('should identify URL patterns missing the protocol', () => {
  expect(isURL('google.com/#/search')).toBeFalsy();
  expect(isURLWithoutProtocol('google.com/#/search')).toBeTruthy();
  expect(isURL('www.google.com/#/search?lang=en')).toBeFalsy();
  expect(isURLWithoutProtocol('www.google.com/#/search?lang=en')).toBeTruthy();
  expect(isURLWithoutProtocol('google')).toBeFalsy();
  expect(isURLWithoutProtocol('john and bob')).toBeFalsy();
  expect(isMissingProtocol('http://google.com/#/search')).toBeFalsy();
});
