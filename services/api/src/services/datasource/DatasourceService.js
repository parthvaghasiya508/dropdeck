import { Datasource } from "@dropdeck/schema";
import { deletableBy } from "../deck/queries/deletableBy.js";

export const DatasourceService = {

  getDatasources: (id) => {
    const clause = {
      owner: id,
    };
    return Datasource.find(clause)
      .exec(null);
  },

  create: (data, userId) => (
    Datasource.create({
      ...data,
      owner: userId,
    })),

  update: (id, data) => (
    Datasource.findByIdAndUpdate(id, { $set: { ...data } }, { new: true })),

  get: (id) => (
    Datasource.findById(id)
      .exec(null)),

  delete: (id, req, res, callback) => {
    Datasource.findOneAndDelete({ $and: [{ _id: id }, deletableBy(req, res)] }, callback);
  }
};
