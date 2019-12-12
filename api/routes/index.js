var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express', envvars: [process.env.JEST_STARE_COVERAGE_LINK, process.env.MONGO_URI ? true : false] });
});

module.exports = router;
