const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const passport = require("passport");

const userModel = require("../model/user.model");
const { signUpVal } = require("../validation/signUpValidation");

//adding a user
exports.addUser = async (req, res) => {
  try {
    const errors = signUpVal(req);

    if (Object.keys(errors).length > 0) {
      res.send(errors);
      return;
    }

    const { firstName, lastName, pass, mailAdd } = req.body;
    const hashedPassword = await bcrypt.hash(pass, 10);
    const response = await userModel.signUp(
      firstName,
      lastName,
      hashedPassword,
      mailAdd
    );

    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // const hashedPassword = await bcrypt.hash(password,10)

    // Validate email against database;(authentication)
    const response = await userModel.login(email, password);
    // console.log('yes');
    // console.log(hashedPassword);
    if (!response) {
      return res.send("User not found, be sure to sign up");
    }
    // res.send(response);

    // Payload
    const user = {
      email: req.body.email,
      password: req.body.password,
    };

    // Send TOKEN
    const token = await jwt.sign({ user }, "secretkey");
    const successMsg = "Login successful";
    return res.send({
      token,
      successMsg,
    });
  } catch (error) {
    return res.send(error);
  }
};

// exports.login =  (req, res, next) => {

//   passport.authenticate("local.signin", (err, user, info) => {
//     if (err) {
//       return next(err);
//     }
//     if (!user) {
//       return res.send({ status: 0, errMsg: info });
//     }

//     req.logIn(user, function (err) {
//       if (err) {
//         return next(err);
//       }
//       return res.send({ status: 1,succMsg:"User logged in successfull",user });
//     });
//   })(req, res, next);
// }
