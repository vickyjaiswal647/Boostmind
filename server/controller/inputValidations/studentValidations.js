const Joi = require('@hapi/joi');

const checkSubject = Joi.object({
    data: Joi.string().required(),
})


module.exports = {
    checkSubject
}