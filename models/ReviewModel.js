const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  product_id: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  ratings: { type: Number, required: true, min: 0, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", ReviewSchema);
