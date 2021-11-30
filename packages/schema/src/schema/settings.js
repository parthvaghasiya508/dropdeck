import mongoose from 'mongoose';

const { Schema } = mongoose;
const schema = new Schema({
  _id: false,
  key: {
    type: String,
    index: true,
    unique: true,
    required: true,
  }, // primary key
  values: [Object],
}, { collection: "settings" });

export const Settings = mongoose.model('Settings', schema);
