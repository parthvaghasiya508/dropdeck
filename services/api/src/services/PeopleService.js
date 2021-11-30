import { Person } from '@dropdeck/schema';

export const PeopleService = {
  /**
   * Fetch a user by ID and return a promise.
   *
   * @param id user ID.
   */
  get: (id) => (
    Person.findById(id)
      .populate("company")
      .populate("branding")
      .select("-_internal") // don't return _internal metadata to the client
      .exec(null)),

  update: (id, data) => Person.findByIdAndUpdate(id, { $set: { ...data } }, { new: true }),

  /**
   * Placeholder for proper account deletion, checking if user is a part of org, if has shared decks etc.
   * See: https://github.com/dropdeck-com/dropdeck/issues/2387
   *
   * @param id
   * @returns {Query<Document | null, Document>}
   */
  deleteAccount: (id) => Person.findByIdAndDelete(id)
};
