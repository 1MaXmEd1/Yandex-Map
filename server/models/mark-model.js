const { Schema, model } = require("mongoose");

const MarkSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
});

module.exports = model("Mark", MarkSchema);
