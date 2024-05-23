const Invitation = require("../model/invitation");
const MessageBoard = require("../model/messageboard");

exports.getInvitationList = async (req, res, next) => {
  const user_id = req.user_id;
  try {
    const list_invitation = await Invitation.find({
      receipt_account: user_id,
      status: "pending",
    }).populate({
      path: "message_board",
      select: "title creator",
      populate: {
        path: "creator",
        model: "Users",
        select: "name email",
      },
    });

    res.status(200).json(list_invitation);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.respondInvitation = async (req, res, next) => {
  const { invitation_id } = req.params;
  const user_id = req.user_id;
  const { invitation_response } = req.body;

  try {
    const invitation = await Invitation.findById(invitation_id);
    if (!invitation) {
      const error = new Error("Not valid Invitation.");
      error.statusCode = 422;
      throw error;
    }

    if (invitation.expiration_date < Date.now()) {
      const error = new Error("Invitation has expired.");
      error.statusCode = 422;
      throw error;
    }

    invitation.status = invitation_response;
    await invitation.save();

    if (
      invitation_response === "accepted" &&
      invitation.receipt_account.toString() === user_id.toString()
    ) {
      const add_subscription_messageboard = await MessageBoard.findById(
        invitation.message_board
      );
      if (!add_subscription_messageboard) {
        const error = new Error("Something went wrong");
        error.statusCode = 422;
        throw error;
      }

      add_subscription_messageboard.subscribers.push({
        user: invitation.receipt_account,
      });
      await add_subscription_messageboard.save();
    }

    res.status(200).json({ message: "Invitation " + invitation_response });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
