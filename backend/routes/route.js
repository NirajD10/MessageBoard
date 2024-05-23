const express = require("express");
const authenticationRoutes = require("./authentication");
const messageboardRoutes = require("./messageboard");
const invitationRoutes = require("./invitation");

const router = express.Router();

router.use("/auth", authenticationRoutes);

router.use("/boards", messageboardRoutes);

router.use("/invitations", invitationRoutes);

module.exports = router;
