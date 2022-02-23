const express = require("express");
// const passport = require("passport");

const { addUser, login, loginGet } = require("../controller/users.controller");
const { authToken } = require("../validation/auth");

const router = express.Router();

//sign up route
router.post("/", addUser);

//login route
router.post("/login", login);

//post login route
router.get("/login", authToken, loginGet);

module.exports = router;

// router.post("/login", (req, res, next) => {

//     passport.authenticate("local.signin", (err, user, info) => {
//       if (err) {
//         return next(err);
//       }
//       if (!user) {
//         return res.send({ status: 0, errMsg: info });
//       }

//       req.logIn(user, function (err) {
//         if (err) {
//           return next(err);
//         }
//         return res.send({ status: 1,succMsg:"User logged in successfull",user });
//       });
//     })(req, res, next);
//   });
