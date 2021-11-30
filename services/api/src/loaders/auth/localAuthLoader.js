import passport from "passport";
import { Person } from '@dropdeck/schema';
import { AuthService } from "../../services/auth/AuthService";

const LocalStrategy = require('passport-local').Strategy;

// Capitalise the first character of a word.
export const capitalise = (string) => (
  string !== undefined && string !== null && string.length > 0 ?
    string.replace(/^\w/, (c) => c.toUpperCase()) : string
);

const parse = (username) => {
  let givenName = username;
  let familyName = '';
  let domain = username;
  const i = username.indexOf('@');
  if (i > 0) {
    domain = capitalise(username.substring(i + 1));
    const name = username.substring(0, i);
    const [first, last] = name.split('\.');
    if (first) {
      givenName = capitalise(first);
    }
    if (last) {
      familyName = capitalise(last);
    }
  }
  return { domain, givenName, familyName };
};

/**
 * Local username and password authentication.
 */
export const STRATEGY_LOCAL = 'local';
export const localAuthLoader = () => {

  passport.use(STRATEGY_LOCAL, new LocalStrategy({ passReqToCallback: true },
    async (request, username, password, done) => {
      const { domain, familyName, givenName } = parse(username);
      AuthService.validate({
        httpRequest: request,
        provider: STRATEGY_LOCAL,
        profile: null,
        email: username,
        accessToken: null,
        refreshToken: null,
        domain,
        isDomainValid: true,
        givenName,
        familyName,
        picture: null,
        done
      });
    }));

  // Used to stuff a piece of information into a cookie
  passport.serializeUser((user, done) => {
    try {
      done(null, user.id);
    } catch (e) {
      done(new Error('Failed to serialize an user'));
    }
  });

  // Used to decode the received cookie and persist session
  passport.deserializeUser((id, done) => {
    Person.findById(id).then((user) => {
      done(null, user);
    })
      .catch((e) => {
        done(new Error(`Failed to deserialize an user: ${e.toString()}`));
      });
  });

};
