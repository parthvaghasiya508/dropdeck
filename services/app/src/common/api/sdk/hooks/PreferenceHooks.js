import React, { createContext, useEffect, useState, useContext } from "react";
import { useMe, useUpdateMe } from "./PeopleHooks";

export const UserPreferencesContext = createContext({});
export const UserPreferences = ({ children }) => {
  const [preferences, setPreferences] = useState();

  return (
    <UserPreferencesContext.Provider value={[preferences, setPreferences]}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

/**
 * Get and set a user preference value.
 *
 * @param key
 * @param defaultValue
 * @returns {[unknown, setSpecificPreference, unknown]}
 */
const usePreference = (key, defaultValue) => {

  const [preferencesContext, setPreferencesContext] = useContext(UserPreferencesContext);

  const [preference, setPreference] = useState(undefined);
  const [error, setError] = useState(undefined);

  const [me, refetch] = useMe();
  const [updateMe, updatedMe] = useUpdateMe();

  useEffect(() => {
    if (preferencesContext && preferencesContext[key] && preferencesContext[key] !== preference) {
      setPreference(preferencesContext[key]);
    }
  }, [preferencesContext]);

  const setSpecificPreference = (value) => {
    setPreference(value);

    const preferences = me && me.preferences ? me.preferences : {};
    preferences[key] = value !== undefined ? value : defaultValue;

    updateMe({ preferences });
    setPreferencesContext({ ...preferences });

    // refetch();
  };

  useEffect(() => {
    if (me && me.preferences !== undefined) {
      if (me.preferences[key] !== undefined) {
        setPreference(me.preferences[key]);
      } else {
        setPreference(defaultValue);
      }
    } else {
      setPreference(defaultValue);
    }
  }, [key, me]);

  return [preference, setSpecificPreference, error];
};
export { usePreference };
