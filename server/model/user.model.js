const { getRepository } = require("typeorm");

const userSchema = require("../entity/users.entity");

// add users //get users

exports.signUp = async (fName, lName, pWord, mail) => {
  const users = getRepository(userSchema);
  const emailres = await users.findOne({
    email: mail,
  });
  if (emailres) {
    const result = `Email already exist`;
    return result;
  }
  const result = await users.save({
    firstName: fName,
    lastName: lName,
    pass: pWord,
    email: mail,
  });

  console.log(result);
  return result;
};

exports.signIn = async (email, password) => {
  const user = getRepository(userSchema);

  const UserRes = await user.findOne({
    email: email,
    // pass: password,
  });
  // console.log(UserRes);
  // if (!UserRes) {
  //   throw new Error(`User not found,Please register to login`);
  // }

  return UserRes;
};
