import { Signal } from '@dropdeck/schema';
import mongoose from "mongoose";

export const MetricsService = {

  /**
   * Aggregate metrics for a specific deck.
   *
   * @param id ID of a deck.
   * @returns {*}
   */
  byDeck: (id) => Signal.aggregate([
    { $match: { deck: mongoose.Types.ObjectId(id) } },
    {
      $group: {
        _id: "$slide",
        total: { $sum: "$payload.time" },
        count: { $sum: 1 },
        sum: { $sum: "$payload.time" },
        average: { $avg: "$payload.time" },
        max: { $max: "$payload.time" },
        min: { $min: "$payload.time" }
      }
    },
    { $addFields: { average: { $round: ['$average', 0] } } }
  ]).then((response) => {
    const object = response.reduce((obj, v) => {
      obj.maxCount = obj.maxCount > v.count ? obj.maxCount : v.count;
      obj.maxAverageDuration = obj.maxAverageDuration > v.average ? obj.maxAverageDuration : v.average;
      obj.measures[v._id] = v;
      return obj;
    }, { measures: {} });
    object.averageDuration = response.reduce((obj, v) => v.average + obj, 0) / response.length;
    return Promise.resolve(object);
  }),

};
