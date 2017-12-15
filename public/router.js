console.log("I'm using the react router");

let express = require("express");
let sessionCtrl = require("../server/controllers/session.server.controller.js");

let router = express.Router();

router.post("/session", sessionCtrl.create);

module.exports = router;
