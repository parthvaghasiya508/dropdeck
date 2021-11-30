import mongoose from 'mongoose';
import { preSaveDates } from "./hooks/preSaveDates.js";

const { Schema } = mongoose;
const schema = new Schema({
  logo: {
    image: String,
    height: Number,
    width: Number,
    validated: Boolean,
    svg: String,
    bgColor: String,
    whiteOnTransparent: Boolean
  },
  icon: {
    image: String,
    height: Number,
    width: Number,
    validated: Boolean,
    svg: String,
    bgColor: String,
    whiteOnTransparent: Boolean,
  },
  domain: {
    type: String,
    lowercase: true
  },
  colors: Object,
  fonts: {
    title: {
      name: String,
      provider: String
    },
    text: {
      name: String,
      provider: String
    },
    other: {

    }
  },
  banner: {
    image: String,
    height: Number,
    width: Number,
  },
  created: Date,
  updated: Date,
}, { collection: "branding" });

// Automatically set or update created and updated fields:
schema.pre('save', function (next) {
  const doc = this;
  return preSaveDates(doc, next);
});
schema.pre('findOneAndUpdate', function (next) {
  this.set({ updated: new Date() });
  if (next) next();
});

export const Branding = mongoose.model("Branding", schema);
