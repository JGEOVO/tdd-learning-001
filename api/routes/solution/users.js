var express = require('express');
var router = express.Router();

/* POST stores a new person interested in the condorlabs conference */
router.post('/subscribesample', function (req, res, next) {
  if (req.body && req.body.email && req.body.name) {
    res.send().status(200);
  } else {
    res.status(400).send();
  }

});

module.exports = router;
