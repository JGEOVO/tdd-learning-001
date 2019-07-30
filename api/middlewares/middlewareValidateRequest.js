const util = require('./../util/index');
const validate = (schema = {}) => {

    return (req, res, next) => {
        const result = util.validateRequest(req, schema);
        if (result === null) {
            next();
        } else {
            res.status(400).json(result);
        }

    };
};


module.exports = { validate };
