import mongoose from 'mongoose';
import { debugMode } from "../util/debugMode.js";
import { logger } from "../util/logger.js";
import { preSaveDates } from "./hooks/preSaveDates.js";

const { Schema } = mongoose;
const Hashids = require('hashids/cjs');
const AutoIncrement = require("mongoose-sequence")(mongoose);

const schema = new Schema({
  _internal: {
    counter: {
      all: Number,
      company: Number,
      user: Number
    }
  },
  settings: { type: Object, default: { workflow: { step: undefined } } },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Person"
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company"
  },
  source: {
    type: Schema.Types.ObjectId,
    ref: "Deck"
  },
  identifiers: {
    short: String,
    perUser: String,
    perCompany: String,
  },
  name: String,
  coverId: String, // ID of the slide cover for a deck
  content: Array,
  theme: String,
  branding: Object,
  created: Date,
  updated: Date,
  aspect: String,
  permissions: {
    type: Object,
    default: {
      public: false,
      company: false
    }
  }
});

// Create incremented numbers for different scopes
schema.plugin(AutoIncrement, { id: "deck_seq", inc_field: "_internal.counter.all" });
schema.plugin(AutoIncrement, { id: "company_deck_seq", inc_field: "_internal.counter.company", reference_fields: ["company"] });
schema.plugin(AutoIncrement, { id: "user_deck_seq", inc_field: "_internal.counter.user", reference_fields: ["owner"] });

// TODO move this to config!
const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
const all = new Hashids("!kds $kslll eiiwl.", 4, ALPHABET);
const company = new Hashids("iaklk skldk2p z;lksl", 3, ALPHABET);
const user = new Hashids("pqie z..,wkjls spssswpw", 3, ALPHABET);

// Automatically set or update created and updated fields:
schema.pre('save', function (next) {
  const doc = this;
  if (doc && doc.skipHook) {
    delete doc.skipHook;
    next();
    return;
  }
  return preSaveDates(doc, next);
});
schema.pre('findOneAndUpdate', function (next) {
  this.set({ updated: new Date() });
  if (next) next();
});

// Turn increments into unique identifiers in different scopes
schema.post('save', (doc, next) => {
  let modified = false;
  if (!doc.identifiers.short) {
    doc.identifiers.short = all.encode(doc._internal.counter.all);
    modified = true;
  }
  if (!doc.identifiers.perCompany) {
    doc.identifiers.perCompany = company.encode(doc._internal.counter.company);
    modified = true;
  }
  if (!doc.identifiers.perUser) {
    doc.identifiers.perUser = user.encode(doc._internal.counter.user);
    modified = true;
  }
  if (modified) {
    doc.skipHook = true;
    doc.save();
  }

  if (debugMode()) {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    logger.debug(`The API is using ~${Math.round(used * 100) / 100} MB`);
  }

  next();
});

// Compile the schema
export const Deck = mongoose.model('Deck', schema);
