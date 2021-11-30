import passport from "passport";
import { Person } from '@dropdeck/schema';
import Strategy from "passport-google-oauth20";
import config from "../../config.js";
import { AuthService } from "../../services/auth/AuthService.js";

const isDomainValid = (domain) => domain !== undefined;
const profileGivenName = (profile) => profile._json.given_name;
const profileFamilyName = (profile) => profile._json.family_name;
const getDomain = (profile) => profile._json.hd;
const getPicture = (profile) => profile._json.picture;

/**
 * Load Passport Google auth configuration.
 */
export const googleAuthLoader = () => {

  passport.use('google', new Strategy(
    {
      clientID: config.auth.google.clientId,
      clientSecret: config.auth.google.clientSecret,
      callbackURL: config.auth.google.callbackUrl,
      passReqToCallback: true
    },
    async (request, accessToken, refreshToken, profile, done) => AuthService.validate({
      httpRequest: request,
      provider: "google",
      profile,
      email: profile._json.email,
      accessToken,
      refreshToken,
      domain: getDomain(profile) || 'google.com',
      isDomainValid: isDomainValid(getDomain(profile)),
      givenName: profileGivenName(profile),
      familyName: profileFamilyName(profile),
      picture: getPicture(profile),
      done
    })
  ));

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
