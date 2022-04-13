const Joi = require('joi')

// define schema
module.exports.postStudentSchema = Joi.object({
    name : Joi.string().min(6).max(13).required(),
    email : Joi.string().email().required(),
    programId : Joi.number().required(),
    cityId : Joi.number().required()
})

module.exports.patchStudentSchema = Joi.object({
    name : Joi.string().min(6).max(13),
    email : Joi.string().email(),
    programId : Joi.number(),
    cityId : Joi.number()
})