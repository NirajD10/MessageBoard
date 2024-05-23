const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    board: {
      type: Schema.Types.ObjectId,
      ref: "messageBoard",
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", messageSchema);