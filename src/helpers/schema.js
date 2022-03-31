const Joi = require('joi')

// @POST : client
const post_schema = Joi.object({
    name : Joi.string()
        .min(3)
        .max(13)
        .required(),
    email : Joi.string()
        .email({ tlds : { allow : ['com'] }})
        .required(),
    phone : Joi.string()
        .required(),
    region : Joi.string()
        .required(),
    bank_account : Joi.string()
        .required(),
    credit : Joi.string()
        .required()
})

// @PACTH : client
const patch_schema = Joi.object({
    name : Joi.string()
        .min(3)
        .max(13),
    email : Joi.string()
        .email({ tlds : { allow : ['com'] }}).$,
    phone : Joi.string(),
    region : Joi.string(),
    bank_account : Joi.string(),
    credit : Joi.string()
})

module.exports = { post_schema, patch_schema }