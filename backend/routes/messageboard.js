const express = require("express");
const router = express.Router();

const messageboardController = require("../controllers/messageboard");
const messageController = require("../controllers/message");

const isauthenticate = require("../middleware/is-auth");

router.get("/", isauthenticate, messageboardController.getMessageBoardList);

router.get("/:board_id", isauthenticate, messageboardController.getMessageBoardDetail);

router.post("/", isauthenticate,  messageboardController.createMessageBoard);

/* Send Invitation in Single MessageBoard */
router.post("/:board_id/invite", isauthenticate, messageboardController.sendInvitation);

/* Leave messageboard */
router.post("/:board_id/leave", isauthenticate, messageboardController.leaveMessageBoard);

/* Message Operations routes */
router.post("/:boardid/messages", isauthenticate,  messageController.postMessage);

router.delete(
  "/:board_id/messages/:message_id", isauthenticate, messageController.deleteMessage
);

router.put("/:board_id/messages/:message_id", isauthenticate, messageController.editMessage);

module.exports = router;
