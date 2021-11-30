import passport from "passport";
import { Person } from '@dropdeck/schema';
import passportAzure from "passport-azure-ad";
import config from "../../config.js";
import { logger } from "../../util/logger.js";
import { AuthService } from "../../services/auth/AuthService.js";

const { OIDCStrategy } = passportAzure;
const MicrosoftDomains = ["hotmail", "live", "msn", "passport", "outlook"];

const isDomainValid = (domain) => {
  if (domain === null || domain === undefined) {
    return false;
  }
  const prefix = domain.split(".").splice(0, 1)[0];
  const notPublic = MicrosoftDomains.indexOf(prefix) < 0;
  return domain && notPublic;
};
const profileGivenName = (profile) => {
  if (profile && profile.name && profile.name.givenName) {
    return profile.name.givenName;
  }
  if (profile && profile?._json?.name) {
    return profile._json.name.substr(0, profile._json.name.lastIndexOf(" "));
  }
  return "";
};
const profileFamilyName = (profile) => {
  if (profile && profile.name && profile.name.familyName) {
    return profile.name.familyName;
  }
  if (profile && profile?._json?.name) {
    return profile._json.name.substr(profile._json.name.lastIndexOf(" ") + 1);
  }
  return "";
};
const getDomain = (profile) => {
  if (profile._json.hd) {
    logger.error(`Getting a 'json._hd' variable for domain: ${profile._json.hd}`);
  }
  const email = profile._json.email || profile._json.preferred_username;
  return email ? email.split("@").pop() : "";
};

const getPicture = (profile) => null; // TODO we need to fetch the profile image from the Azure Graph API

/**
 * Load Passport Office 365 auth configuration.
 */
export const office365AuthLoader = () => {

  logger.debug(`Initializing Office 365 Passport module with redirect URL ${config.auth.office365.redirectUrl}`);

  passport.use("azuread-openidconnect", new OIDCStrategy({
    identityMetadata: "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration",
    responseType: "code id_token",
    responseMode: "form_post",
    clientID: config.auth.office365.clientId,
    clientSecret: config.auth.office365.clientSecret,
    allowHttpForRedirectUrl: true,
    validateIssuer: false,
    scope: [], // ["email", "profile"],
    redirectUrl: config.auth.office365.redirectUrl,
    passReqToCallback: true
  }, (req, iss, sub, profile, accessToken, refreshToken, done) => {
    process.nextTick(async () => AuthService.validate({
      httpRequest: req,
      provider: "microsoft",
      profile,
      email: profile._json.email || profile._json.preferred_username,
      accessToken,
      refreshToken,
      domain: getDomain(profile),
      isDomainValid: isDomainValid(getDomain(profile)),
      givenName: profileGivenName(profile),
      familyName: profileFamilyName(profile),
      picture: getPicture(profile),
      done }));
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
