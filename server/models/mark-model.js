const { Schema, model } = require("mongoose");

const MarkSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, require: true },
  coordinates: {
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },
  },
});

module.exports = model("Marks", MarkSchema);
