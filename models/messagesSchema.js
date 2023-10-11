const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    from: { type: Number },
    message: { type: String },
    to: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
