import mongoose from 'mongoose';
import { preSaveDates } from "./hooks/preSaveDates.js";

const { Schema } = mongoose;
const schema = new Schema({
  name: String,
  domain: {
    type: String,
    lowercase: true
  },
  description: String,
  language: String,
  social: Object,
  categories: Array,
  industries: Array,
  branding: [{ type: Schema.Types.ObjectId, ref: "Branding" }],
  location: Object,
  keywords: [],
  revenue: String,
  employees: String,
  email: String,
  augmented: Boolean,
  active: Boolean,
  allowed: Boolean,
  created: Date,
  updated: Date,
});

// Automatically set or update created and updated fields:
schema.pre('save', function (next) {
  const doc = this;
  return preSaveDates(doc, next);
});
schema.pre('findOneAndUpdate', function (next) {
  this.set({ updated: new Date() });
  if (next) next();
});

export const Company = mongoose.model('Company', schema);
