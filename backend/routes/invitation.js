const express = require("express");
const router = express.Router();

const isauthenticate = require("../middleware/is-auth");
const invitationController = require("../controllers/invitation");

router.get("/", isauthenticate, invitationController.getInvitationList);

router.post("/:invitation_id/respond", isauthenticate, invitationController.respondInvitation);

module.exports = router;