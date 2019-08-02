let express = require('express');
let router = express.Router();
const middlewareValidateRequest = require('./../../middlewares/middlewareValidateRequest');
const schema = require('./users.schema');
const mongoose = require('mongoose');
const userModel = require('./../../models/users');

/* POST stores a new person interested in the condorlabs conference */
router.post('/subscribesample', [
  middlewareValidateRequest.validate(schema.schema),
  async (req, res, next) => {
    try {
      await mongoose.connect('mongodb://mongo-instance/my_database', {
        useNewUrlParser: true
      });

      await userModel.create({
        email: req.body.email,
        name: req.body.name
      });

      res.send().status(200);
    } catch (error) {
      return next(error);
    }
  }
]);

module.exports = router;
