const joi = require('joi');
const schema = {
    body: {
        email: joi.string().email().required(),
        name: joi.string().required()
    }
};
module.exports = { schema };
