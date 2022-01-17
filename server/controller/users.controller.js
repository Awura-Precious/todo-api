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

    const response = await userModel.signUp(firstName, lastName, pass, mailAdd);
    // console.log(req.body);

    res.send(response);
    // }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
