import GA4React from "ga-4-react";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setUser } from "../actions/user";
import { useMe } from "../common/api/sdk/hooks/PeopleHooks";
import { defineAbilityFor } from "../common/authz/ability/defineAbilityFor";
import { AbilityContext } from "../common/authz/AbilityContext";
import * as ErrorUtils from "../common/util/ErrorUtils";
import { config } from "../config";
/**
 * Fetches the active user profile and adds to the Redux store.
 *
 * @param props
 * @returns {*}
 * @constructor
 */
const UserProvider = ({ setUser, children, allowAnonymous = false, disableTracking = false }) => {

  const [me, , error] = useMe(allowAnonymous);

  useEffect(() => {
    if (me) {
      setUser(me);
      const gaReact = GA4React.getGA4React();

      if (gaReact) {
        gaReact.gtag("config", config.analytics.google.trackingId, {
          user_id: me._id
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me]);

  if (error) {
    ErrorUtils.redirectOnError(error);
  }

  return me ? (
    <AbilityContext.Provider value={defineAbilityFor(me)}>
      {children}
    </AbilityContext.Provider>
  ) : null; // React.Children.only(children);
};

const mapDispatchToProps = {
  setUser,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProvider);
