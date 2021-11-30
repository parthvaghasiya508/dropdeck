import mongoose from 'mongoose';
import { preSaveDates } from "./hooks/preSaveDates.js";

const { Schema } = mongoose;
const schema = new Schema({
  id: String,
  company: { type: Schema.Types.ObjectId, ref: "Company" },
  deck: { type: Schema.Types.ObjectId, ref: "Deck" },
  user: { type: Schema.Types.ObjectId, ref: "Person" },
  location: {
    continent: String,
    country: String,
    region: String,
    city: String
  },
  metadata: Object,
  session: String,
  slide: String,
  type: String,
  payload: Object,
  created: Date,
}, { collection: "signals" });

// Automatically set or update created and updated fields:
schema.pre('save', function (next) {
  const doc = this;
  return preSaveDates(doc, next);
});
export const Signal = mongoose.model('Signal', schema);
