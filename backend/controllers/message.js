const MessageBoard = require("../model/messageboard");
const Message = require("../model/message");

exports.postMessage = async (req, res, next) => {
  const { message } = req.body;
  const user_id = req.user_id;
  const { boardid } = req.params;

  console.log(user_id);

  try {
    /* verify messageboard that meet 'boardid' params */
    const messageboard = await MessageBoard.findById(boardid);

    if (!messageboard) {
      const error = new Error("Something went wrong.");
      error.statusCode = 503;
      throw error;
    }

    /* Function for creation message to message model */
    async function postmessageHandler() {
      const newmessage = new Message({
        board: boardid,
        author: user_id,
        content: message,
      });

      const result_message = await newmessage.save();
      if (!result_message) {
        const error = new Error(
          "Couldn't send message. Please try again later."
        );
        error.statusCode = 503;
        throw error;
      }

      /* after creation message, it time to save message id to messageboard model relationship */
      messageboard.messages.push(result_message._id);
      await messageboard.save();
    }

    /* Condition based on if user is valid to post for creator or editor otherwise not allowed. */
    if (messageboard.creator.toString() === user_id.toString()) {
      await postmessageHandler();
    } else {
      const check_editor_subscriber = messageboard?.subscribers.filter(
        (sub) => sub.user.toString() === user_id.toString()
      );

      if (check_editor_subscriber.length === 0) {
        const error = new Error("Not Authorized.");
        error.statusCode = 403;
        throw error;
      }

      /* Not allow if user role is viewer */
      if (check_editor_subscriber[0].role === "viewer") {
        const error = new Error("You are not now allowed to post.");
        error.statusCode = 401;
        throw error;
      }

      await postmessageHandler();
      res.status(200).json({ message: "Message Sent." });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.deleteMessage = async (req, res, next) => {
  const { board_id, message_id } = req.params;
  const user_id = req.user_id;

  try {
    const message = await Message.findById(message_id);

    if (!message) {
      const error = new Error("Message not found.");
      error.statusCode = 400;
      throw error;
    }

    const messageboard = await MessageBoard.findById(board_id);

    if (!messageboard) {
      const error = new Error("Message Board not found.");
      error.statusCode = 400;
      throw error;
    }

    /* Check isCreator of specific messageboard in order to access delete message */
    const isCreator = messageboard.creator.equals(user_id);

    if (!isCreator) {
      const error = new Error("Not allowed to delete message.");
      error.statusCode = 403;
      throw error;
    } else {
      messageboard.messages.pull(message_id);
      messageboard.save();

      const deleted_result = await Message.findByIdAndDelete(message_id);
      if (deleted_result) {
        res.status(200).json({ message: "Deleted." });
      }
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.editMessage = async (req, res, next) => {
  const { message_id, board_id } = req.params;
  const { new_content } = req.body;
  const user_id = req.user_id;

  try {
    /* verify messageboard that meet 'board_id' params */
    const messageboard = await MessageBoard.findById(board_id);

    if (!messageboard) {
      const error = new Error("Couldn't find Message Board.");
      error.statusCode = 503;
      throw error;
    }

    async function editMessageHandler() {
      const message = await Message.findById(message_id);
      message.content = new_content;
      const result_message = await message.save();

      if (!result_message) {
        const error = new Error(
          "Couldn't update message. Please try again later."
        );
        error.statusCode = 503;
        throw error;
      }
    }

    /* Condition based on if user is valid to post for creator or editor otherwise not allowed. */
    if (messageboard.creator.toString() === user_id.toString()) {
      await editMessageHandler();
    } else {
      const check_editor_subscriber = messageboard?.subscribers.filter(
        (sub) => sub.user.toString() === user_id.toString()
      );

      if (check_editor_subscriber.length === 0) {
        const error = new Error("Not authorized.");
        error.statusCode = 403;
        throw error;
      }

      /* Not allow if user role is viewer */
      if (check_editor_subscriber[0].role === "viewer") {
        const error = new Error("You are not now allowed to edit post.");
        error.statusCode = 401;
        throw error;
      }

      await editMessageHandler();
      res.status(200).json({ message: "Message edited." });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
