const express = require("express");
const authCtrl = require("./auth.ctrl");
const router = express.Router();

router.post("/signup", authCtrl.signup);
router.post("/signin", authCtrl.signin);
router.get("/check", authCtrl.check);
router.post("/logout", authCtrl.logout);

module.exports = router;
