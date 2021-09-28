const Joi = require('joi'); 

const checkEmail = Joi.object({
    email: Joi.string().email().lowercase().required(),
})

const checkCreateUser = Joi.object({
    fullname: Joi.string().min(3).required(),
    otp: Joi.number().min(6).required(),
    password: Joi.string().min(6).required(),
    confirmpassword: Joi.ref('password'),
    semester: Joi.string().required(),
    branch: Joi.string().required(),
})

const checkSignIn = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().required()
})



module.exports = {
    checkSignIn,
    checkEmail,
    checkCreateUser
}