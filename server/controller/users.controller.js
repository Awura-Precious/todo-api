const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { ExclusionMetadata } = require("typeorm/metadata/ExclusionMetadata");

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
    //checking to see is email already exist

    const response = await userModel.signUp(
      firstName,
      lastName,
      hashedPassword,
      mailAdd
    );

    res.send(response);
  } catch (error) {
    res.send(error);
  }
};

//login controller
exports.login = async (req, res) => {
  try {
    const { email, pass } = req.body;

    // Validate email against database;(authentication)
    const response = await userModel.signIn(email, pass);

    if (!response) {
      return res.status(404).send(`Email isn't registered, 
                                   Register to login `);
    }

    //authenticating pass
    const validPassword = await bcrypt.compare(pass, response.pass);

    if (!validPassword) {
      return res.status(400).send("Invalid Password");
    }

    // Payload
    const user = {
      firstName: response.firstName,
      email: response.email,
      password: response.pass,
    };

    console.log(user);

    // Send TOKEN
    const key = process.env.JWT_SECRETKEY;
    const token = await jwt.sign(user, key);
    const successMsg = "Login successful";
    return res.send({
      token,
      successMsg,
    });
  } catch (error) {
    return res.send(error.message);
  }
};

//post login route
exports.loginGet = async (req, res) => {
  const { firstName } = req.user;
  res.send(`Welcome ${firstName}`);
};

