const userModel = require('../model/user.model')

//adding a user

 exports.addUser = async(req,res)=>{
     const{firstName,lastName,password} = req.body
     try {

        // if(password !== cPassword){
        //     res.send("password and confirm passwords should be same")
        // }
        const response = await userModel.signUp({firstName:firstName},{lastName:lastName},{password:password})
        console.log(response)
        return response
     } catch (error) {
         res.send(error)
         
     }
 }