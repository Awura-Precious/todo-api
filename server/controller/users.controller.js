const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userModel = require("../model/user.model");
const { signInVal } = require("../validation/loginVal");
const { signUpVal } = require("../signUpValidation");
// const { alternatives } = require("joi");

//adding a user
exports.addUser = async (req, res) => {
  const { firstName, lastName, pass, mailAdd } = req.body;
  try {
    const errors = signUpVal(req);

    if (Object.keys(errors).length > 0) {
      res.status(400).send(errors);
      return;
    }

    const hashedPassword = await bcrypt.hash(pass, 10);
   
    const response = await userModel.signUp(
      firstName,
      lastName,
      hashedPassword,
      mailAdd
    );
    console.log(response)
    res.send(response);
  } catch (error) {
    res.status(400).send(error);
  }
};

//login controller
exports.login = async (req, res) => {
  const { email, pass } = req.body;
  const { error } = signInVal(req.body);
  
  if (error) {
    return res.status(404).send("Invalid inputs");
  }
  try {
    // Validate email against database;(authentication)
    const response = await userModel.signIn(email, pass);
    
    if (!response) {
      
      return res.status(404).send(`Email isn't registered, Register to login `);
    }

    //authenticating pass
    const validPassword = bcrypt.compare(pass, response.pass);
    if (!validPassword) {
      
      return res.status(400).send("Invalid Password");
    }

    // Payload
    const user = {
      id: response.id,
      firstName: response.firstName,
      lastName: response.lastName,
      email: response.email,
      // password: response.pass,
    };

    // Send TOKEN
    const key = process.env.JWT_SECRETKEY;
    const token = jwt.sign(user, key, { expiresIn: "2h" });
    const successMsg = "Login successful";

    return res.send({
      token,
      user,
      message: successMsg,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

//post login route
exports.loginGet = async (req, res) => {
  const { firstName } = req.user;
  res.status(200).send(`Welcome ${firstName}`);
};
