console.log("I'm using the react router");
let auth = require("./auth.js");
let express = require("express");
let sessionCtrl = require("../server/controllers/session.server.controller.js");
let seatCtrl = require("../server/controllers/seat.server.controller.js");

let router = express.Router();

router.post("/session", sessionCtrl.create);

router.get("/seat", auth.check, seatCtrl.getAll);
router.get("/seat/:seatId", auth.check, seatCtrl.getById);
router.post("/seat", auth.check, seatCtrl.create);
router.put("/seat/:seatId", auth.check, seatCtrl.update);
router.delete("/seat/:seatId", auth.check, seatCtrl.delete);

module.exports = router;
