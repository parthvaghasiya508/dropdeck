import { Company, Deck } from '@dropdeck/schema';
import { hasBeenUpdated } from "../deck/queries/hasBeenUpdated.js";
import { getLimitSkip } from '../../util/pagination';

export const CompanyService = {

  getDecks: (id, userId, isShared, page, columnCount) => {
    const clause = {
      $and: [
        {
          company: id,
          "permissions.company": true,
        },
        hasBeenUpdated(),
      ],
    };

    if (isShared) {
      clause.$and.push({ owner: userId });
    }

    const { limit, skip } = getLimitSkip(page, columnCount);
    return Deck.find(clause)
      .limit(limit + 1)
      .skip(skip)
      .populate("owner")
      .exec(null);
  },

  create: (data, userId) => (
    Company.create({ ...data, owner: userId, company: null })),

  update: (id, data) => (
    Company.findByIdAndUpdate(id, { $set: { ...data } }, { new: true })),

  get: (id) => (
    Company.findById(id)
      .populate("branding")
      .exec(null))
};
