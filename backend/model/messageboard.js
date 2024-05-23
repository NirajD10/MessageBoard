const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageBoardSchema = new Schema(
  {
    title: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    subscribers: [
      {
        user: { type: Schema.Types.ObjectId, ref: "Users" },
        role: { type: String, default: "viewer", enum: ["viewer", "editor"] },
      },
    ],
    messages: [{ type: Schema.Types.ObjectId, ref: "Messages" }],
    status: { type: String, default: "active", enum: ["active", "archived"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("messageBoard", messageBoardSchema);
