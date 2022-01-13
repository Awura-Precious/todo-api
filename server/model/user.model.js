const {getRepository} = require("typeorm");

const userSchema = require("../entity/users.entity")

//add users //get users

const signUp = async(fName,lName,pWord) => {
    const users = getRepository(userSchema);
    const results = await users.save({firstName:fName},{lastName:lName})
    return results
}

// const login = async(email,password) =>{
//     const user = getRepository(userSchema);
//     const result = await user.findOne({email:emailAdd},{password:pass})
//     return result;   ,{password:pass}
// }

module.exports ={signUp}