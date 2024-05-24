const mongoose = require("mongoose");

const MessageBoard = require("../model/messageboard");
const Users = require("../model/user");
const Invitation = require("../model/invitation");

exports.getMessageBoardList = async (req, res, next) => {
  const user_id = req.user_id;

  const id = new mongoose.Types.ObjectId(user_id);
  try {
    const messageboardListaggerate = await MessageBoard.aggregate([
      {
        $match: {
          $or: [{ "subscribers.user": id }, { creator: id }],
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          status: 1,
        },
      },
    ]);

    res.status(200).json(messageboardListaggerate);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getMessageBoardDetail = async (req, res, next) => {
  const { board_id } = req.params;
  const user_id = req.user_id;

  const id = new mongoose.Types.ObjectId(user_id);

  try {
    // const messageboardDetailaggerate = await MessageBoard.aggregate([
    //   {
    //     $lookup: {
    //       from: "messages",
    //       localField: "messages",
    //       foreignField: "_id",
    //       as: "message_detail",
    //     },
    //   },
    //   {
    //     $match: {
    //       $or: [{ "subscribers.user": id }, { creator: id }],
    //       _id: new mongoose.Types.ObjectId(board_id),
    //     },
    //   },
    // ]);

    // Get Current User roles based on Messageboard
    const messageBoard = await MessageBoard.findById(board_id);
    if (!messageBoard) {
      const error = new Error("Message board not found");
      error.statusCode = 422;
      throw error;
    }
    const check_subscriber = messageBoard.subscribers.find(
      (user) => user.user.toString() === user_id.toString()
    );
    const roles = check_subscriber
      ? check_subscriber.role
      : messageBoard.creator.toString() === user_id.toString()
      ? "creator"
      : "none";

    // Aggerate MessageBoard full details
    const messageboardDetailaggerate = await MessageBoard.aggregate([
      {
        $match: {
          $or: [{ "subscribers.user": id }, { creator: id }],
          _id: new mongoose.Types.ObjectId(board_id),
        },
      },
      {
        $lookup: {
          from: "messages",
          localField: "messages",
          foreignField: "_id",
          as: "message_detail",
        },
      },
      {
        $unwind: {
          path: "$message_detail",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "message_detail.author",
          foreignField: "_id",
          as: "message_detail.author_detail",
        },
      },
      {
        $unwind: {
          path: "$message_detail.author_detail",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          let: { subscribers_user: "$subscribers.user" },
          pipeline: [
            { $match: { $expr: { $in: ["$_id", "$$subscribers_user"] } } },
            { $project: { _id: 1, name: 1, email: 1 } },
          ],
          as: "subscribers_details",
        },
      },
      {
        $addFields: {
          subscribers: {
            $map: {
              input: "$subscribers",
              as: "subscriber",
              in: {
                role: "$$subscriber.role",
                user: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$subscribers_details",
                        as: "user_detail",
                        cond: {
                          $eq: ["$$user_detail._id", "$$subscriber.user"],
                        },
                      },
                    },
                    0,
                  ],
                },
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          creator: 1,
          subscribers: {
            user: {
              _id: 1,
              name: 1,
              email: 1,
            },
            role: 1,
          },
          status: 1,
          message_detail: {
            _id: 1,
            content: 1,
            createdAt: 1,
            "author._id": "$message_detail.author_detail._id",
            "author.name": "$message_detail.author_detail.name",
            "author.email": "$message_detail.author_detail.email",
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          creator: { $first: "$creator" },
          subscribers: { $first: "$subscribers" },
          status: { $first: "$status" },
          message_detail: { $push: "$message_detail" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creator_detail",
        },
      },
      {
        $unwind: {
          path: "$creator_detail",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          creator: 1,
          "creator_detail._id": 1,
          "creator_detail.name": 1,
          "creator_detail.email": 1,
          subscribers: 1,
          status: 1,
          message_detail: 1,
        },
      },
    ]);

    res
      .status(200)
      .json({ detail: messageboardDetailaggerate, your_role: roles });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.createMessageBoard = async (req, res, next) => {
  const user_id = req.user_id;
  const { title } = req.body;
  try {
    if (!user_id || !title) {
      const error = new Error("Incomplete data input");
      error.statusCode = 422;
      throw error;
    }

    const newmessageBoard = new MessageBoard({
      title: title,
      creator: user_id,
    });
    const result_mboard = await newmessageBoard.save();

    if (result_mboard.length === 0) {
      const error = new Error(
        "Couldn't create message board. Please try again later."
      );
      error.statusCode = 422;
      throw error;
    }

    res.status(200).json({ message: "Created." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.leaveMessageBoard = async (req, res, next) => {
  const { board_id } = req.params;
  const user_id = req.user_id;

  try {
    const messageboard = await MessageBoard.findById(board_id);
    if (!messageboard) {
      const error = new Error("Couldn't find Message Board.");
      error.statusCode = 429;
      throw error;
    }

    messageboard.subscribers.pull({ user: user_id });
    await messageboard.save();

    res.status(200).json({ message: "You left the message board." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.sendInvitation = async (req, res, next) => {
  const { board_id } = req.params;
  const user_id = req.user_id;
  const { receipt_email } = req.body;

  const formatted_receipt_email = receipt_email.email.toString().toLowerCase();

  try {
    const exist_user = await Users.findOne({ email: formatted_receipt_email });

    if (!exist_user) {
      const error = new Error(
        "Unfortunately, the receipt email address account doesn't exists yet."
      );
      error.statusCode = 422;
      throw error;
    }

    /* check if creator tried to invite himself */
    const messageboard = await MessageBoard.findById(board_id);
    if (messageboard.creator.toString() === exist_user._id.toString()) {
      const error = new Error("You cannot invite yourself.");
      error.statusCode = 422;
      throw error;
    }

    /* check invitation depend upon user invitation status*/
    const check_inviation = await Invitation.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "receipt_account",
          foreignField: "_id",
          as: "receipt_account_detail",
        },
      },
      {
        $match: {
          $and: [
            { "receipt_account_detail.email": formatted_receipt_email },
            { message_board: new mongoose.Types.ObjectId(board_id) },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          message_board: 1,
          receipt_account_id: "$receipt_account_detail._id",
          receipt_account_email: "$receipt_account_detail.email",
          expiration_date: 1,
          status: 1,
        },
      },
    ]);

    if (check_inviation.length === 0) {
      const send_invitation = new Invitation({
        message_board: board_id,
        receipt_account: exist_user._id,
      });
      await send_invitation.save();
      res.status(200).json({ message: "Succesfully sent invitation." });
    } else {
      if (check_inviation[0]?.status === "pending") {
        /* Refresh expiry date if already expired. */
        if (check_inviation[0]?.expiration_date < Date.now()) {
          const update_expiry_date = await Invitation.findById(
            check_inviation[0]._id
          );
          update_expiry_date.expiration_date = Date.now() + 1000 * 60 * 60 * 48;
          await update_expiry_date.save();
        }

        const error = new Error(
          "You have already invited. Please wait receipt to accept invitation."
        );
        error.statusCode = 422;
        throw error;
      } else {
        const error = new Error(
          "The receipt is already member of message borad or declined invitation."
        );
        error.statusCode = 422;
        throw error;
      }
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.promoteUser = async (req, res, next) => {
  const user_id = req.user_id;
  const { promote_subscriber_id, board_id } = req.params;
  const { roles } = req.body;
  const roletype = ["viewer", "editor"];

  console.log(board_id)
  console.log(promote_subscriber_id)

  try {
    if (!roles) {
      const error = new Error("Choose Roles one");
      error.statusCode = 422;
      throw error;
    }

    if (roletype.includes(roles) === false) {
      const error = new Error("Roles should be only Viewer or Editor");
      error.statusCode = 422;
      throw error;
    }

    const changeRole = await MessageBoard.findOneAndUpdate(
      { _id: board_id, "subscribers.user": promote_subscriber_id },
      { $set: { "subscribers.$.role": roles } },
      { new: true }
    );

    if (!changeRole) {
      const error = new Error("Message Board or Subscriber could not found");
      error.statusCode = 422;
      throw error;
    }

    res.status(200).json({ message: "Updated." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
