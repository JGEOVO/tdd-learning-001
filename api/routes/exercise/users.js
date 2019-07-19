var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* POST stores a new person interested in the condorlabs conference */
router.post('/subscribe', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
