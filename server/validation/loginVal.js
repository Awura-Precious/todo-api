const Joi =require('joi')


exports.signInVal =(data)=>{
    const schema = Joi.object().keys({
	    email: Joi.string().min(6).required().email(),
		pass: Joi.string().min(6).required(),
	});

	return schema.validate(data);

}