import mongoose from 'mongoose';
import { preSaveDates } from "./hooks/preSaveDates.js";

const { Schema } = mongoose;
const schema = new Schema({
  id: String,
  company: { type: Schema.Types.ObjectId, ref: "Company" },
  deck: { type: Schema.Types.ObjectId, ref: "Deck" },
  owner: { type: Schema.Types.ObjectId, ref: "Person" },
  name: String,
  title: String,
  description: String,
  filename: String,
  mimetype: String,
  width: Number,
  height: Number,
  url: String,
  credit: String,
  site: String,
  from: String,
  swatch: Array, // legacy - to remove
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
export const File = mongoose.model('File', schema);
