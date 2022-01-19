const { getRepository } = require("typeorm");

const userSchema = require("../entity/users.entity");

// add users //get users

exports.signUp = async (fName, lName, pWord, mail) => {
  const users = getRepository(userSchema);

  const result = await users.save({
    firstName: fName,
    lastName: lName,
    pass: pWord,
    email: mail,
  });

  console.log(result);
  return result;
};

exports.login = async (email, password) => {
  const user = getRepository(userSchema);

  const result = await user.findOne({
    email: email,
    pass: password,
  });
  //  console.log(result);
  return result;
};
