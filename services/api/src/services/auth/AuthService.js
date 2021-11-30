import passport from "passport";
import { Company, Deck, Person } from '@dropdeck/schema';
import { logger } from "../../util/logger.js";
import AccountService from "./AccountService.js";
import { ownUnclaimedDecks } from "../deck/queries/ownUnclaimedDecks.js";
import { clearAnonymousDecks } from "../deck/queries/anonymousDecks";
import config from "../../config";
import { eventBus } from "../../util/event/EventBus";

export const AuthService = {

  /**
   * Store a reference to the redirect URI in the request session.
   *
   * @param req HTTP request.
   * @param res HTTP response.
   * @param next next middleware in the chain.
   */
  storeRedirectUri: (req, res, next) => {
    req.session.redirect = req.query.redirect;
    next();
  },

  /**
   * Authenticate using a Passport strategy.
   *
   * @param req HTTP request.
   * @param res HTTP response.
   * @param next next middleware in the chain.
   */
  authenticate: (strategy, failedPage) => (req, res, next) => {
    passport.authenticate(strategy,
      {
        response: res,
        failureRedirect: `${config.frontend.host}${failedPage}`
      })(req, res, next);
  },

  /**
   * Process a callback from an authentication provider and redirect the user according to the result.
   *
   * @param req HTTP request.
   * @param res HTTP response.
   * @param next next middleware in the chain.
   */
  authCallback: (req, res) => {
    if (req.user.active && req.user.allowed) {

      // Clear the anonymous decks cookie.
      clearAnonymousDecks(res);

      const redirectUrl = req.session.redirect ? `${config.frontend.host}${req.session.redirect}` : config.frontend.host;
      delete req.session.redirect;
      res.redirect(redirectUrl);

    } else if (req.user.active && !req.user.allowed) {
      res.redirect(`${config.frontend.host}${config.frontend.signupModule}/pending`);
    } else {
      res.redirect(`${config.frontend.host}${config.frontend.signupModule}`);
    }
  },

  /**
   * Migrate decks owned by an anonymous user to a named user account.
   */
  claimAnonymousDecks: async (req, user) => {
    if (user !== null) {
      const combinedClause = ownUnclaimedDecks(req);
      if (combinedClause !== undefined) {
        await Deck.updateMany(combinedClause, {
          owner: user._id,
          company: user.company !== undefined ? user.company : null
        });
      }
    }
  },

  /**
   * Authenticate a user request.
   *
   * @param request
   * @param provider
   * @param profile
   * @param getDomain
   * @param isDomainValid
   * @param profileGivenName
   * @param profileFamilyName
   * @param done
   * @returns {Promise<void>}
   */
  validate: async ({
    httpRequest,
    provider,
    profile,
    email,
    accessToken,
    refreshToken,
    domain,
    isDomainValid,
    givenName,
    familyName,
    picture,
    done
  } = {}) => {

    // Check for existing user
    const currentUser = await Person.findOne({ email })
      .populate("company")
      .exec()
      .catch((e) => logger.error(e));

    // Alternatively create a new one in the database
    if (!currentUser) {
      let organization = null;
      let organizationAllowed = false;
      if (isDomainValid) {

        // Checking of organization exists
        const existingOrganization = await Company.findOne({
          domain: domain.toLowerCase(),
        })
          .exec()
          .catch((e) => logger.error(e));

        if (existingOrganization) {
          organization = existingOrganization;
          organizationAllowed = existingOrganization.allowed;
        } else if (domain) {
          // Create new one if that organization doesn't exist for the new user
          organizationAllowed = await AccountService.screenOrganization(domain);
          organization = await Company.create({
            domain: domain.toLowerCase(),
            name: domain,
            active: false,
            allowed: organizationAllowed
          })
            .catch((e) => logger.error(e));

          eventBus().notify(`💼 New company created: ${organization.name}, ${organization.domain}`);
        }
      }
      const userAllowed = await AccountService.screenUser(email);

      if (domain) {
        logger.info(`Organization ${domain} is ${organizationAllowed ? '' : 'NOT '}allowed access`);
      }
      if (!domain || !organizationAllowed) {
        logger.info(`User ${email} is ${userAllowed ? '' : 'NOT '}allowed access`);
      }

      // Creating a new user
      const userInformation = {
        email,
        active: false,
        allowed: (organization && organizationAllowed) || userAllowed,
        givenName,
        familyName,
        picture,
        company: organization !== null ? organization._id : null,
        _internal: {
          tokens: {},
          profiles: {
            default: provider,
          }
        }
      };
      // Store all profile harvested data
      // TODO We may have to ALSO update these when we authenticate a user, updating the existing user db object!!!
      userInformation._internal.profiles[provider] = profile;
      userInformation._internal.tokens[provider] = { accessToken, refreshToken };

      const newUser = await Person.create(userInformation).catch((e) => logger.error(e));

      eventBus().notify(`👋 New sign-up: ${newUser.givenName} ${newUser.familyName}, ${newUser.email}`);

      if (newUser) {
        await AuthService.claimAnonymousDecks(httpRequest, newUser);

        try {
          done(null, newUser);
        } catch (e) {
          done(new Error(e));
        }
      }
    } else {

      // Existing user:
      await AuthService.claimAnonymousDecks(httpRequest, currentUser);
      try {
        done(null, currentUser);
      } catch (e) {
        // componentReadyCallback(new Error(e));
      }
    }
  },
};
