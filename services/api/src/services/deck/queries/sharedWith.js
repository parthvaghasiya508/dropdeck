/**
 * Returns a clause that restricts a query for Decks objects to decks that are shared with the given user
 * (but not owned by him or her).
 */
export const sharedWith = (user) => ({
  $and: [
    { owner: user ? { $ne: user._id } : { $exists: false } },
    {
      $or: [
        { "permissions.company": true, company: user && user.company ? user.company._id : { $exists: false } },
        { "permissions.public": true }
      ]
    }
  ]
});
