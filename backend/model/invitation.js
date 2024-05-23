const mongoose = require("mongoose");
const { Schema } = mongoose;

const expire_inviation_remaining_hr = 1000 * 60 * 60 * 48;

const invitationSchema = new Schema(
  {
    receipt_account: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    message_board: {
      type: Schema.Types.ObjectId,
      ref: "messageBoard",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
    },
    expiration_date: {
      type: Date,
      required: true,
      default: function () {
        return Date.now() + expire_inviation_remaining_hr;
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("invitation", invitationSchema);
