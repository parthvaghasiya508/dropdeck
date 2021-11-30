import mongoose, { Schema } from 'mongoose';
import { preSaveDates } from "./hooks/preSaveDates";

const schema = new Schema({
  type: String,
  name: String,
  parameters: Object,
  secrets: Object,
  paths: {},
  owner: { type: Schema.Types.ObjectId, ref: "Person" },
  company: { type: Schema.Types.ObjectId, ref: "Company" },
  created: Date,
  updated: Date,
}, { collection: "datasources" });

// Automatically set or update created and updated fields:
schema.pre('save', function (next) {
  const doc = this;
  return preSaveDates(doc, next);
});
schema.pre('findOneAndUpdate', function (next) {
  this.set({ updated: new Date() });
  if (next) next();
});
export const Datasource = mongoose.model("Datasource", schema);
