let express = require('express');
let router = express.Router();
const middlewareValidateRequest = require('./../../middlewares/middlewareValidateRequest');
const schema = require('./users.schema');

/* POST stores a new person interested in the condorlabs conference */
router.post('/subscribesample', [middlewareValidateRequest.validate(schema.schema), function (req, res, next) {
  res.send().status(200);
}]);

module.exports = router;
