import mongoose from 'mongoose';
import { preSaveDates } from "./hooks/preSaveDates.js";

const { Schema } = mongoose;
const schema = new Schema({
  email: String,
  active: Boolean,
  allowed: Boolean,
  givenName: String,
  familyName: String,
  picture: String,
  social: Object,
  company: { type: Schema.Types.ObjectId, ref: "Company" },
  created: Date,
  updated: Date,
  preferences: { type: Object, default: {} },
  _internal: { type: Object, default: { profiles: {}, tokens: {} } }
}, { collection: "people" });

// Automatically set or update created and updated fields:
schema.pre('save', function (next) {
  const doc = this;
  return preSaveDates(doc, next);
});
schema.pre('findOneAndUpdate', function (next) {
  this.set({ updated: new Date() });
  if (next) next();
});
export const Person = mongoose.model('Person', schema);
