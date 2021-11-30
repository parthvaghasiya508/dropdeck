export const ACTION_SET_USER = 'SET_USER';
/**
 * Set the User currently signed in.
 *
 * @param user
 * @returns {{type: string, user: *}}
 */
export function setUser(user) {
  return {
    type: ACTION_SET_USER,
    user,
  };
}
